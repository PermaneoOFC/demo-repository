"""Deterministic cinematic compositor. Pillow + FFmpeg; no paid rendering service.
Usage: python render.py --format horizontal|vertical [--preview 12 43 80]
"""
from pathlib import Path
from functools import lru_cache
from PIL import Image,ImageDraw,ImageFont,ImageFilter,ImageOps
import numpy as np, math, json, subprocess, argparse, time
R=Path(__file__).resolve().parent;DURATION=88;FPS=30
(R/'frames').mkdir(exist_ok=True);(R/'deliverables').mkdir(exist_ok=True)
SCENES=json.loads((R/'scenes.json').read_text());CAPTIONS=json.loads((R/'audio/captions.json').read_text())
MINT='#9de6c5';WHITE='#f1f8f5';MUTED='#9db8bd';BLUE='#246579';GREEN='#227457'
def ease(x):x=max(0,min(1,x));return 1-(1-x)**4
def smooth(x):x=max(0,min(1,x));return x*x*(3-2*x)
def lerp(a,b,t):return a+(b-a)*t
@lru_cache(maxsize=200)
def font(size,bold=True):
 f=ImageFont.truetype(str(R/'assets'/('BricolageGrotesque.ttf' if bold else 'PublicSans.ttf')),int(size))
 try:f.set_variation_by_axes([96,650,100] if bold else [450])
 except Exception:pass
 return f
@lru_cache(maxsize=400)
def text_image(s,size,color=WHITE,bold=True):
 f=font(size,bold);b=f.getbbox(s);im=Image.new('RGBA',(max(1,b[2]-b[0]+4),max(1,b[3]-b[1]+4)));ImageDraw.Draw(im).text((2-b[0],2-b[1]),s,font=f,fill=color);return im

def text(im,s,x,y,size=30,color=WHITE,bold=True,alpha=1,anchor='left'):
 a=text_image(s,size,color,bold)
 if anchor=='center':x-=a.width/2
 if anchor=='right':x-=a.width
 if alpha<.999:a=a.copy();a.putalpha(a.getchannel('A').point(lambda p:int(p*max(0,alpha))))
 im.paste(a,(int(x),int(y)),a)

def wrapped(s,width,size,bold=False):
 words=s.split();lines=[];line=''
 for word in words:
  new=(line+' '+word).strip()
  if text_image(new,size,WHITE,bold).width>width and line:lines.append(line);line=word
  else:line=new
 if line:lines.append(line)
 return lines
@lru_cache(maxsize=200)
def mask(w,h,r=20):
 m=Image.new('L',(w,h));ImageDraw.Draw(m).rounded_rectangle((0,0,w-1,h-1),radius=r,fill=255);return m

