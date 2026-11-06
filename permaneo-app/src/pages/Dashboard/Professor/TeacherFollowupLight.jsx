import imgVariant3 from '../../../images/figma/422ec51e450a50eea47e.svg';
import imgVariant4 from '../../../images/figma/5ca6414882706a85b404.svg';
import imgVinculoSimboloVetorial from '../../../images/figma/a49165a5e37ca3d987d2.svg';
import imgComponent1 from '../../../images/figma/f65aed6e32044c304c5e.svg';
import imgComponent2 from '../../../images/figma/8f3a4e9d201d8a81bd29.svg';
import imgComponent3 from '../../../images/figma/8038ffe4ddfdddb0a1d6.svg';
import imgComponent4 from '../../../images/figma/a15c41e395271b03ede0.svg';
import imgComponent5 from '../../../images/figma/eb55f83ae8114999e31e.svg';
import imgComponent6 from '../../../images/figma/d48589aca79e44c3678c.svg';
import imgComponent7 from '../../../images/figma/1371c55dbe93e00d6fae.svg';
import imgComponent8 from '../../../images/figma/9ddd72eefbbb59d36b24.svg';
import imgComponent9 from '../../../images/figma/9ddd72eefbbb59d36b24.svg';
import imgComponent10 from '../../../images/figma/60d3cf1537ee0d8e6145.svg';
import imgComponent11 from '../../../images/figma/9ddd72eefbbb59d36b24.svg';
import imgIconDown from '../../../images/figma/e863a506b25940d0c43b.svg';
















import styles from './TeacherFollowupLight.module.css';

















