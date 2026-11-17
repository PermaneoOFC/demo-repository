import asyncio,time,json,subprocess
from pathlib import Path
from playwright.async_api import async_playwright
R=Path(__file__).resolve().parent
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  c=await b.new_context(viewport={'width':1440,'height':900},record_video_dir=str(R/'captures/room-raw'),record_video_size={'width':1440,'height':900})
  await c.route('**/*',lambda r:r.continue_() if r.request.url.startswith(('http://127.0.0.1','data:','blob:')) else r.abort())
  page=await c.new_page();zero=time.monotonic()
  await page.goto('http://127.0.0.1:5173/#/login');await page.get_by_role('radio').nth(1).click();await page.get_by_role('button',name='Explorar sem preencher',exact=True).click();await page.get_by_role('link',name='Abrir sala virtual 8º A',exact=True).click()
  await page.get_by_role('button',name='Superior',exact=True).wait_for();await page.evaluate('window.scrollTo({top:420,behavior:"instant"})');await page.wait_for_timeout(600);start=time.monotonic()-zero
  await page.wait_for_timeout(1000);await page.get_by_role('button',name='Superior',exact=True).click();await page.wait_for_timeout(1600);await page.get_by_role('button',name='Isométrica',exact=True).click();await page.wait_for_timeout(1900);await page.screenshot(path=str(R/'captures/room.png'));end=time.monotonic()-zero
  v=await page.video.path();await c.close();await b.close();Path(v).rename(R/'captures/room-take.webm')
  subprocess.run(['ffmpeg','-y','-v','error','-ss',str(start-.08),'-t',str(end-start),'-i',str(R/'captures/room-take.webm'),'-vf',f'setpts={4/(end-start)}*(PTS-STARTPTS),fps=30,tpad=stop_mode=clone:stop_duration=1','-t','4','-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p','-threads','2',str(R/'captures/clips/room.mp4')],check=True)
import shutil
asyncio.run(main())
shutil.copy2(R/'captures/clips/room.mp4',R/'captures/room-source.mp4')
