"""Record actual local demonstration actions. No application code changes."""
import asyncio, json, time, os
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parent
BASE=os.getenv('PERMANEO_URL','http://127.0.0.1:5173')
CURSOR='''(() => {document.addEventListener('DOMContentLoaded',()=>{const style=document.createElement('style');style.textContent='*{cursor:none!important}#film-cursor{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483647;filter:drop-shadow(0 2px 3px #0005);transform:translate(900px,700px)}';document.head.append(style);const c=document.createElement('div');c.id='film-cursor';c.innerHTML='<svg width="28" height="34" viewBox="0 0 28 34"><path d="M2 2L2 27L9 21L14 32L19 30L14 19L24 19Z" fill="white" stroke="#163b46" stroke-width="2"/></svg>';document.body.append(c);document.addEventListener('pointermove',e=>c.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);document.addEventListener('pointerdown',e=>{const r=document.createElement('div');r.style.cssText=`position:fixed;left:${e.clientX-20}px;top:${e.clientY-20}px;width:40px;height:40px;border:3px solid #227457;border-radius:50%;pointer-events:none;z-index:2147483646`;document.body.append(r);r.animate([{transform:'scale(.3)',opacity:1},{transform:'scale(1.5)',opacity:0}],{duration:450}).onfinish=()=>r.remove();});});})()'''
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  context=await b.new_context(viewport={'width':1440,'height':900},record_video_dir=str(ROOT/'captures/raw'),record_video_size={'width':1440,'height':900},device_scale_factor=1)
  await context.route('**/*',lambda r:r.continue_() if r.request.url.startswith((BASE,'data:','blob:')) else r.abort())
  await context.add_init_script(CURSOR)
  page=await context.new_page();zero=time.monotonic(); marks={};errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  async def pause(s): await page.wait_for_timeout(s*1000)
  def mark(name):
   marks[name]=round(time.monotonic()-zero,3);print(name,marks[name],flush=True)
   (ROOT/'captures/markers.json').write_text(json.dumps(marks,indent=2))
  async def click(loc):
   loc=loc.first;await loc.scroll_into_view_if_needed();box=await loc.bounding_box()
   await page.mouse.move(box['x']+box['width']/2,box['y']+box['height']/2,steps=28);await pause(.3);await loc.click();await pause(.4)
  async def scroll(y):
   await page.evaluate('(y)=>window.scrollBy({top:y,behavior:"smooth"})',y);await pause(1)
  async def snap(name): await page.screenshot(path=str(ROOT/'captures'/f'{name}.png'))
  try:
   await page.goto(BASE+'/#/home');await page.get_by_text('Toda trajetória merece continuar.',exact=False).first.wait_for();await pause(2)
   mark('home');await pause(2);await scroll(420);await pause(1);await scroll(-420);await pause(1)
   await click(page.locator('[data-name="CTA / Acessar"]'));await page.get_by_role('radiogroup').wait_for()
   mark('login');await pause(1);await click(page.get_by_role('radio').nth(0));await pause(1);await snap('login')
   await click(page.get_by_role('button',name='Explorar sem preencher',exact=True));await page.get_by_role('heading',name='Visão geral da escola').wait_for()
   mark('dashboard');await pause(2);await snap('dashboard');await scroll(360);await pause(1)
   await page.get_by_label('Agrupar por').select_option('day');await pause(1.5)
   mark('turma');await click(page.get_by_role('button',name='9º A 85%',exact=True));await pause(1.5)
   await page.get_by_role('button',name='Ver estudante →').first.scroll_into_view_if_needed();await pause(.8);await snap('turma')
   await click(page.get_by_role('button',name='Ver estudante →'));await page.get_by_role('heading',name='Lucas Gomes',exact=True).wait_for()
   mark('profile');await pause(.4);await click(page.get_by_role('tab',name='Frequência',exact=True));await pause(1.5);await scroll(220);await pause(2);await snap('frequency')
   mark('grades');await click(page.get_by_role('tab',name='Desempenho',exact=True));await pause(2);await snap('grades')
   mark('note');await click(page.get_by_role('button',name='Adicionar observação',exact=True));await pause(.5)
   await page.get_by_label('Assunto',exact=True).press_sequentially('Conversa de apoio',delay=45)
   await page.get_by_label('Descrição',exact=True).press_sequentially('Combinamos uma revisão das atividades e um novo encontro.',delay=28)
   await pause(.6);await snap('note');await click(page.get_by_role('button',name='Salvar observação',exact=True));await pause(.5)
   mark('followup');await click(page.get_by_role('button',name='Iniciar acompanhamento',exact=True));await pause(.4)
   await page.get_by_label('Registro de acompanhamento',exact=True).press_sequentially('Revisão de atividades combinada com Lucas. Retomar a conversa na próxima semana.',delay=25)
   await page.get_by_label('Próximo retorno',exact=True).fill('2026-11-23');await page.get_by_label('Situação',exact=True).select_option('Em andamento');await pause(.7)
   await click(page.get_by_role('button',name='Salvar registro demonstrativo',exact=True));await pause(.5)
   await click(page.get_by_role('tab',name='Acompanhamento',exact=True));await pause(1.8);await snap('followup')
   mark('carometro');await click(page.get_by_role('navigation',name='Menu da plataforma').get_by_role('link',name='Carômetro',exact=True));await pause(1.6);await snap('carometro')
   await click(page.get_by_role('button',name='Lista',exact=True));await pause(1);await click(page.get_by_role('button',name='Cartões',exact=True));await pause(.8)
   mark('reports');await click(page.get_by_role('link',name='Relatórios',exact=True));await pause(1.8);await snap('reports')
   async with page.expect_download() as dl:
    await click(page.get_by_text('Exportar CSV',exact=True))
   download=await dl.value;await download.save_as(str(ROOT/'captures/report-demo.csv'));await pause(1)
   mark('notifications');await click(page.get_by_role('link',name='Notificações',exact=True));await pause(2);await snap('notifications')
   mark('switch_teacher');await click(page.get_by_role('link',name='Sair',exact=True));await click(page.get_by_role('radio').nth(1));await click(page.get_by_role('button',name='Explorar sem preencher',exact=True));await pause(1)
   mark('classes');await pause(1);await snap('classes');await click(page.get_by_role('link',name='Abrir sala virtual 8º A',exact=True));await pause(1)
   mark('room');await pause(1);await click(page.get_by_role('button',name='Superior',exact=True));await pause(1);await click(page.get_by_role('button',name='Isométrica',exact=True));await pause(1);await snap('room')
   mark('switch_student');await click(page.get_by_role('link',name='Sair',exact=True));await click(page.get_by_role('radio').nth(2));await click(page.get_by_role('button',name='Explorar sem preencher',exact=True));await pause(1)
   mark('student');await pause(1);await snap('student');await click(page.get_by_role('link',name='Atividades',exact=True));await pause(1);await snap('activities');await pause(1)
   mark('end');assert not errors,errors
   (ROOT/'captures/validation.json').write_text(json.dumps({'page_errors':errors,'demo_observation_created':True,'demo_followup_created':True,'csv_downloaded':True,'authorized_demo_login':True},indent=2))
  except Exception:
   await snap('capture-error');print((await page.locator('body').inner_text())[-7000:],flush=True);raise
  finally:
   vid=await page.video.path();await context.close();Path(vid).rename(ROOT/'captures/journey.webm');await b.close()
asyncio.run(main())
