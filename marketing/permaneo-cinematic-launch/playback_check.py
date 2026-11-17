import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
R=Path(__file__).resolve().parent
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
  page=await b.new_page();out={}
  await page.goto('http://127.0.0.1:8765/')
  for name in ['1080p','vertical']:
   await page.set_content(f'<video muted controls src="http://127.0.0.1:8765/permaneo-cinematic-launch-{name}.mp4"></video>')
   await page.wait_for_function('document.querySelector("video")?.readyState >= 2')
   await page.evaluate('document.querySelector("video").play()');await page.wait_for_timeout(1500)
   v=await page.evaluate('(()=>{const v=document.querySelector("video");return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,currentTime:v.currentTime,error:v.error?.message||null,paused:v.paused};})()')
   assert v['currentTime']>0 and not v['error'];out[name]=v
  await b.close();(R/'deliverables/browser-playback.json').write_text(json.dumps(out,indent=2));print(out)
asyncio.run(main())
