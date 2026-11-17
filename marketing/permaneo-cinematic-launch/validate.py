"""Validate final streams, full decoding, black frames and representative stills."""
import json,subprocess,hashlib,re
from pathlib import Path
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parent;O=R/'deliverables';results={}
(R/'frames').mkdir(exist_ok=True)
for orientation,name,w,h in [('horizontal','1080p',1920,1080),('vertical','vertical',1080,1920)]:
 p=O/f'permaneo-cinematic-launch-{name}.mp4'
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio');sub=next(s for s in probe['streams'] if s['codec_type']=='subtitle')
 assert (v['width'],v['height'])==(w,h)
 assert v['codec_name']=='h264' and v['avg_frame_rate']=='30/1'
 assert a['codec_name']=='aac' and a['sample_rate']=='48000'
 assert v['nb_frames']=='2640'
 assert abs(float(probe['format']['duration'])-88)<.1
 check=subprocess.run(['ffmpeg','-v','warning','-i',str(p),'-map','0:v','-map','0:a','-f','null','-'],capture_output=True,text=True)
 assert check.returncode==0 and not check.stderr.strip(),check.stderr
 black=subprocess.run(['ffmpeg','-v','info','-i',str(p),'-vf','blackdetect=d=0.08:pix_th=0.04:pic_th=0.99','-an','-f','null','-'],capture_output=True,text=True)
 events=[l for l in black.stderr.splitlines() if 'black_start:' in l];assert not events,events
 stills=[]
 for t in [3,9,16,21,29,36,43.5,47,52.5,58.5,61,64,67,70,73,78.5,83,87.5]:
  shot=R/'frames'/f'final-{orientation}-{t:05.1f}.jpg'
  subprocess.run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(p),'-frames:v','1','-q:v','2',str(shot)],check=True)
  im=Image.open(shot);im.thumbnail((384,240) if orientation=='horizontal' else (180,320));stills.append((t,im.copy()))
 tw,th=(400,265) if orientation=='horizontal' else (200,350);sheet=Image.new('RGB',(tw*6,th*3),'#0c2028');d=ImageDraw.Draw(sheet)
 for i,(t,im) in enumerate(stills):
  x=(i%6)*tw;y=(i//6)*th;sheet.paste(im,(x,y+22));d.text((x+5,y+3),f'{t:.1f}s',fill='white')
 sheet.save(O/f'contato-{orientation}.jpg',quality=91)
 results[orientation]={'file':p.name,'resolution':[w,h],'fps':v['avg_frame_rate'],'frames':int(v['nb_frames']),'duration_seconds':float(probe['format']['duration']),'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'sample_rate':int(a['sample_rate']),'audio_channels':int(a['channels']),'subtitle_codec':sub['codec_name'],'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'full_decode':'PASS','black_segments':events,'sampled_stills':len(stills)}
 print(orientation,results[orientation],flush=True)
results['browser']=json.loads((R/'captures/validation.json').read_text())
results['source_commit']='a0bebcdb8d1c3216e80635c48d6a7066f67de387'
(O/'validation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
