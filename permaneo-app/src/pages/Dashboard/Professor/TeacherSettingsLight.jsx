import Toggle from '../../../components/students/Toggle.jsx';
import imgVariant3 from '../../../images/figma/422ec51e450a50eea47e.svg';
import imgVariant4 from '../../../images/figma/5ca6414882706a85b404.svg';
import imgVinculoSimboloVetorial from '../../../images/figma/a58125bfbd059409217b.svg';
import imgComponent1 from '../../../images/figma/f65aed6e32044c304c5e.svg';
import imgComponent2 from '../../../images/figma/25d8ff8567f51daaa381.svg';
import imgComponent3 from '../../../images/figma/8038ffe4ddfdddb0a1d6.svg';
import imgComponent4 from '../../../images/figma/a481627a8db0800d47be.svg';
import imgComponent5 from '../../../images/figma/0bb5c83b08d92a4acac0.svg';
import imgComponent6 from '../../../images/figma/1ccf15fb1d747b472d81.svg';
import imgComponent7 from '../../../images/figma/1371c55dbe93e00d6fae.svg';











import styles from './TeacherSettingsLight.module.css';












function Component1({ className, variant = "3" }) {
  const is4 = variant === "4";
  return <div className={className || "relative size-[18px]"} id={is4 ? "node-2009_2707" : "node-2009_2705"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={is4 ? imgVariant4 : imgVariant3} />
    </div>;
}
function Component12ConfiguracoesDoProfessorClaro() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:10570" data-name="12 · Configurações do Professor | Claro">
      <div className="content-stretch flex items-start min-h-[1200px] relative shrink-0 w-full" data-node-id="2009:10571" data-name="div.min-h-screen">
        <div className="bg-[var(--permaneo-surface,white)] border-[var(--permaneo-border,#d7e2ea)] border-r-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] h-[1200px] items-start p-[16px] shrink-0 sticky top-0 w-[260px]" data-node-id="2009:10572" data-name="aside.sticky">
          <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:10573" data-name="a.px-2">
            <div className="content-stretch flex gap-[var(--mention\/pill-bleed,8px)] items-center relative shrink-0 w-[235px]" data-node-id="2009:10574" data-name="span.inline-flex">
              <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[227px]" data-node-id="2009:10575" data-name="a.px-2">
                <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:10576" data-name="a.px-2">
                  <div className="content-stretch flex gap-[var(--item-spacing\/8,8px)] items-center relative shrink-0" data-node-id="2009:10577" data-name="span.inline-flex">
                    <div className="relative shrink-0 size-[35px]" data-node-id="2009:10578" data-name="Logo Permaneo · Vínculo · Vetor">
                      <div className="absolute h-[26.979px] left-0 top-[4.01px] w-[35px]" data-node-id="2089:2569" data-name="Vínculo · símbolo vetorial">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
                      </div>
                    </div>
                    <a className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-node-id="2009:10583" data-name="span.text-lg">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:Bold')] font-[var(--font-weight\/700,700)] justify-center leading-[0] relative shrink-0 text-[#203c46] text-[length:var(--line-height\/18,18px)] text-left tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:10584">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-node-id="2009:10585" data-name="div.flex-1">
            <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0 w-full" data-node-id="2009:10586" data-name="Menu da plataforma">
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:10587" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:10587;29:14773" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:10587;29:14776" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:10587;29:14777">
                    <p className="leading-[var(--text\/xl,20px)]">Minhas turmas</p>
                  </div>
                </a>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:10588" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:10588;29:14784" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent2} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:10588;29:14786" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:10588;29:14787">
                    <p className="leading-[var(--text\/xl,20px)]">Acompanhamento</p>
                  </div>
                </a>
              </div>
              <a className="content-stretch cursor-pointer flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[var(--blur\/md,12px)] shrink-0 w-[227px]" data-node-id="2233:2943" data-name="Carômetro">
                <Component1 className="relative shrink-0 size-[18px]" variant="4" />
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2233:2943;11:12231" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--color\/azure\/37,#50606e)] text-left w-full" data-node-id="I2233:2943;11:12232" role="link" tabIndex="0">
                    <p className="cursor-pointer font-['Manrope:Medium'] font-medium leading-[20px] text-[14px]">Carômetro</p>
                  </div>
                </div>
              </a>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:10589" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:10589;29:14797" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent3} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:10589;29:14800" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:10589;29:14801">
                    <p className="leading-[var(--text\/xl,20px)]">Notificações</p>
                  </div>
                </a>
                <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex flex-col items-start px-[8px] relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0" data-node-id="I2009:10589;29:14802" data-name="9 não lidas">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Bold')] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-warning,#8a530d)] text-[length:var(--font-size\/12,12px)] whitespace-nowrap" data-node-id="I2009:10589;29:14803">
                    <p className="leading-[var(--line-height\/16,16px)]">9</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:10590" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:10590;29:14805" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:10590;29:14808" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="I2009:10590;29:14809">
                    <p className="leading-[var(--text\/xl,20px)]">Configurações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-[var(--permaneo-border,#d7e2ea)] border-solid border-t-[length:var(--border\/default,1px)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start pt-[16px] relative shrink-0 w-full" data-node-id="2009:10591" data-name="div.border-t">
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[8px] relative shrink-0 w-full" data-node-id="2009:10592" data-name="div.flex">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[36px]" data-node-id="2009:10593" data-name="span.grid">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--blur\/lg,16px)] text-center whitespace-nowrap" data-node-id="2009:10594">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">RO</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="2009:10595" data-name="div.min-w-0">
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:10596" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:10597">
                    <p className="leading-[var(--text\/xl,20px)]">Renata Oliveira</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:10598" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:10599">
                    <p className="leading-[var(--line-height\/16,16px)]">Professor(a)</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="content-stretch cursor-pointer flex gap-[var(--mention\/pill-bleed,8px)] h-[36px] items-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0 w-full" data-node-id="2009:10600" data-name="Component 3">
              <div className="relative shrink-0 size-[16px]" data-node-id="I2009:10600;29:14817" data-name="Component 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent5} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:10600;29:14821">
                <p className="leading-[var(--text\/xl,20px)]">Sair</p>
              </div>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-center min-w-px pb-[778px] relative" data-node-id="2009:10601" data-name="div.min-w-0">
          <div className="backdrop-blur-[4px] bg-[var(--permaneo-subtle,#eaf1f5)] border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex gap-[var(--blur\/md,12px)] h-[64px] items-center px-[24px] shrink-0 sticky top-0 w-full z-[2]" data-node-id="2009:10602" data-name="header.sticky">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:10603" data-name="p.hidden">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--permaneo-text,#203746)] whitespace-nowrap" data-node-id="2009:10604">
                <p className="text-[#203746] text-[14px]">
                  <span className="font-['Manrope:Regular'] font-normal leading-[20px]">{`Escola Estadual Horizonte \xB7 `}</span>
                  <span className="font-['Manrope:Medium'] font-medium leading-[20px]">Demonstração</span>
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-[76px] pl-[1251.3px] relative" data-node-id="2009:10605" data-name="div.ml-auto:margin">
              <div className="content-stretch cursor-pointer flex gap-[var(--toast\/icon-margin-end,4px)] items-center relative shrink-0" data-node-id="2009:10606" data-name="div.ml-auto">
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:10607" data-name="Component 4">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:10607;29:14828" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent6} />
                  </div>
                  <div className="absolute bg-[var(--permaneo-warning-bg,#fff3e1)] right-[6px] rounded-[var(--corner-radius\/33554400,33554400px)] size-[8px] top-[6px]" data-node-id="I2009:10607;29:14831" data-name="span.absolute" />
                </a>
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:10608" data-name="Component 5">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:10608;11:17103" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent7} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] items-start max-w-[1280px] p-[32px] relative shrink-0 w-[1280px] z-[1]" data-node-id="2009:10609" data-name="main.mx-auto">
            <div className="content-stretch flex items-end relative shrink-0 w-full" data-node-id="2009:10610" data-name="div.mb-6">
              <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0" data-node-id="2009:10611" data-name="div">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:10612" data-name="h1.text-2xl">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:SemiBold')] font-[var(--font-weight\/600,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/30,30px)] tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:10613">
                    <p className="leading-[var(--line-height\/36,36px)]">Configurações</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-node-id="2009:10614" data-name="p.mt-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--line-height\/16,16px)] whitespace-nowrap" data-node-id="2009:10615">
                    <p className="leading-[var(--width\/24,24px)]">Ajuste como e quando a equipe é avisada.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-col gap-[var(--blur\/lg,16px)] items-start p-[20px] relative rounded-[var(--radius-card,18px)] shrink-0 w-[596px]" data-node-id="2009:10616" data-name="section.surface-card">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:10617" data-name="h2.font-semibold">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--blur\/lg,16px)] tracking-[var(--letter-spacing\/-0_24,-0.24px)] w-full" data-node-id="2009:10618">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">Notificações por e-mail</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[var(--item-spacing\/380_2,380.20001220703125px)] items-center justify-between relative shrink-0 w-full" data-node-id="2009:10619" data-name="div.flex">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:10620" data-name="label.text-sm">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:10621">
                    <p className="leading-[var(--text\/sm,14px)]">Alertas para a equipe</p>
                  </div>
                </div>
                <Toggle label="staffAlerts" storageKey="staffAlerts" />
              </div>
              <div className="content-stretch flex gap-[var(--item-spacing\/424_73,424.7300109863281px)] items-center justify-between relative shrink-0 w-full" data-node-id="2009:10626" data-name="div.flex">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:10627" data-name="label.text-sm">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:10628">
                    <p className="leading-[var(--text\/sm,14px)]">Resumo diário</p>
                  </div>
                </div>
                <Toggle label="Resumo diário" storageKey="dailyDigest" />
              </div>
              <div className="content-stretch flex gap-[var(--item-spacing\/404_03,404.0299987792969px)] items-center justify-between relative shrink-0 w-full" data-node-id="2009:10633" data-name="div.flex">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:10634" data-name="label.text-sm">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:10635">
                    <p className="leading-[var(--text\/sm,14px)]">Avisos às famílias</p>
                  </div>
                </div>
                <Toggle label="Avisos para responsáveis" storageKey="familyNotices" />
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:10640" data-name="p.text-xs">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:10641">
                  <p className="leading-[var(--line-height\/16,16px)]">Na demonstração, nenhum e-mail é enviado de fato.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default function TeacherSettingsLight(props) {
  return <div className={styles.screen}><Component12ConfiguracoesDoProfessorClaro {...props} /></div>;
}