def window(im,source,box,crop=None,alpha=1,chrome=False):
 x,y,w,h=map(int,box)
 if w<3 or h<3 or alpha<=0:return
 if crop:source=source.crop(tuple(map(int,crop)))
 source=ImageOps.contain(source,(w,h),Image.Resampling.BICUBIC)
 x+=(w-source.width)//2;y+=(h-source.height)//2;w,h=source.size
 # A restrained border and layered shadow lift the live interface off the stage.
 shadow=Image.new('RGBA',im.size);draw=ImageDraw.Draw(shadow)
 for pad,a in [(22,9),(12,16),(5,35)]:
  draw.rounded_rectangle((x-pad,y-pad+10,x+w+pad,y+h+pad+10),radius=25+pad,fill=(0,0,0,a))
 im.alpha_composite(shadow)
 m=mask(w,h,min(20,w//20))
 if alpha<.999:m=m.point(lambda p:int(p*alpha))
 im.paste(source,(x,y),m)
 draw=ImageDraw.Draw(im);draw.rounded_rectangle((x-1,y-1,x+w,y+h),radius=20,outline=(174,224,211,100),width=1)
 if chrome:
  draw.rounded_rectangle((x,y-32,x+w,y+15),radius=15,fill='#18363e');draw.rectangle((x,y-15,x+w,y),fill='#18363e')
  for n in range(3):draw.ellipse((x+15+n*13,y-20,x+20+n*13,y-15),fill='#5e898c')
  text(im,'PERMANEO  /  DEMONSTRAÇÃO',x+76,y-24,14,MUTED,False)

class Film:
 def __init__(self,vertical=False):
  self.v=vertical;self.w,self.h=(1080,1920) if vertical else (1920,1080)
  W,H=self.w,self.h;yy,xx=np.mgrid[:H,:W];u=xx/W;v=yy/H
  glow=np.exp(-((u-.84)**2/.18+(v-.23)**2/.28));green=np.exp(-((u-.15)**2/.2+(v-.9)**2/.13))
  rng=np.random.default_rng(246579);noise=rng.normal(0,.48,(H,W))
  ar=np.stack([9+7*glow+3*green,21+30*glow+20*green,27+32*glow+13*green],axis=-1)+noise[:,:,None]
  self.bg=Image.fromarray(np.uint8(np.clip(ar,0,255))).convert('RGBA');self.logo=Image.open(R/'assets/logo.png').convert('RGBA')
  self.shots={s:Image.open(R/'captures'/f'{s}.png').convert('RGB') for s in ['dashboard','frequency','grades','carometro','room','student','home']}
  self.particles=[(rng.random(),rng.random(),rng.uniform(.5,1.5)) for _ in range(40)]
 def base(self,t):
  im=self.bg.copy();overlay=Image.new('RGBA',im.size);d=ImageDraw.Draw(overlay)
  # Continuous paths evoke trajectories and provide continuity across edits.
  for j in range(3):
   pts=[]
   for i in range(100):
    x=i/99*self.w;y=self.h*(.74+.12*math.sin(i/99*4+j*.38+t*.06))
    pts.append((x,y+j*25))
   d.line(pts,fill=(40,111,108,34+j*10),width=2)
  for x,y,r in self.particles:
   px=(x*self.w+t*3*r)%self.w;py=(y*self.h-t*2*r)%self.h
   d.ellipse((px,py,px+r*2,py+r*2),fill=(148,215,196,55))
  im.alpha_composite(overlay)
  # Small fixed identity and disclosure remain legible throughout the piece.
  logo=self.logo.resize((48,37),Image.Resampling.LANCZOS);im.paste(logo,(64,50),logo);text(im,'Permaneo',124,53,30)
  if self.v:
   text(im,'PROTÓTIPO · DADOS FICTÍCIOS',64,111,21,MUTED,False)
  else:
   text(im,'PROTÓTIPO · DADOS FICTÍCIOS',self.w-72,58,19,MUTED,False,anchor='right')
  return im
 def brand(self,im,t,cx,cy,size=120,alpha=1):
  iw=int(size*1.14);ih=int(iw*31/40);gap=int(size*.22)
  word=text_image('Permaneo',size,WHITE,True);total=iw+gap+word.width
  x=int(cx-total/2);lg=self.logo.resize((iw,ih),Image.Resampling.LANCZOS)
  if alpha<1:lg.putalpha(lg.getchannel('A').point(lambda p:int(p*alpha)))
  im.paste(lg,(x,int(cy-ih/2)),lg);text(im,'Permaneo',x+iw+gap,cy-word.height/2,size,alpha=alpha)
 def intro(self,im,t):
  W,H=self.w,self.h;d=ImageDraw.Draw(im);gather=smooth((t-4.8)/1.4)
  if t<6.5:
   fade=1-smooth((t-5.3)/.9);alpha=ease(t/.7)*fade
   if self.v:
    title=['Cada','trajetória','importa.'];sz=112;y=400
   else:title=['Cada trajetória','importa.'];sz=140;y=245
   for i,line in enumerate(title):text(im,line,W/2,y+i*sz*1.03+(1-ease((t-i*.17)/.85))*45,sz,MINT if i==len(title)-1 else WHITE,alpha=alpha*ease((t-i*.17)/.6),anchor='center')
   labels=['Frequência','Notas','Registros','Alertas','Turmas']
   positions=[(.21,.62),(.66,.66),(.22,.77),(.65,.82),(.41,.90)] if self.v else [(.15,.72),(.325,.79),(.5,.70),(.675,.79),(.85,.72)]
   for i,(label,(px,py)) in enumerate(zip(labels,positions)):
    entry=ease((t-.45-i*.25)/.8);x=lerp(px*W,W/2,gather);y1=lerp(py*H+(1-entry)*60,H*.55,gather)
    w=(255 if not self.v else 300)*(1-gather*.6);h=74*(1-gather*.5)
    a=entry*(1-gather);d.line((x,y1,W/2,H*.57),fill=(59,117,113,int(75*a)),width=2)
    if a>.01:
     d.rounded_rectangle((x-w/2,y1-h/2,x+w/2,y1+h/2),radius=18,fill=(22,57,63,int(230*a)),outline=(73,142,132,int(130*a)),width=1)
     text(im,label,x,y1-14,28,MINT,False,alpha=a,anchor='center')
  if t>5.5:
   p=ease((t-5.5)/1.0);self.brand(im,t,W/2,H*.49,130 if self.v else 152,p)
   text(im,'INFORMAÇÃO QUE VIRA CUIDADO',W/2,H*.49+105,23 if self.v else 26,MINT,False,alpha=p,anchor='center')
 def ui(self,im,t,source):
  s=next(s for s in SCENES if s['start']<=t<s['end']);p=(t-s['start'])/(s['end']-s['start']);entry=ease((t-s['start'])/.65);exitp=smooth((t-s['end']+.24)/.24);alpha=1-exitp*.18
  crop=list(s['crop'])
  if not self.v and s['layout']=='wide':crop=[lerp(a,b,smooth((p-.2)/.55)) for a,b in zip(crop,s['focus'])]
  micro=1+.018*math.sin(p*math.pi/2);cx=(crop[0]+crop[2])/2;cy=(crop[1]+crop[3])/2
  crop=[cx+(crop[0]-cx)/micro,cy+(crop[1]-cy)/micro,cx+(crop[2]-cx)/micro,cy+(crop[3]-cy)/micro]
  if self.v:
   text(im,s['tag'],64,211,22,MINT,False,alpha=entry)
   lines=[]
   for line in s['title']:lines+=wrapped(line,940,82,True)
   for i,line in enumerate(lines):text(im,line,64,265+i*91+(1-entry)*35,82,alpha=entry)
   title_end=265+len(lines)*91
   for i,line in enumerate(wrapped(s['detail'],920,28)):text(im,line,64,title_end+24+i*38,28,MUTED,False,alpha=entry)
   # Two distinct views: full navigation context above; a large detail below.
   top=max(600,title_end+140);top=min(top,680)
   if s['id'] in ['login','note']:
    focus=s['focus'];window(im,source,(64,top,952,1010),crop=focus,alpha=alpha,chrome=True)
    text(im,'INTERFACE REAL · ENQUADRAMENTO DE DETALHE',self.w/2,1720,21,MUTED,False,anchor='center')
    return
   window(im,source,(64+(1-entry)*65,top,952,595),alpha=alpha,chrome=True)
   focus=s['focus'];fh=480
   d=ImageDraw.Draw(im);d.line((88,top+620,88,top+670),fill=MINT,width=2)
   text(im,'EM FOCO',111,top+625,20,MINT,False)
   window(im,source,(64,top+675,952,fh),crop=focus,alpha=alpha)
   # Keep a short phrase beneath the detail in the portrait safe area.
  elif s['layout']=='wide':
   text(im,s['tag'],85,133,19,MINT,False,alpha=entry)
   title=' '.join(s['title']);sz=min(78,int(1600/max(len(title),1)*1.55))
   text(im,title,85,176+(1-entry)*28,sz,alpha=entry)
   text(im,s['detail'],self.w-88,203,23,MUTED,False,alpha=entry,anchor='right') if len(title)<14 else None
   # Fit the full chosen interface region without distorting its aspect ratio.
   cw,ch=crop[2]-crop[0],crop[3]-crop[1];h=690;w=int(h*cw/ch)
   w=min(w,1660);h=int(w*ch/cw);x=(self.w-w)//2;y=304
   window(im,source,(x+(1-entry)*60,y+(1-entry)*24,w,h),crop=crop,alpha=alpha,chrome=True)
  else:
   text(im,s['tag'],85,206,18,MINT,False,alpha=entry)
   lines=[]
   for line in s['title']:lines+=wrapped(line,490,78,True)
   for i,line in enumerate(lines):text(im,line,85,277+i*88+(1-entry)*45,78,MINT if i==len(lines)-1 else WHITE,alpha=entry)
   last=277+len(lines)*88
   for i,line in enumerate(wrapped(s['detail'],420,27)):text(im,line,90,last+34+i*38,27,MUTED,False,alpha=entry)
   d=ImageDraw.Draw(im);d.rounded_rectangle((88,last+160,146,last+164),radius=2,fill=MINT)
   text(im,'NAVEGAÇÃO REAL',165,last+151,18,MUTED,False,alpha=entry)
   cw,ch=crop[2]-crop[0],crop[3]-crop[1];h=790;w=min(1205,int(h*cw/ch));h=int(w*ch/cw)
   x=650+(1205-w)/2;y=180+(790-h)/2
   window(im,source,(x+(1-entry)*100,y+(1-entry)*32,w,h),crop=crop,alpha=alpha,chrome=True)
  # A quiet timeline tracks the school journey rather than adding fabricated metrics.
  d=ImageDraw.Draw(im);by=self.h-35;d.line((64,by,self.w-64,by),fill=(67,108,107,100),width=2);d.line((64,by,64+(self.w-128)*(t/88),by),fill=MINT,width=3)
 def outro(self,im,t):
  W,H=self.w,self.h;q=t-75;d=ImageDraw.Draw(im)
  if q<3.6:
   converge=smooth(q/3.0);a=1-smooth((q-1.5)/1.6)
   shots=['dashboard','frequency','carometro']
   for i,name in enumerate(shots):
    if self.v:x0=[-80,230,40][i];y0=[370,800,1220][i];w0=880
    else:x0=[-70,550,1120][i];y0=[240,470,210][i];w0=820
    w=int(lerp(w0,160,converge));h=int(w*900/1440);x=lerp(x0,W/2-w/2,converge);y=lerp(y0,H*.46-h/2,converge)
    window(im,self.shots[name],(x,y,w,h),alpha=a)
   text(im,'Informação. Contexto. Cuidado.',W/2,H*.84,38 if self.v else 45,MINT,alpha=1-converge,anchor='center')
  if q>1.2:
   p=ease((q-1.2)/1.4)
   for rad in [220,320,440]:
    rr=rad*(.85+.15*p);cx=W/2;cy=H*.42
    d.ellipse((cx-rr,cy-rr,cx+rr,cy+rr),outline=(52,119,109,int(50*p)),width=1)
   self.brand(im,t,W/2,H*.40,124 if self.v else 174,p)
   y=H*.40+(150 if self.v else 150)
   slogan=['Toda trajetória','merece continuar.'] if self.v else ['Toda trajetória merece continuar.']
   a=ease((q-3)/1.0)
   for i,line in enumerate(slogan):text(im,line,W/2,y+i*78+(1-a)*20,64 if self.v else 68,MINT,alpha=a,anchor='center')
   if q>6.0:
    a=ease((q-6)/.8);cy=H*.75 if self.v else H*.77
    d.rounded_rectangle((W/2-252,cy-7,W/2+252,cy+68),radius=38,fill=(34,116,87,int(240*a)))
    text(im,'Explore a demonstração',W/2-12,cy+13,29,WHITE,False,alpha=a,anchor='center')
    d.line((W/2+189,cy+29,W/2+215,cy+29),fill=WHITE,width=2);d.line((W/2+205,cy+19,W/2+215,cy+29,W/2+205,cy+39),fill=WHITE,width=2)
    text(im,'github.com/PermaneoOFC/demo-repository',W/2,cy+103,22 if self.v else 25,MUTED,False,alpha=a,anchor='center')
    text(im,'Toda trajetória é feita de possibilidades.',W/2,cy+155,23,MUTED,False,alpha=a,anchor='center')
 def captions(self,im,t):
  active=next((c for c in CAPTIONS if c['start']<=t<c['end']),None)
  if not active:return
  width=945 if self.v else 1650;size=34 if self.v else 29
  lines=wrapped(active['text'],width-52,size,False);lineheight=size+12
  totalh=len(lines)*lineheight+26;y=(self.h-125-totalh if self.v else self.h-64-totalh)
  w=max(text_image(s,size,WHITE,False).width for s in lines)+52;x=(self.w-w)/2
  overlay=Image.new('RGBA',im.size);d=ImageDraw.Draw(overlay);d.rounded_rectangle((x,y,x+w,y+totalh),radius=14,fill=(7,20,26,230));im.alpha_composite(overlay)
  for i,line in enumerate(lines):text(im,line,self.w/2,y+15+i*lineheight,size,WHITE,False,anchor='center')
 def frame(self,t,source=None):
  im=self.base(t)
  if t<8:self.intro(im,t)
  elif t<75:self.ui(im,t,source)
  else:self.outro(im,t)
  self.captions(im,t)
  return im.convert('RGB')

def rawframe_at(t):
 raw=subprocess.check_output(['ffmpeg','-v','error','-ss',str(max(0,t-8)),'-i',str(R/'captures/ui-edit.mp4'),'-frames:v','1','-f','rawvideo','-pix_fmt','rgb24','pipe:1'])
 return Image.frombytes('RGB',(1440,900),raw)

def main():
 p=argparse.ArgumentParser();p.add_argument('--format',choices=['horizontal','vertical'],default='horizontal');p.add_argument('--preview',nargs='*',type=float);args=p.parse_args();film=Film(args.format=='vertical')
 if args.preview is not None:
  for t in args.preview:
   im=film.frame(t,rawframe_at(t) if 8<=t<75 else None);path=R/'frames'/f'{args.format}-{t:05.1f}.jpg';im.save(path,quality=94);print(path,flush=True)
  return
 path=R/'deliverables'/('permaneo-cinematic-launch-vertical.mp4' if film.v else 'permaneo-cinematic-launch-1080p.mp4')
 decoder=subprocess.Popen(['ffmpeg','-v','error','-threads','1','-i',str(R/'captures/ui-edit.mp4'),'-f','rawvideo','-pix_fmt','rgb24','pipe:1'],stdout=subprocess.PIPE)
 cmd=['ffmpeg','-y','-v','error','-f','rawvideo','-pixel_format','rgb24','-video_size',f'{film.w}x{film.h}','-framerate',str(FPS),'-i','pipe:0','-i',str(R/'deliverables/permaneo-mix.wav'),'-i',str(R/'deliverables/permaneo-legendas.srt'),'-map','0:v','-map','1:a','-map','2:s','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-threads','2','-c:a','aac','-b:a','256k','-c:s','mov_text','-metadata:s:s:0','language=por','-metadata','title=Permaneo — Toda trajetória merece continuar','-metadata','comment=Captura real do protótipo. Dados fictícios. Trilha original. Locução sintética pt-BR.','-movflags','+faststart','-t','88',str(path)]
 encoder=subprocess.Popen(cmd,stdin=subprocess.PIPE);start=time.monotonic();last=None
 try:
  for n in range(FPS*DURATION):
   t=n/FPS
   if 8<=t<75:
    data=decoder.stdout.read(1440*900*3)
    if len(data)!=1440*900*3:raise RuntimeError(f'Missing source frame at {t}: {len(data)}')
    last=Image.frombytes('RGB',(1440,900),data)
   frame=film.frame(t,last);encoder.stdin.write(frame.tobytes())
   if n%(FPS*4)==0:print(f'{args.format} {t:05.1f}s / 88s · {n/max(.1,time.monotonic()-start):.1f} fps',flush=True)
 finally:
  encoder.stdin.close();decoder.stdout.close();decoder.wait();code=encoder.wait()
 if code:raise RuntimeError(f'Encoder failed: {code}')
 print(path,flush=True)
if __name__=='__main__':main()
