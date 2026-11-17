"""Original score, effects, narration treatment and broadcast-style mix. No music samples."""
from pathlib import Path
import numpy as np, wave, subprocess, json
from scipy.signal import butter, sosfilt
R=Path(__file__).resolve().parent; O=R/'deliverables';O.mkdir(exist_ok=True)
SR=48000;D=88;N=SR*D;rng=np.random.default_rng(220457)
voice=np.zeros(N,np.float32);music=np.zeros((N,2),np.float32);fx=np.zeros_like(music)
def wav(path,a):
 with wave.open(str(path),'wb') as f:
  f.setnchannels(1 if a.ndim==1 else a.shape[1]);f.setsampwidth(2);f.setframerate(SR);f.writeframes((np.clip(a,-.999,.999)*32767).astype('<i2').tobytes())
def put(dst,x,at,amp=1,pan=0):
 i=int(at*SR);n=min(len(x),len(dst)-i)
 if n<=0:return
 if dst.ndim==1:dst[i:i+n]+=x[:n]*amp
 elif x.ndim==1:dst[i:i+n,0]+=x[:n]*amp*np.sqrt((1-pan)/2);dst[i:i+n,1]+=x[:n]*amp*np.sqrt((1+pan)/2)
 else:dst[i:i+n]+=x[:n]*amp
def tone(f,d=.8):
 t=np.arange(int(SR*d))/SR
 env=(1-np.exp(-t*180))*np.exp(-t*5)
 return ((np.sin(2*np.pi*f*t)+.2*np.sin(2*np.pi*2*f*t)+.06*np.sin(2*np.pi*3*f*t))*env).astype(np.float32)
def freq(n):return 440*2**((n-69)/12)
# Voice files are synthesized separately, then trimmed and normalized independently.
items=json.loads((R/'audio/narration.json').read_text());subs=[]
for item in items:
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(R/'audio'/item['file']),'-af','silenceremove=start_periods=1:start_duration=0.02:start_threshold=-48dB,highpass=f=75,lowpass=f=14500,acompressor=threshold=0.12:ratio=2.5:attack=8:release=100,loudnorm=I=-18:TP=-2:LRA=7','-f','f32le','-ar',str(SR),'-ac','1','pipe:1'])
 a=np.frombuffer(raw,np.float32);put(voice,a,item['start']);item['duration']=len(a)/SR
 # Split captions at punctuation / phrase boundaries for a comfortable reading width.
 split={0:['E se acompanhar cada trajetória escolar','pudesse ser mais simples, inteligente e humano?'],1:['Conheça o Permaneo.','Uma plataforma em demonstração, criada para','conectar informações, pessoas e cuidado.'],2:['Uma nova perspectiva para acompanhar','o dia a dia escolar.'],3:['Frequência, desempenho e registros importantes.','Tudo organizado para apoiar','decisões mais conscientes.'],4:['Porque cada dado conta uma parte da história.','E cada estudante merece ser acompanhado com atenção.'],5:['Mais organização. Mais colaboração.','Mais possibilidades de agir no momento certo.'],6:['Permaneo.','Toda trajetória merece continuar.']}[len(subs) if False else items.index(item)]
 total=sum(len(s) for s in split);pos=item['start'];dur=max(.1,item['duration']-.2)
 for s in split:
  end=pos+dur*len(s)/total;subs.append({'start':pos,'end':end,'text':s});pos=end
