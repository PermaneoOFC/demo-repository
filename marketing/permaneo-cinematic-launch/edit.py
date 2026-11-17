"""Retimes recorded interactions into a deterministic 30 fps edit."""
import subprocess,json
from pathlib import Path
R=Path(__file__).resolve().parent
marks=json.loads((R/'captures/markers.json').read_text());scenes=json.loads((R/'scenes.json').read_text());keys=list(marks)
(R/'captures/clips').mkdir(exist_ok=True)
for s in scenes:
 name=s['id'];start=marks[name];end=marks[keys[keys.index(name)+1]];dur=s['end']-s['start']
 # The first frame of the native recorder starts ~100ms after new_page.
 start=max(0,start-.08);end-=.08
 # Limit time on the overview to keep attention on the frequency tab.
 target=R/'captures/clips'/f'{name}.mp4'
 source=R/'captures/journey.webm'
 if name=='room' and (R/'captures/room-source.mp4').exists():source=R/'captures/room-source.mp4';start=0;end=4
 cmd=['ffmpeg','-y','-v','error','-ss',str(start),'-t',str(end-start),'-i',str(source),'-an','-vf',f'setpts={dur/(end-start)}*(PTS-STARTPTS),fps=30,tpad=stop_mode=clone:stop_duration=1','-t',str(dur),'-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p','-threads','2',str(target)]
 subprocess.run(cmd,check=True);print(name,start,end,dur,flush=True)
(R/'captures/concat.txt').write_text('\n'.join("file 'clips/"+s['id']+".mp4'" for s in scenes))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(R/'captures/concat.txt'),'-c','copy',str(R/'captures/ui-edit.mp4')],check=True)