function PermaneoSiteButton({ className, estilo = "Prim\xE1rio", texto = "Continuar" }) {
  const isSecundario = estilo === "Secund\xE1rio";
  return <div className={className || `content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] ${isSecundario ? "bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid" : "bg-[var(--brand,#246579)]"}`} id={isSecundario ? "node-2024_3369" : "node-2024_3368"}>
      {estilo === "Prim\xE1rio" && <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--onbrand,white)] whitespace-nowrap" data-node-id="2024:3371">
          {texto}
        </p>}
      {isSecundario && <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] whitespace-nowrap" data-node-id="2024:3372">
          {texto}
        </p>}
    </div>;
}
function Component1({ className, variant = "3" }) {
  const is4 = variant === "4";
  return <div className={className || "relative size-[18px]"} id={is4 ? "node-2009_2707" : "node-2009_2705"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={is4 ? imgVariant4 : imgVariant3} />
    </div>;
}
function Component10AcompanhamentoDoProfessorClaro() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:9834" data-name="10 · Acompanhamento do Professor | Claro">
      <div className="content-stretch flex items-start min-h-[1200px] relative shrink-0 w-full" data-node-id="2009:9835" data-name="div.min-h-screen">
        <div className="bg-[var(--permaneo-surface,white)] border-[var(--permaneo-border,#d7e2ea)] border-r-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] h-[1200px] items-start p-[16px] shrink-0 sticky top-0 w-[260px]" data-node-id="2009:9836" data-name="aside.sticky">
          <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:9837" data-name="a.px-2">
            <div className="content-stretch flex gap-[var(--mention\/pill-bleed,8px)] items-center relative shrink-0 w-[235px]" data-node-id="2009:9838" data-name="span.inline-flex">
              <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[227px]" data-node-id="2009:9839" data-name="a.px-2">
                <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:9840" data-name="a.px-2">
                  <div className="content-stretch flex gap-[var(--item-spacing\/8,8px)] items-center relative shrink-0" data-node-id="2009:9841" data-name="span.inline-flex">
                    <div className="relative shrink-0 size-[35px]" data-node-id="2009:9842" data-name="Logo Permaneo · Vínculo · Vetor">
                      <div className="absolute h-[26.979px] left-0 top-[4.01px] w-[35px]" data-node-id="2089:2505" data-name="Vínculo · símbolo vetorial">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
                      </div>
                    </div>
                    <a className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-node-id="2009:9847" data-name="span.text-lg">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:Bold')] font-[var(--font-weight\/700,700)] justify-center leading-[0] relative shrink-0 text-[#203c46] text-[length:var(--line-height\/18,18px)] text-left tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:9848">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-node-id="2009:9849" data-name="div.flex-1">
            <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0 w-full" data-node-id="2009:9850" data-name="Menu da plataforma">
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9851" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9851;29:12562" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9851;29:12565" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9851;29:12566">
                    <p className="leading-[var(--text\/xl,20px)]">Minhas turmas</p>
                  </div>
                </a>
              </div>
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9852" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9852;29:12568" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent2} />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9852;29:12570" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="I2009:9852;29:12571">
                    <p className="leading-[var(--text\/xl,20px)]">Acompanhamento</p>
                  </div>
                </div>
              </div>
              <a className="content-stretch cursor-pointer flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[var(--blur\/md,12px)] shrink-0 w-[227px]" data-node-id="2233:2931" data-name="Carômetro">
                <Component1 className="relative shrink-0 size-[18px]" variant="4" />
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2233:2931;11:12231" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--color\/azure\/37,#50606e)] text-left w-full" data-node-id="I2233:2931;11:12232" role="link" tabIndex="0">
                    <p className="cursor-pointer font-['Manrope:Medium'] font-medium leading-[20px] text-[14px]">Carômetro</p>
                  </div>
                </div>
              </a>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9853" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9853;29:12581" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent3} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9853;29:12584" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9853;29:12585">
                    <p className="leading-[var(--text\/xl,20px)]">Notificações</p>
                  </div>
                </a>
                <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex flex-col items-start px-[8px] relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0" data-node-id="I2009:9853;29:12586" data-name="9 não lidas">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Bold')] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-warning,#8a530d)] text-[length:var(--font-size\/12,12px)] whitespace-nowrap" data-node-id="I2009:9853;29:12587">
                    <p className="leading-[var(--line-height\/16,16px)]">9</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9854" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9854;29:12595" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9854;29:12598" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9854;29:12599">
                    <p className="leading-[var(--text\/xl,20px)]">Configurações</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-[var(--permaneo-border,#d7e2ea)] border-solid border-t-[length:var(--border\/default,1px)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start pt-[16px] relative shrink-0 w-full" data-node-id="2009:9855" data-name="div.border-t">
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[8px] relative shrink-0 w-full" data-node-id="2009:9856" data-name="div.flex">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[36px]" data-node-id="2009:9857" data-name="span.grid">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--blur\/lg,16px)] text-center whitespace-nowrap" data-node-id="2009:9858">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">RO</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="2009:9859" data-name="div.min-w-0">
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:9860" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:9861">
                    <p className="leading-[var(--text\/xl,20px)]">Renata Oliveira</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:9862" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:9863">
                    <p className="leading-[var(--line-height\/16,16px)]">Professor(a)</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="content-stretch cursor-pointer flex gap-[var(--mention\/pill-bleed,8px)] h-[36px] items-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0 w-full" data-node-id="2009:9864" data-name="Component 3">
              <div className="relative shrink-0 size-[16px]" data-node-id="I2009:9864;29:12607" data-name="Component 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent5} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:9864;29:12611">
                <p className="leading-[var(--text\/xl,20px)]">Sair</p>
              </div>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-center min-w-px pb-[219.5px] relative" data-node-id="2009:9865" data-name="div.min-w-0">
          <div className="backdrop-blur-[4px] bg-[var(--permaneo-subtle,#eaf1f5)] border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex gap-[var(--blur\/md,12px)] h-[64px] items-center px-[24px] shrink-0 sticky top-0 w-full z-[2]" data-node-id="2009:9866" data-name="header.sticky">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9867" data-name="p.hidden">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/14,14px)] whitespace-nowrap" data-node-id="2009:9868">
                <p className="leading-[var(--line-height\/20,20px)]">{`Escola Estadual Horizonte `}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-[76px] pl-[1251.3px] relative" data-node-id="2009:9869" data-name="div.ml-auto:margin">
              <div className="content-stretch cursor-pointer flex gap-[var(--toast\/icon-margin-end,4px)] items-center relative shrink-0" data-node-id="2009:9870" data-name="div.ml-auto">
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:9871" data-name="Component 4">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:9871;29:12618" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent6} />
                  </div>
                  <div className="absolute bg-[var(--permaneo-warning-bg,#fff3e1)] right-[6px] rounded-[var(--corner-radius\/33554400,33554400px)] size-[8px] top-[6px]" data-node-id="I2009:9871;29:12621" data-name="span.absolute" />
                </a>
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:9872" data-name="Component 5">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:9872;11:17103" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent7} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--blur\/lg,16px)] items-start max-w-[1280px] p-[32px] relative shrink-0 w-[1280px] z-[1]" data-node-id="2009:9873" data-name="main.mx-auto">
            <div className="content-stretch flex items-end relative shrink-0 w-full" data-node-id="2009:9874" data-name="div.mb-6">
              <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0" data-node-id="2009:9875" data-name="div">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9876" data-name="h1.text-2xl">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:SemiBold')] font-[var(--font-weight\/600,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/30,30px)] tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:9877">
                    <p className="leading-[var(--line-height\/36,36px)]">Acompanhamento de estudantes</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-node-id="2009:9878" data-name="p.mt-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--line-height\/16,16px)] whitespace-nowrap" data-node-id="2009:9879">
                    <p className="leading-[var(--width\/24,24px)]">Indicadores de atenção para iniciar conversas e oferecer apoio — nunca para rotular.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_58px] h-[100px] pb-[16px] pt-[24px] px-[16px] relative rounded-[var(--radius-card,18px)] shrink-0 w-full" data-node-id="2009:9880" data-name="div.surface-card">
              <div className="col-1 content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="2009:9881" data-name="div.grid">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9882" data-name="label.font-medium">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--blur\/md,12px)] w-full" data-node-id="2009:9883">
                    <p className="leading-[var(--blur\/lg,16px)]">Turma</p>
                  </div>
                </div>
                <button className="border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch cursor-pointer flex gap-[var(--item-spacing\/238_36,238.36000061035156px)] h-[36px] items-center justify-between px-[12px] py-[8px] relative rounded-[var(--text\/2xs,10px)] shrink-0 w-full" data-node-id="2009:9884" data-name="button#f-turma">
                  <div className="absolute bg-[var(--permaneo-surface,white)] h-[36px] left-[-1px] right-[-1px] rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[-1px]" data-node-id="2009:9885" data-name="button#f-turma:shadow" />
                  <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-node-id="2009:9886" data-name="span">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/14,14px)] text-center whitespace-nowrap" data-node-id="2009:9887">
                      <p className="leading-[var(--line-height\/20,20px)]">Todas as turmas</p>
                    </div>
                  </div>
                  <div className="opacity-[calc(var(--opacity\/50,100)/100)] relative shrink-0 size-[16px]" data-node-id="2009:9888" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent8} />
                  </div>
                </button>
              </div>
              <div className="col-2 content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="2009:9889" data-name="div.grid">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9890" data-name="label.font-medium">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--blur\/md,12px)] w-full" data-node-id="2009:9891">
                    <p className="leading-[var(--blur\/lg,16px)]">Série</p>
                  </div>
                </div>
                <button className="border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch cursor-pointer flex gap-[var(--item-spacing\/244_95,244.9499969482422px)] h-[36px] items-center justify-between px-[12px] py-[8px] relative rounded-[var(--text\/2xs,10px)] shrink-0 w-full" data-node-id="2009:9892" data-name="button#f-serie">
                  <div className="absolute bg-[var(--permaneo-surface,white)] h-[36px] left-[-1px] right-[-1px] rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[-1px]" data-node-id="2009:9893" data-name="button#f-serie:shadow" />
                  <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-node-id="2009:9894" data-name="span">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/14,14px)] text-center whitespace-nowrap" data-node-id="2009:9895">
                      <p className="leading-[var(--line-height\/20,20px)]">Todas as séries</p>
                    </div>
                  </div>
                  <div className="opacity-[calc(var(--opacity\/50,100)/100)] relative shrink-0 size-[16px]" data-node-id="2009:9896" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent9} />
                  </div>
                </button>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-start pt-[8px] relative shrink-0 w-full" data-node-id="2009:9897" data-name="div.mb-4">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px pb-[22px] relative" data-node-id="2009:9898" data-name="div.relative">
                <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid h-[36px] overflow-clip relative rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-node-id="2009:9899" data-name="Buscar estudante">
                  <div className="absolute bottom-[7.5px] content-stretch flex flex-col items-start left-[36px] overflow-clip pr-[805.45px] top-[7.5px]" data-node-id="2009:9900" data-name="div#placeholder">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--tw\/font-weight,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9901">
                      <p className="leading-[normal]">Buscar por nome</p>
                    </div>
                  </div>
                </div>
                <div className="-translate-y-1/2 absolute left-[10px] size-[16px] top-[calc(50%-10px)]" data-node-id="2009:9902" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent10} />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start relative shrink-0 w-[240px]" data-node-id="2009:9903" data-name="div.grid">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9904" data-name="label.font-medium">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--blur\/md,12px)] w-full" data-node-id="2009:9905">
                    <p className="leading-[var(--blur\/lg,16px)]">Situação</p>
                  </div>
                </div>
                <div className="border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex gap-[var(--item-spacing\/63_45,63.45000076293945px)] h-[36px] items-center justify-between px-[12px] py-[8px] relative rounded-[var(--text\/2xs,10px)] shrink-0 w-full" data-node-id="2009:9906" data-name="button#f-status">
                  <div className="absolute bg-[var(--permaneo-surface,white)] h-[36px] left-[-1px] right-[-1px] rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[-1px]" data-node-id="2009:9907" data-name="button#f-status:shadow" />
                  <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-node-id="2009:9908" data-name="span">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/14,14px)] text-center whitespace-nowrap" data-node-id="2009:9909">
                      <p className="leading-[var(--line-height\/20,20px)]">Precisam de atenção</p>
                    </div>
                  </div>
                  <div className="opacity-[calc(var(--opacity\/50,100)/100)] relative shrink-0 size-[16px]" data-node-id="2009:9910" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent11} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-control,16px)] items-start relative shrink-0 w-[1216px]" data-node-id="2035:4495" data-name="Busca e situação">
              <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-[780px]" data-node-id="2035:4496" data-name="Pesquisar estudante">
                <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[780px]" data-node-id="2035:4497">
                  Buscar estudante
                </p>
                <button className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex flex-col items-start p-[15px] relative rounded-[8px] shrink-0 w-[780px]" data-node-id="2035:4498" data-name="Campo · Buscar estudante">
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--ink,#203c46)] text-left w-[750px]" data-node-id="2035:4499">
                    Buscar por nome…
                  </p>
                </button>
              </div>
              <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-[420px]" data-node-id="2035:4501" data-name="Situação do acompanhamento">
                <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[420px]" data-node-id="2035:4502">
                  Situação
                </p>
                <button className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex flex-col items-start p-[15px] relative rounded-[8px] shrink-0 w-[420px]" data-node-id="2035:4503" data-name="Campo · Situação">
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--ink,#203c46)] text-left w-[357px]" data-node-id="2035:4504">
                    Precisam de atenção
                  </p>
                  <div className="absolute left-[388px] size-[16px] top-[17px]" data-node-id="2035:4505" data-name="icon/down">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDown} />
                  </div>
                </button>
              </div>
            </div>
            <div className="bg-[var(--surface,white)] border-[length:var(--border\/default,1px)] border-[var(--line,#d7e2e3)] border-solid content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-col items-start relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9911" data-name="Lista de estudantes · Site atualizado">
              <div className="[word-break:break-word] bg-[var(--surface2,#edf2f1)] content-stretch flex font-['Manrope:SemiBold'] font-semibold gap-[var(--space-control,16px)] items-start leading-[20px] p-[16px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[1216px]" data-node-id="2035:4323" data-name="Cabeçalho da lista">
                <p className="relative shrink-0 w-[240px]" data-node-id="2035:4324">
                  Estudante
                </p>
                <p className="relative shrink-0 w-[120px]" data-node-id="2035:4325">
                  Frequência
                </p>
                <p className="relative shrink-0 w-[140px]" data-node-id="2035:4326">
                  Notas · bimestres
                </p>
                <p className="relative shrink-0 w-[240px]" data-node-id="2035:4327">
                  Sinais de atenção
                </p>
                <p className="relative shrink-0 w-[200px]" data-node-id="2035:4328">
                  Situação
                </p>
                <p className="relative shrink-0 w-[164px]" data-node-id="2035:4329">
                  Ação
                </p>
              </div>
              <div className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0 w-[1216px]" data-node-id="2035:4330" data-name="Estudantes da escola">
                <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex gap-[16px] items-center p-[16px] relative shrink-0 w-[1216px]" data-node-id="2035:4355" data-name="Permaneo / Site / Linha de estudante">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-left w-[240px]" data-node-id="I2035:4355;2033:3527" data-name="Estudante">
                    <p className="font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[240px]" data-node-id="I2035:4355;2033:3528">
                      Eduardo Azeredo
                    </p>
                    <p className="font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[240px]" data-node-id="I2035:4355;2033:3529">
                      8º A · 8º ano
                    </p>
                  </div>
                  <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] text-left w-[120px]" data-node-id="I2035:4355;2033:3530">
                    76,1%
                  </p>
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left w-[140px]" data-node-id="I2035:4355;2033:3531">
                    8,9 · 8,1 · 7,2
                  </p>
                  <div className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[0] relative shrink-0 text-[13px] text-[color:var(--amber,#87530f)] text-left w-[240px]" data-node-id="I2035:4355;2033:3532">
                    <p className="leading-[20px] mb-0">3 faltas consecutivas</p>
                    <p className="leading-[20px]">30 faltas no ano</p>
                  </div>
                  <div className="bg-[var(--surface2,#edf2f1)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[10px] relative rounded-[14px] shrink-0 w-[200px]" data-node-id="I2035:4355;2033:3533" data-name="Situação">
                    <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[18px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] text-left w-[180px]" data-node-id="I2035:4355;2033:3534">
                      Precisa de atenção
                    </p>
                  </div>
                  <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[164px]" estilo="Secundário" texto="Ver estudante" />
                </button>
                <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex gap-[16px] items-center p-[16px] relative shrink-0 w-[1216px]" data-node-id="2035:4391" data-name="Permaneo / Site / Linha de estudante">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-left w-[240px]" data-node-id="I2035:4391;2033:3527" data-name="Estudante">
                    <p className="font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[240px]" data-node-id="I2035:4391;2033:3528">
                      Lucas Gomes
                    </p>
                    <p className="font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[240px]" data-node-id="I2035:4391;2033:3529">
                      9º A · 9º ano
                    </p>
                  </div>
                  <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] text-left w-[120px]" data-node-id="I2035:4391;2033:3530">
                    82,3%
                  </p>
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left w-[140px]" data-node-id="I2035:4391;2033:3531">
                    9,0 · 8,1 · 7,2
                  </p>
                  <div className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[0] relative shrink-0 text-[13px] text-[color:var(--amber,#87530f)] text-left w-[240px]" data-node-id="I2035:4391;2033:3532">
                    <p className="leading-[20px] mb-0">5 faltas consecutivas</p>
                    <p className="leading-[20px]">22 faltas no ano</p>
                  </div>
                  <div className="bg-[var(--surface2,#edf2f1)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[10px] relative rounded-[14px] shrink-0 w-[200px]" data-node-id="I2035:4391;2033:3533" data-name="Situação">
                    <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[18px] relative shrink-0 text-[12px] text-[color:var(--ink,#203c46)] text-left w-[180px]" data-node-id="I2035:4391;2033:3534">
                      Precisa de atenção
                    </p>
                  </div>
                  <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[164px]" estilo="Secundário" texto="Ver estudante" />
                </button>
              </div>
              <div className="bg-[var(--surface,white)] content-stretch flex gap-[20px] items-center p-[16px] relative shrink-0 w-[1216px]" data-node-id="2035:4457" data-name="Paginação">
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[800px]" data-node-id="2035:4458">
                  2 estudantes · Mostrando 1 a 2
                </p>
                <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-[344px]" data-node-id="2035:4459" data-name="Páginas">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 size-[52px]" data-node-id="2035:4460" data-name="Página 1">
                    <button className="absolute bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[49px] items-center justify-center left-0 px-[20px] py-[13px] rounded-[10px] top-0 w-[52px]" data-node-id="2035:4461" data-name="Permaneo / Site / Button">
                      <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--onbrand,white)] text-left whitespace-nowrap" data-node-id="I2035:4461;2024:3371">
                        1
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default function TeacherFollowupLight(props) {
  return <div className={styles.screen}><Component10AcompanhamentoDoProfessorClaro {...props} /></div>;
}