wav(O/'permaneo-narracao-masculina.wav',voice)
# 112.5 bpm. Dmaj9 → A6 → Bm7 → Gmaj7, all sounds synthesized here.
beat=60/112.5;chords=[[50,57,61,64,69],[45,52,57,61,66],[47,54,57,62,66],[43,50,54,59,62]]
for bar in range(42):
 at=bar*4*beat
 if at>=D:break
 notes=chords[(bar//2)%4];dur=4*beat+.8;t=np.arange(int(dur*SR))/SR
 env=np.minimum(t/.6,1)*np.minimum((dur-t)/1.0,1);env=np.clip(env,0,1)
 pad=np.zeros((len(t),2),np.float32)
 for j,n in enumerate(notes[1:]):
  f=freq(n+12)
  for ch,det in enumerate([.999,1.001]):pad[:,ch]+=(np.sin(2*np.pi*f*det*t)+.14*np.sin(2*np.pi*f*2*t))*env/(len(notes)*2)
 intensity=.035 if at<8 else .07 if at<28 else .085 if at<59 else .11
 put(music,pad,at,intensity)
 if at>=8 and at<83:
  for k in range(8):
   n=notes[[1,3,2,4,1,2,3,4][k]]+12
   pl=tone(freq(n),1.05);pan=(-.5 if k%2 else .5)
   for delay,gain in [(0,.045),(beat*.75,.017),(beat*1.5,.007)]:put(music,pl,at+k*beat/2+delay,gain*(.6 if at<18 else 1),pan)
 if at<82:
  for k in range(4):
   ti=at+k*beat;t2=np.arange(int(SR*.32))/SR
   bass=(np.sin(2*np.pi*freq(notes[0]-12)*t2)+.16*np.sin(2*np.pi*freq(notes[0])*t2))*np.exp(-t2*8)*np.minimum(t2/.008,1)
   put(music,bass,ti,.13 if at>18 else .055)
   kick=np.sin(2*np.pi*(44*t2+75*.016*(1-np.exp(-t2/.016))))*np.exp(-t2*14)*np.minimum(t2/.003,1)
   put(music,kick,ti,.23 if at>26 else .11)
   if at>18:
    ht=np.arange(int(SR*.09))/SR;noise=rng.normal(size=len(ht));noise=sosfilt(butter(2,7000,fs=SR,btype='highpass',output='sos'),noise)*np.exp(-ht*55)*np.minimum(ht/.002,1)
    put(music,noise,ti+beat/2,.025,(-.6 if k%2 else .6))
    if k%2:
     st=np.arange(int(SR*.16))/SR;sn=rng.normal(size=len(st));sn=sosfilt(butter(2,[1000,6000],fs=SR,btype='bandpass',output='sos'),sn)*np.exp(-st*25)*np.minimum(st/.003,1)
     put(music,sn,ti,.047)
# Opening ticks, restrained transitions and warm tonal logo.
for i,at in enumerate([.5,.7,.95,1.2,1.45,5.7,8,18,20.4,25,31.7,33,39.8,45.6,49.7,53.2,54.5,58.7,60.4,63.4,66.4,68.8,70.5,72.8,76.2]):
 put(fx,tone(freq(81+(i%3)*2),.13),at,.07 if at<8 else .028,((i%5)-2)/4)
for at in [7.6,17.6,24.6,32.6,38.6,44.6,48.6,53.6,59.6,62.6,65.6,67.6,71.6,74.6,76.2]:
 dur=.65;t=np.arange(int(SR*dur))/SR;noise=rng.normal(size=len(t));noise=sosfilt(butter(2,[450,3400],fs=SR,btype='bandpass',output='sos'),noise)
 env=np.sin(np.pi*t/dur)**2;put(fx,noise*env,at,.027)
for n,at in [(74,77.4),(78,77.65),(81,77.9),(86,78.15)]:
 t=np.arange(int(SR*4))/SR;bell=(np.sin(2*np.pi*freq(n)*t)+.2*np.sin(2*np.pi*freq(n)*2*t))*np.exp(-t*1.6)*(1-np.exp(-t*100));put(fx,bell,at,.075,(n-80)/16)
fade=np.minimum(np.arange(N)/SR/1.6,1)*np.minimum((D-np.arange(N)/SR)/3,1);music*=fade[:,None];fx*=np.minimum((D-np.arange(N)/SR)/2,1)[:,None]
# Smooth ducking based on the actual voice envelope, with lookahead and gentle release.
blocks=np.max(np.abs(voice[:N//480*480].reshape(-1,480)),axis=1);env=np.convolve((blocks>.012).astype(float),np.ones(45)/45,mode='same');duck=1-.72*np.interp(np.arange(N),np.arange(len(env))*480,np.clip(env*1.6,0,1))
# Score stems are exported at a useful standalone level; mix uses the same composition with ducking.
peak=np.max(np.abs(music));music*=.72/max(peak,.01)
wav(O/'permaneo-trilha.wav',music)
wav(O/'permaneo-efeitos.wav',fx)
mix=voice[:,None]*.98+music*duck[:,None]*.38+fx
wav(R/'audio/mix-raw.wav',mix)
subprocess.run(['ffmpeg','-y','-v','error','-i',str(R/'audio/mix-raw.wav'),'-af','loudnorm=I=-16:TP=-1.5:LRA=9','-ar',str(SR),str(O/'permaneo-mix.wav')],check=True)
def stamp(t):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
(O/'permaneo-legendas.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(s["start"])} --> {stamp(s["end"])}\n{s["text"]}' for i,s in enumerate(subs))+'\n',encoding='utf-8')
(R/'audio/captions.json').write_text(json.dumps(subs,ensure_ascii=False,indent=2));(R/'audio/narration.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
print('Audio and captions rendered.',flush=True)
