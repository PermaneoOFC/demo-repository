import imgVinculoSimboloVetorial from '../../../images/figma/a23cfcb33ea1be0402db.svg';
import imgComponent1 from '../../../images/figma/e32d3c7f48aba5daa8e9.svg';
import imgComponent2 from '../../../images/figma/a481627a8db0800d47be.svg';
import imgComponent3 from '../../../images/figma/b084ef26181a13048619.svg';
import imgComponent4 from '../../../images/figma/1191e2ea360001514eca.svg';






import styles from './StudentSpaceLight.module.css';







function PermaneoSiteButton({ className, estilo = "Prim\xE1rio", texto = "Continuar" }) {
  const isSecundario = estilo === "Secund\xE1rio";
  return <button type="button" className={className || `content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] ${isSecundario ? "bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid" : "bg-[var(--brand,#246579)]"}`} id={isSecundario ? "node-2024_3369" : "node-2024_3368"}>
      {estilo === "Prim\xE1rio" && <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--onbrand,white)] whitespace-nowrap" data-node-id="2024:3371">
          {texto}
        </p>}
      {isSecundario && <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] whitespace-nowrap" data-node-id="2024:3372">
          {texto}
        </p>}
    </button>;
}
function Component13MeuEspacoClaro() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:10714" data-name="13 · Meu espaço | Claro">
      <div className="content-stretch flex h-[1200px] items-start min-h-[1200px] relative shrink-0 w-full" data-node-id="2009:10715" data-name="div.min-h-screen">
        <div className="bg-[var(--permaneo-surface,white)] border-[var(--permaneo-border,#d7e2ea)] border-r-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] h-[1000px] items-start p-[16px] shrink-0 sticky top-0 w-[260px]" data-node-id="2009:10716" data-name="aside.sticky">
          <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:10717" data-name="a.px-2">
            <div className="content-stretch flex gap-[var(--mention\/pill-bleed,8px)] items-center relative shrink-0 w-[235px]" data-node-id="2009:10718" data-name="span.inline-flex">
              <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[227px]" data-node-id="2009:10719" data-name="a.px-2">
                <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:10720" data-name="a.px-2">
                  <div className="content-stretch flex gap-[var(--item-spacing\/8,8px)] items-center relative shrink-0" data-node-id="2009:10721" data-name="span.inline-flex">
                    <div className="relative shrink-0 size-[35px]" data-node-id="2009:10722" data-name="Logo Permaneo · Vínculo · Vetor">
                      <div className="absolute h-[26.979px] left-0 top-[4.01px] w-[35px]" data-node-id="2089:2585" data-name="Vínculo · símbolo vetorial">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
                      </div>
                    </div>
                    <a className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-node-id="2009:10727" data-name="span.text-lg">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:Bold')] font-[var(--font-weight\/700,700)] justify-center leading-[0] relative shrink-0 text-[#203c46] text-[length:var(--line-height\/18,18px)] text-left tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:10728">
                        <p>
                          <span className="leading-[var(--line-height\/28,28px)]">Permane</span>
                          <span className="leading-[var(--line-height\/28,28px)] text-[#227457]">o</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-node-id="2009:10729" data-name="div.flex-1">
            <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0 w-full" data-node-id="2009:10730" data-name="Menu da plataforma">
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:10731" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:10731;29:15268" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:10731;29:15272" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:10731;29:15273">
                    <p className="leading-[var(--text\/xl,20px)]">Meu painel</p>
                  </div>
                </a>
              </div>
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:10732" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:10732;29:15275" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent2} />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:10732;29:15278" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="I2009:10732;29:15279">
                    <p className="leading-[var(--text\/xl,20px)]">Configurações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-[var(--permaneo-border,#d7e2ea)] border-solid border-t-[length:var(--border\/default,1px)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start pt-[16px] relative shrink-0 w-full" data-node-id="2009:10733" data-name="div.border-t">
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[8px] relative shrink-0 w-full" data-node-id="2009:10734" data-name="div.flex">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[36px]" data-node-id="2009:10735" data-name="span.grid">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--blur\/lg,16px)] text-center whitespace-nowrap" data-node-id="2009:10736">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">CR</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="2009:10737" data-name="div.min-w-0">
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:10738" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:10739">
                    <p className="leading-[var(--text\/xl,20px)]">Camila Rocha</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:10740" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:10741">
                    <p className="leading-[var(--line-height\/16,16px)]">Estudante</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="content-stretch cursor-pointer flex gap-[var(--mention\/pill-bleed,8px)] h-[36px] items-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0 w-full" data-node-id="2009:10742" data-name="Component 3">
              <div className="relative shrink-0 size-[16px]" data-node-id="I2009:10742;29:15287" data-name="Component 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent3} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:10742;29:15291">
                <p className="leading-[var(--text\/xl,20px)]">Sair</p>
              </div>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[1000px] isolate items-center min-w-px pb-[870px] relative" data-node-id="2009:10743" data-name="div.min-w-0">
          <div className="backdrop-blur-[4px] bg-[var(--permaneo-subtle,#eaf1f5)] border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex gap-[var(--blur\/md,12px)] h-[64px] items-center px-[24px] shrink-0 sticky top-0 w-full z-[2]" data-node-id="2009:10744" data-name="header.sticky">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:10745" data-name="p.hidden">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--permaneo-text,#203746)] whitespace-nowrap" data-node-id="2009:10746">
                <p className="text-[#203746] text-[14px]">
                  <span className="font-['Manrope:Regular'] font-normal leading-[20px]">{`Escola Estadual Horizonte \xB7 `}</span>
                  <span className="font-['Manrope:Medium'] font-medium leading-[20px]">Demonstração</span>
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-end min-w-[36px] relative" data-node-id="2009:10747" data-name="div.ml-auto:margin">
              <div className="content-stretch flex items-center justify-end relative shrink-0 w-[80px]" data-node-id="2009:10748" data-name="div.ml-auto">
                <a className="content-stretch cursor-pointer flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:10749" data-name="Component 4">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:10749;11:15271" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[1280px] p-[32px] relative shrink-0 w-[1280px] z-[1]" data-node-id="2009:10750" data-name="main.mx-auto">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] h-[64px] items-start leading-[normal] overflow-clip relative shrink-0 w-[1216px]" data-node-id="2060:2366" data-name="Seu espaço">
              <p className="font-['Manrope:Bold'] font-bold relative shrink-0 text-[28px] text-[color:var(--ink,#203c46)] w-[1216px]" data-node-id="2060:2367">
                Seu espaço, do seu jeito.
              </p>
              <p className="font-['Manrope:Regular'] font-normal relative shrink-0 text-[15px] text-[color:var(--muted,#536a72)] w-[1216px]" data-node-id="2060:2368">
                Cuide dos seus dados e escolha como o Permaneo acompanha você.
              </p>
            </div>
            <div className="bg-[var(--hero,#f1f5f2)] content-stretch flex gap-[20px] h-[100px] items-start overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-[1216px]" data-node-id="2060:2369" data-name="Meu perfil escolar">
              <div className="bg-[var(--brand,#246579)] content-stretch flex flex-col items-start overflow-clip p-[12px] relative rounded-[16px] shrink-0 size-[60px]" data-node-id="2060:2370" data-name="Avatar · Camila Rocha">
                <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[24px] text-[color:var(--onbrand,white)] w-[36px]" data-node-id="2060:2371">
                  CR
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[5px] h-[60px] items-start leading-[normal] overflow-clip relative shrink-0 w-[760px]" data-node-id="2060:2372" data-name="Dados escolares">
                <p className="font-['Manrope:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--ink,#203c46)] w-[760px]" data-node-id="2060:2373">
                  Camila Rocha
                </p>
                <p className="font-['Manrope:Regular'] font-normal relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[760px]" data-node-id="2060:2374">
                  Estudante · Escola Estadual Horizonte · perfil demonstrativo
                </p>
              </div>
              <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" estilo="Secundário" texto="Pedir correção de dados" />
            </div>
            <div className="content-stretch flex gap-[24px] h-[300px] items-start overflow-clip relative shrink-0 w-[1216px]" data-node-id="2060:2378" data-name="Preferências">
              <div className="bg-[var(--surface,white)] content-stretch flex flex-col gap-[12px] h-[300px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[596px]" data-node-id="2060:2379" data-name="Notificações">
                <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[20px] text-[color:var(--ink,#203c46)] w-[548px]" data-node-id="2060:2380">
                  O que você quer receber?
                </p>
                <div className="content-stretch flex gap-[12px] h-[58px] items-start overflow-clip relative shrink-0 w-[548px]" data-node-id="2060:2381" data-name="Lembretes escolares">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] h-[56px] items-start leading-[normal] overflow-clip relative shrink-0 w-[372px]" data-node-id="2060:2382" data-name="Descrição">
                    <p className="font-['Manrope:Bold'] font-bold relative shrink-0 text-[15px] text-[color:var(--ink,#203c46)] w-[372px]" data-node-id="2060:2383">
                      Lembretes escolares
                    </p>
                    <p className="font-['Manrope:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[372px]" data-node-id="2060:2384">
                      Avisos para acompanhar sua frequência.
                    </p>
                  </div>
                  <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" data-node-id="2060:2385" data-name="Permaneo / Site / Button">
                    <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] text-left whitespace-nowrap" data-node-id="I2060:2385;2024:3372">
                      Ativado
                    </p>
                  </button>
                </div>
                <div className="content-stretch flex gap-[12px] h-[58px] items-start overflow-clip relative shrink-0 w-[548px]" data-node-id="2060:2388" data-name="Respostas aos pedidos">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] h-[56px] items-start leading-[normal] overflow-clip relative shrink-0 w-[372px]" data-node-id="2060:2389" data-name="Descrição">
                    <p className="font-['Manrope:Bold'] font-bold relative shrink-0 text-[15px] text-[color:var(--ink,#203c46)] w-[372px]" data-node-id="2060:2390">
                      Respostas aos pedidos
                    </p>
                    <p className="font-['Manrope:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[372px]" data-node-id="2060:2391">
                      Saiba quando a equipe responder.
                    </p>
                  </div>
                  <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" data-node-id="2060:2392" data-name="Permaneo / Site / Button">
                    <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] text-left whitespace-nowrap" data-node-id="I2060:2392;2024:3372">
                      Ativado
                    </p>
                  </button>
                </div>
                <div className="content-stretch flex gap-[12px] h-[58px] items-start overflow-clip relative shrink-0 w-[548px]" data-node-id="2060:2395" data-name="Dicas de organização">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] h-[56px] items-start leading-[normal] overflow-clip relative shrink-0 w-[372px]" data-node-id="2060:2396" data-name="Descrição">
                    <p className="font-['Manrope:Bold'] font-bold relative shrink-0 text-[15px] text-[color:var(--ink,#203c46)] w-[372px]" data-node-id="2060:2397">
                      Dicas de organização
                    </p>
                    <p className="font-['Manrope:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[372px]" data-node-id="2060:2398">
                      Pequenos lembretes para sua rotina.
                    </p>
                  </div>
                  <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" data-node-id="2060:2399" data-name="Permaneo / Site / Button">
                    <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] text-left whitespace-nowrap" data-node-id="I2060:2399;2024:3372">
                      Ativado
                    </p>
                  </button>
                </div>
              </div>
              <div className="bg-[var(--surface,white)] content-stretch flex flex-col gap-[16px] h-[300px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[596px]" data-node-id="2060:2402" data-name="Aparência">
                <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[20px] text-[color:var(--ink,#203c46)] w-[548px]" data-node-id="2060:2403">
                  Uma tela confortável para você
                </p>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[normal] relative shrink-0 text-[15px] text-[color:var(--muted,#536a72)] w-[548px]" data-node-id="2060:2404">
                  Escolha a aparência que combina com o seu momento. O tema claro é o padrão do Permaneo.
                </p>
                <div className="bg-[var(--bluebg,#e8f2f5)] content-stretch flex h-[68px] items-start overflow-clip p-[16px] relative rounded-[16px] shrink-0 w-[548px]" data-node-id="2060:2405" data-name="Tema atual">
                  <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[18px] text-[color:var(--brand,#246579)] w-[270px]" data-node-id="2060:2406">
                    Tema claro
                  </p>
                </div>
                <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" texto="Usar tema escuro" />
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] h-[250px] items-start overflow-clip relative shrink-0 w-[1216px]" data-node-id="2060:2410" data-name="Confiança e apoio">
              <div className="bg-[var(--surface,white)] content-stretch flex flex-col gap-[12px] h-[250px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[596px]" data-node-id="2060:2411" data-name="Privacidade">
                <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[20px] text-[color:var(--ink,#203c46)] w-[548px]" data-node-id="2060:2412">
                  Sua privacidade importa
                </p>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[normal] relative shrink-0 text-[15px] text-[color:var(--muted,#536a72)] w-[548px]" data-node-id="2060:2413">
                  Seus pedidos de apoio são destinados à equipe da escola. Informações pessoais não aparecem para outros estudantes.
                </p>
                <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[14px] text-[color:var(--green,#227457)] w-[548px]" data-node-id="2060:2414">
                  Compartilhe apenas o que você se sentir confortável em contar.
                </p>
                <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" estilo="Secundário" texto="Entender a privacidade" />
              </div>
              <div className="bg-[var(--greenbg,#e6f3ec)] content-stretch flex flex-col gap-[12px] h-[250px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[596px]" data-node-id="2060:2418" data-name="Ajuda e acolhimento">
                <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[normal] relative shrink-0 text-[20px] text-[color:var(--ink,#203c46)] w-[548px]" data-node-id="2060:2419">
                  Você pode contar com a escola
                </p>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[normal] relative shrink-0 text-[15px] text-[color:var(--muted,#536a72)] w-[548px]" data-node-id="2060:2420">
                  Dúvidas com os estudos, frequência ou algo que esteja acontecendo? Escolha o assunto e peça uma conversa.
                </p>
                <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0" texto="Pedir apoio à equipe" />
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[normal] relative shrink-0 text-[13px] text-[color:var(--green,#227457)] w-[548px]" data-node-id="2060:2424">
                  Uma conversa pode ser o começo de um próximo passo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default function StudentSpaceLight(props) {
  return <div className={styles.screen}><Component13MeuEspacoClaro {...props} /></div>;
}
