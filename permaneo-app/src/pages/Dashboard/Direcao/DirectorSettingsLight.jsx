import imgVariant3 from '../../../images/figma/422ec51e450a50eea47e.svg';
import imgVariant4 from '../../../images/figma/5ca6414882706a85b404.svg';
import imgVinculoSimboloVetorial from '../../../images/figma/a58125bfbd059409217b.svg';
import imgComponent1 from '../../../images/figma/835cf7daafa10c099edc.svg';
import imgComponent2 from '../../../images/figma/25d8ff8567f51daaa381.svg';
import imgComponent3 from '../../../images/figma/8038ffe4ddfdddb0a1d6.svg';
import imgComponent4 from '../../../images/figma/8409aa137d6bb725d135.svg';
import imgComponent5 from '../../../images/figma/a481627a8db0800d47be.svg';
import imgComponent6 from '../../../images/figma/0bb5c83b08d92a4acac0.svg';
import imgComponent7 from '../../../images/figma/2e66ffed18476026da5f.svg';
import imgComponent8 from '../../../images/figma/5dd47880e5b7f3f6564b.svg';












import styles from './DirectorSettingsLight.module.css';













function Component1({ className, variant = "3" }) {
  const is4 = variant === "4";
  return <div className={className || "relative size-[18px]"} id={is4 ? "node-2009_2707" : "node-2009_2705"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={is4 ? imgVariant4 : imgVariant3} />
    </div>;
}
function Component09ConfiguracoesDaDirecaoClaro() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:9578" data-name="09 · Configurações da Direção | Claro">
      <div className="content-stretch flex items-start min-h-[1200px] relative shrink-0 w-full" data-node-id="2009:9579" data-name="div.min-h-screen">
        <div className="bg-[var(--permaneo-surface,white)] border-[var(--permaneo-border,#d7e2ea)] border-r-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] h-[1200px] items-start pb-[16px] pt-[12px] px-[16px] shrink-0 sticky top-0 w-[260px]" data-node-id="2009:9580" data-name="aside.sticky">
          <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:9581" data-name="a.px-2">
            <div className="content-stretch flex gap-[var(--mention\/pill-bleed,8px)] items-center relative shrink-0 w-[235px]" data-node-id="2009:9582" data-name="span.inline-flex">
              <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[227px]" data-node-id="2009:9583" data-name="a.px-2">
                <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:9584" data-name="a.px-2">
                  <div className="content-stretch flex gap-[var(--item-spacing\/8,8px)] items-center relative shrink-0" data-node-id="2009:9585" data-name="span.inline-flex">
                    <div className="relative shrink-0 size-[35px]" data-node-id="2009:9586" data-name="Logo Permaneo · Vínculo · Vetor">
                      <div className="absolute h-[26.979px] left-0 top-[4.01px] w-[35px]" data-node-id="2089:2489" data-name="Vínculo · símbolo vetorial">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
                      </div>
                    </div>
                    <a className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-node-id="2009:9591" data-name="span.text-lg">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:Bold')] font-[var(--font-weight\/700,700)] justify-center leading-[0] relative shrink-0 text-[#203c46] text-[length:var(--line-height\/18,18px)] text-left tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:9592">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-node-id="2009:9593" data-name="div.flex-1">
            <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0 w-full" data-node-id="2009:9594" data-name="Menu da plataforma">
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9595" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9595;29:11900" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9595;29:11905" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9595;29:11906">
                    <p className="leading-[var(--text\/xl,20px)]">Painel da escola</p>
                  </div>
                </a>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9596" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9596;29:11913" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent2} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9596;29:11915" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9596;29:11916">
                    <p className="leading-[var(--text\/xl,20px)]">Acompanhamento</p>
                  </div>
                </a>
              </div>
              <a className="content-stretch cursor-pointer flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[var(--blur\/md,12px)] shrink-0 w-[227px]" data-node-id="2233:2925" data-name="Carômetro">
                <Component1 className="relative shrink-0 size-[18px]" variant="4" />
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2233:2925;11:12231" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--color\/azure\/37,#50606e)] text-left w-full" data-node-id="I2233:2925;11:12232" role="link" tabIndex="0">
                    <p className="cursor-pointer font-['Manrope:Medium'] font-medium leading-[20px] text-[14px]">Carômetro</p>
                  </div>
                </div>
              </a>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9597" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9597;29:11926" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent3} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9597;29:11929" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9597;29:11930">
                    <p className="leading-[var(--text\/xl,20px)]">Notificações</p>
                  </div>
                </a>
                <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex flex-col items-start px-[8px] relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0" data-node-id="I2009:9597;29:11931" data-name="9 não lidas">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Bold')] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-warning,#8a530d)] text-[length:var(--font-size\/12,12px)] whitespace-nowrap" data-node-id="I2009:9597;29:11932">
                    <p className="leading-[var(--line-height\/16,16px)]">9</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9598" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9598;29:11942" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9598;29:11947" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:9598;29:11948">
                    <p className="leading-[var(--text\/xl,20px)]">Relatórios</p>
                  </div>
                </a>
              </div>
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:9599" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:9599;29:11950" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent5} />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:9599;29:11953" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="I2009:9599;29:11954">
                    <p className="leading-[var(--text\/xl,20px)]">Configurações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-[var(--permaneo-border,#d7e2ea)] border-solid border-t-[length:var(--border\/default,1px)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start pt-[16px] relative shrink-0 w-full" data-node-id="2009:9600" data-name="div.border-t">
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[8px] relative shrink-0 w-full" data-node-id="2009:9601" data-name="div.flex">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[36px]" data-node-id="2009:9602" data-name="span.grid">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--blur\/lg,16px)] text-center whitespace-nowrap" data-node-id="2009:9603">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">MS</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="2009:9604" data-name="div.min-w-0">
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:9605" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:9606">
                    <p className="leading-[var(--text\/xl,20px)]">Marcos Silva</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:9607" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:9608">
                    <p className="leading-[var(--line-height\/16,16px)]">Direção e coordenação</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="content-stretch cursor-pointer flex gap-[var(--mention\/pill-bleed,8px)] h-[36px] items-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0 w-full" data-node-id="2009:9609" data-name="Component 3">
              <div className="relative shrink-0 size-[16px]" data-node-id="I2009:9609;29:11962" data-name="Component 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent6} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:9609;29:11966">
                <p className="leading-[var(--text\/xl,20px)]">Sair</p>
              </div>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-center min-w-px pb-[447px] relative" data-node-id="2009:9610" data-name="div.min-w-0">
          <div className="backdrop-blur-[4px] bg-[var(--permaneo-subtle,#eaf1f5)] border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex gap-[var(--blur\/md,12px)] h-[64px] items-center px-[24px] shrink-0 sticky top-0 w-full z-[2]" data-node-id="2009:9611" data-name="header.sticky">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9612" data-name="p.hidden">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--permaneo-text,#203746)] whitespace-nowrap" data-node-id="2009:9613">
                <p className="text-[#203746] text-[14px]">
                  <span className="font-['Manrope:Regular'] font-normal leading-[20px]">{`Escola Estadual Horizonte \xB7 `}</span>
                  <span className="font-['Manrope:Medium'] font-medium leading-[20px]">Demonstração</span>
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-[76px] pl-[1251.3px] relative" data-node-id="2009:9614" data-name="div.ml-auto:margin">
              <div className="content-stretch cursor-pointer flex gap-[var(--toast\/icon-margin-end,4px)] items-center relative shrink-0" data-node-id="2009:9615" data-name="div.ml-auto">
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:9616" data-name="Component 4">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:9616;29:11973" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent7} />
                  </div>
                  <div className="absolute bg-[var(--permaneo-warning-bg,#fff3e1)] right-[6px] rounded-[var(--corner-radius\/33554400,33554400px)] size-[8px] top-[6px]" data-node-id="I2009:9616;29:11976" data-name="span.absolute" />
                </a>
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:9617" data-name="Component 5">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:9617;11:12565" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent8} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] items-start max-w-[1280px] p-[32px] relative shrink-0 w-[1280px] z-[1]" data-node-id="2009:9618" data-name="main.mx-auto">
            <div className="content-stretch flex items-end relative shrink-0 w-full" data-node-id="2009:9619" data-name="div.mb-6">
              <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0" data-node-id="2009:9620" data-name="div">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9621" data-name="h1.text-2xl">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:SemiBold')] font-[var(--font-weight\/600,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/30,30px)] tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:9622">
                    <p className="leading-[var(--line-height\/36,36px)]">Configurações</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-node-id="2009:9623" data-name="p.mt-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--line-height\/16,16px)] whitespace-nowrap" data-node-id="2009:9624">
                    <p className="leading-[var(--width\/24,24px)]">Ajuste como e quando a equipe é avisada.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__406px_107px] h-[537px] relative shrink-0 w-full" data-node-id="2009:9625" data-name="div.grid">
              <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid col-1 content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-col gap-[var(--blur\/lg,16px)] items-start justify-self-stretch p-[20px] relative rounded-[var(--radius-card,18px)] row-1 self-start shrink-0" data-node-id="2009:9626" data-name="section.surface-card">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9627" data-name="h2.font-semibold">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--blur\/lg,16px)] tracking-[var(--letter-spacing\/-0_24,-0.24px)] w-full" data-node-id="2009:9628">
                    <p className="leading-[var(--dialog\/viewport-inset,24px)]">Critérios dos indicadores de atenção</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start relative shrink-0 w-full" data-node-id="2009:9629" data-name="div.grid">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9630" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:9631">
                      <p className="leading-[var(--text\/sm,14px)]">Faltas consecutivas para alerta</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[36px] items-start overflow-clip px-[12px] py-[7.5px] relative rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-node-id="2009:9632" data-name="input#consecutiveAbsences">
                    <div className="content-stretch flex h-full items-center relative shrink-0" data-node-id="2009:9633" data-name="div#text-field-container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9634" data-name="div#editing-view-port">
                        <div className="content-stretch flex flex-col items-start overflow-auto pr-[507.25px] relative shrink-0" data-node-id="2009:9635" data-name="div">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--tw\/font-weight,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9636">
                            <p className="leading-[normal]">3</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex h-full items-start relative shrink-0" data-node-id="2009:9637" data-name="div#spin:align-stretch">
                        <div className="h-full min-w-[13px] opacity-0 relative shrink-0 w-[13px]" data-node-id="2009:9638" data-name="div#spin" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start relative shrink-0 w-full" data-node-id="2009:9639" data-name="div.grid">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9640" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:9641">
                      <p className="leading-[var(--text\/sm,14px)]">Meta mínima de frequência (%)</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[36px] items-start overflow-clip px-[12px] py-[7.5px] relative rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-node-id="2009:9642" data-name="input#minFrequency">
                    <div className="content-stretch flex h-full items-center relative shrink-0" data-node-id="2009:9643" data-name="div#text-field-container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9644" data-name="div#editing-view-port">
                        <div className="content-stretch flex flex-col items-start overflow-auto pr-[499.87px] relative shrink-0" data-node-id="2009:9645" data-name="div">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--tw\/font-weight,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9646">
                            <p className="leading-[normal]">75</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex h-full items-start relative shrink-0" data-node-id="2009:9647" data-name="div#spin:align-stretch">
                        <div className="h-full min-w-[13px] opacity-0 relative shrink-0 w-[13px]" data-node-id="2009:9648" data-name="div#spin" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start relative shrink-0 w-full" data-node-id="2009:9649" data-name="div.grid">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9650" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:9651">
                      <p className="leading-[var(--text\/sm,14px)]">Queda de frequência (pontos)</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[36px] items-start overflow-clip px-[12px] py-[7.5px] relative rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-node-id="2009:9652" data-name="input#frequencyDrop">
                    <div className="content-stretch flex h-full items-center relative shrink-0" data-node-id="2009:9653" data-name="div#text-field-container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9654" data-name="div#editing-view-port">
                        <div className="content-stretch flex flex-col items-start overflow-auto pr-[506.86px] relative shrink-0" data-node-id="2009:9655" data-name="div">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--tw\/font-weight,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9656">
                            <p className="leading-[normal]">8</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex h-full items-start relative shrink-0" data-node-id="2009:9657" data-name="div#spin:align-stretch">
                        <div className="h-full min-w-[13px] opacity-0 relative shrink-0 w-[13px]" data-node-id="2009:9658" data-name="div#spin" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start relative shrink-0 w-full" data-node-id="2009:9659" data-name="div.grid">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9660" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:9661">
                      <p className="leading-[var(--text\/sm,14px)]">Queda de média entre bimestres</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[36px] items-start overflow-clip px-[12px] py-[7.5px] relative rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-node-id="2009:9662" data-name="input#gradeDrop">
                    <div className="content-stretch flex h-full items-center relative shrink-0" data-node-id="2009:9663" data-name="div#text-field-container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9664" data-name="div#editing-view-port">
                        <div className="content-stretch flex flex-col items-start overflow-auto pr-[498.3px] relative shrink-0" data-node-id="2009:9665" data-name="div">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Regular')] font-[var(--tw\/font-weight,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9666">
                            <p className="leading-[normal]">1,5</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex h-full items-start relative shrink-0" data-node-id="2009:9667" data-name="div#spin:align-stretch">
                        <div className="h-full min-w-[13px] opacity-0 relative shrink-0 w-[13px]" data-node-id="2009:9668" data-name="div#spin" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-[var(--permaneo-brand,#24647b)] content-stretch cursor-pointer flex h-[36px] items-center justify-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0" data-node-id="2009:9669" data-name="Component 6">
                  <div className="absolute bg-[var(--permaneo-brand,#24647b)] h-[36px] left-0 right-0 rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0" data-node-id="I2009:9669;29:11889" data-name="button.inline-flex:shadow" />
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-on-brand,white)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:9669;29:11890">
                    <p className="leading-[var(--text\/xl,20px)]">Salvar critérios</p>
                  </div>
                </button>
              </div>
              <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid col-2 content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-col gap-[var(--blur\/lg,16px)] items-start justify-self-stretch pb-[220px] pt-[20px] px-[20px] relative rounded-[var(--radius-card,18px)] row-1 self-start shrink-0" data-node-id="2009:9670" data-name="section.surface-card">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9671" data-name="h2.font-semibold">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--blur\/lg,16px)] tracking-[var(--letter-spacing\/-0_24,-0.24px)] w-full" data-node-id="2009:9672">
                    <p className="leading-[var(--dialog\/viewport-inset,24px)]">Notificações por e-mail</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[var(--item-spacing\/380_2,380.20001220703125px)] items-center justify-between relative shrink-0 w-full" data-node-id="2009:9673" data-name="div.flex">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9674" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9675">
                      <p className="leading-[var(--text\/sm,14px)]">Alertas para a equipe</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-brand,#24647b)] border-[length:var(--leading\/loose,2px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[20px] items-center pl-[16px] relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 w-[36px]" data-node-id="2009:9676" data-name="button#staffAlerts">
                    <div className="-translate-y-1/2 absolute bg-[var(--permaneo-surface,white)] h-[20px] left-[-2px] rounded-[var(--corner-radius\/33554400,33554400px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-1/2 w-[36px]" data-node-id="2009:9677" data-name="button#staffAlerts:shadow" />
                    <div className="bg-[var(--permaneo-surface,white)] content-stretch flex flex-col items-start justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[16px]" data-node-id="2009:9678" data-name="span.pointer-events-none">
                      <div className="bg-[var(--permaneo-surface,white)] relative rounded-[var(--corner-radius\/33554400,33554400px)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[16px]" data-node-id="2009:9679" data-name="span.pointer-events-none:shadow" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[var(--item-spacing\/424_73,424.7300109863281px)] items-center justify-between relative shrink-0 w-full" data-node-id="2009:9680" data-name="div.flex">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9681" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9682">
                      <p className="leading-[var(--text\/sm,14px)]">Resumo diário</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-canvas,#f4f7fa)] border-[length:var(--leading\/loose,2px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[20px] items-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 w-[36px]" data-node-id="2009:9683" data-name="button#dailyDigest">
                    <div className="-translate-y-1/2 absolute bg-[var(--permaneo-surface,white)] h-[20px] left-[-2px] rounded-[var(--corner-radius\/33554400,33554400px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-1/2 w-[36px]" data-node-id="2009:9684" data-name="button#dailyDigest:shadow" />
                    <div className="bg-[var(--permaneo-surface,white)] content-stretch flex flex-col items-start justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[16px]" data-node-id="2009:9685" data-name="span.pointer-events-none">
                      <div className="bg-[var(--permaneo-surface,white)] relative rounded-[var(--corner-radius\/33554400,33554400px)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[16px]" data-node-id="2009:9686" data-name="span.pointer-events-none:shadow" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[var(--item-spacing\/404_03,404.0299987792969px)] items-center justify-between relative shrink-0 w-full" data-node-id="2009:9687" data-name="div.flex">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:9688" data-name="label.text-sm">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9689">
                      <p className="leading-[var(--text\/sm,14px)]">Avisos às famílias</p>
                    </div>
                  </div>
                  <div className="bg-[var(--permaneo-canvas,#f4f7fa)] border-[length:var(--leading\/loose,2px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[20px] items-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 w-[36px]" data-node-id="2009:9690" data-name="button#familyNotices">
                    <div className="-translate-y-1/2 absolute bg-[var(--permaneo-surface,white)] h-[20px] left-[-2px] rounded-[var(--corner-radius\/33554400,33554400px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-1/2 w-[36px]" data-node-id="2009:9691" data-name="button#familyNotices:shadow" />
                    <div className="bg-[var(--permaneo-surface,white)] content-stretch flex flex-col items-start justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[16px]" data-node-id="2009:9692" data-name="span.pointer-events-none">
                      <div className="bg-[var(--permaneo-surface,white)] relative rounded-[var(--corner-radius\/33554400,33554400px)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[16px]" data-node-id="2009:9693" data-name="span.pointer-events-none:shadow" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9694" data-name="p.text-xs">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:9695">
                    <p className="leading-[var(--line-height\/16,16px)]">Na demonstração, nenhum e-mail é enviado de fato.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid col-[1/span_2] content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-col gap-[var(--blur\/md,12px)] items-start justify-self-stretch p-[20px] relative rounded-[var(--radius-card,18px)] row-2 self-start shrink-0" data-node-id="2009:9696" data-name="section.surface-card">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:9697" data-name="h2.mb-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--blur\/lg,16px)] tracking-[var(--letter-spacing\/-0_24,-0.24px)] w-full" data-node-id="2009:9698">
                    <p className="leading-[var(--dialog\/viewport-inset,24px)]">Histórico de alterações</p>
                  </div>
                </div>
                <div className="border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-wrap gap-[var(--blur\/md,0px_12px)] h-[29px] items-start pb-[8px] relative shrink-0 w-full" data-node-id="2009:9699" data-name="li.flex">
                  <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-node-id="2009:9700" data-name="span.text-muted-foreground">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/14,14px)] whitespace-nowrap" data-node-id="2009:9701">
                      <p className="leading-[var(--line-height\/20,20px)]">07/10/2026</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-node-id="2009:9702" data-name="span.font-medium">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:9703">
                      <p className="leading-[var(--text\/xl,20px)]">Marcos Silva</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-node-id="2009:9704" data-name="span">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/14,14px)] whitespace-nowrap" data-node-id="2009:9705">
                      <p className="leading-[var(--line-height\/20,20px)]">Atualizou o status de acompanhamento de um estudante do 1º EM A</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default function DirectorSettingsLight(props) {
  return <div className={styles.screen}><Component09ConfiguracoesDaDirecaoClaro {...props} /></div>;
}
