import asyncio, json, os
from pathlib import Path
import edge_tts
import edge_tts.communicate as c
if Path('/etc/ssl/certs/ca-certificates.crt').exists():
 c._SSL_CTX.load_verify_locations('/etc/ssl/certs/ca-certificates.crt')
ROOT=Path(__file__).resolve().parent
LINES=[
(0.6,'E se acompanhar cada trajetória escolar pudesse ser mais simples, inteligente e humano?'),
(8.5,'Conheça o Permaneo. Uma plataforma em demonstração, criada para conectar informações, pessoas e cuidado.'),
(20.0,'Uma nova perspectiva para acompanhar o dia a dia escolar.'),
(29.0,'Frequência, desempenho e registros importantes. Tudo organizado para apoiar decisões mais conscientes.'),
(43.0,'Porque cada dado conta uma parte da história. E cada estudante merece ser acompanhado com atenção.'),
(60.0,'Mais organização. Mais colaboração. Mais possibilidades de agir no momento certo.'),
(78.0,'Permaneo. Toda trajetória merece continuar.')]
async def main():
 for i,(start,txt) in enumerate(LINES):
  target=ROOT/'audio'/f'voice-{i}.mp3'
  if not target.exists():
   talk=edge_tts.Communicate(txt,'pt-BR-AntonioNeural',rate='+2%',pitch='-2Hz',proxy=os.environ.get('HTTPS_PROXY'))
   await talk.save(str(target))
  print(i,txt,flush=True)
 (ROOT/'audio/narration.json').write_text(json.dumps([{'start':s,'text':t,'file':f'voice-{i}.mp3'} for i,(s,t) in enumerate(LINES)],ensure_ascii=False,indent=2))
asyncio.run(main())
