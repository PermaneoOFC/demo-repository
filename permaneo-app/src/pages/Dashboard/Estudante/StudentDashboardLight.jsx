import imgVinculoSimboloVetorial from '../../../images/figma/ab2c20b78e7573f02b90.svg';
import imgComponent1 from '../../../images/figma/584f4b41cf30aa5156d5.svg';
import imgComponent2 from '../../../images/figma/34d7f0633c5dfab266ee.svg';
import imgComponent3 from '../../../images/figma/b084ef26181a13048619.svg';
import imgComponent4 from '../../../images/figma/1191e2ea360001514eca.svg';
import imgComponent5 from '../../../images/figma/2a8eebcd81235283d22d.svg';
import imgComponent6 from '../../../images/figma/d53c4a119533fcb5ed7a.svg';
import imgComponent7 from '../../../images/figma/294a7d932dc37b92c463.svg';
import imgIconDown from '../../../images/figma/e863a506b25940d0c43b.svg';










import styles from './StudentDashboardLight.module.css';











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
function Component05MeuPainelClaro() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:8460" data-name="05 · Meu painel | Claro">
      <div className="content-stretch flex h-[1200px] items-start min-h-[1200px] relative shrink-0 w-full" data-node-id="2009:8461" data-name="div.min-h-screen">
        <div className="bg-[var(--permaneo-surface,white)] border-[var(--permaneo-border,#d7e2ea)] border-r-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] h-[1080px] items-start p-[16px] shrink-0 sticky top-0 w-[260px]" data-node-id="2009:8462" data-name="aside.sticky">
          <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:8463" data-name="a.px-2">
            <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:8464" data-name="a.px-2">
              <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:8465" data-name="a.px-2">
                <div className="content-stretch flex gap-[var(--item-spacing\/8,8px)] items-center relative shrink-0" data-node-id="2009:8466" data-name="span.inline-flex">
                  <div className="relative shrink-0 size-[35px]" data-node-id="2009:8467" data-name="Logo Permaneo · Vínculo · Vetor">
                    <div className="absolute h-[26.979px] left-0 top-[4.01px] w-[35px]" data-node-id="2089:2425" data-name="Vínculo · símbolo vetorial">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
                    </div>
                  </div>
                  <a className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-node-id="2009:8472" data-name="span.text-lg">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:Bold')] font-[var(--font-weight\/700,700)] justify-center leading-[0] relative shrink-0 text-[#203c46] text-[length:var(--line-height\/18,18px)] text-left tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:8473">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-node-id="2009:8474" data-name="div.flex-1">
            <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0 w-full" data-node-id="2009:8475" data-name="Menu da plataforma">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:8476" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:8476;11:15213" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:8476;11:15217" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="I2009:8476;11:15218">
                    <p className="leading-[var(--text\/xl,20px)]">Meu painel</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:8477" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:8477;11:15150" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent2} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:8477;11:15153" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:8477;11:15154">
                    <p className="leading-[var(--text\/xl,20px)]">Configurações</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-[var(--permaneo-border,#d7e2ea)] border-solid border-t-[length:var(--border\/default,1px)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start pt-[16px] relative shrink-0 w-full" data-node-id="2009:8478" data-name="div.border-t">
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[8px] relative shrink-0 w-full" data-node-id="2009:8479" data-name="div.flex">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[36px]" data-node-id="2009:8480" data-name="span.grid">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--blur\/lg,16px)] text-center whitespace-nowrap" data-node-id="2009:8481">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">CR</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="2009:8482" data-name="div.min-w-0">
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:8483" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:8484">
                    <p className="leading-[var(--text\/xl,20px)]">Camila Rocha</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:8485" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:8486">
                    <p className="leading-[var(--line-height\/16,16px)]">Estudante</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="content-stretch cursor-pointer flex gap-[var(--mention\/pill-bleed,8px)] h-[36px] items-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0 w-full" data-node-id="2009:8487" data-name="Component 3">
              <div className="relative shrink-0 size-[16px]" data-node-id="I2009:8487;11:15226" data-name="Component 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent3} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:8487;11:15230">
                <p className="leading-[var(--text\/xl,20px)]">Sair</p>
              </div>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[1080px] isolate items-center min-w-px pb-[442px] relative" data-node-id="2009:8488" data-name="div.min-w-0">
          <div className="backdrop-blur-[4px] bg-[var(--permaneo-subtle,#eaf1f5)] border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex gap-[var(--blur\/md,12px)] h-[64px] items-center px-[24px] shrink-0 sticky top-0 w-full z-[2]" data-node-id="2009:8489" data-name="header.sticky">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:8490" data-name="p.hidden">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/14,14px)] whitespace-nowrap" data-node-id="2009:8491">
                <p className="leading-[var(--line-height\/20,20px)]">{`Escola Estadual Horizonte `}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-end min-w-[36px] relative" data-node-id="2009:8492" data-name="div.ml-auto:margin">
              <div className="content-stretch flex items-center justify-end relative shrink-0 w-[80px]" data-node-id="2009:8493" data-name="div.ml-auto">
                <a className="content-stretch cursor-pointer flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:8494" data-name="Component 4">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:8494;11:15271" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1280px] p-[32px] relative shrink-0 w-[1280px] z-[1]" data-node-id="2009:8495" data-name="main.mx-auto">
            <div className="[word-break:break-word] content-stretch flex gap-[24px] h-[144px] items-center overflow-clip py-[8px] relative rounded-[16px] shrink-0 w-[1216px]" data-node-id="2059:2359" data-name="Sua jornada · boas-vindas">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-[788px]" data-node-id="2059:2360" data-name="Boas-vindas">
                <p className="font-['Manrope:Bold'] font-bold leading-[18px] relative shrink-0 text-[12px] text-[color:var(--green,#227457)] w-[788px]" data-node-id="2059:2361">
                  OLÁ, CAMILA
                </p>
                <p className="font-['Manrope:Bold'] font-bold leading-[46px] relative shrink-0 text-[34px] text-[color:var(--ink,#203c46)] w-[788px]" data-node-id="2059:2362">
                  Seu caminho, no seu ritmo.
                </p>
                <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[15px] text-[color:var(--muted,#536a72)] w-[788px]" data-node-id="2059:2363">
                  Acompanhe suas conquistas e encontre apoio quando precisar.
                </p>
              </div>
              <div className="bg-[var(--greenbg,#e6f3ec)] content-stretch flex flex-col gap-[6px] items-start overflow-clip p-[20px] relative rounded-[20px] shrink-0 w-[404px]" data-node-id="2059:2364" data-name="Pequenas conquistas">
                <p className="font-['Manrope:Bold'] font-bold leading-[16px] relative shrink-0 text-[11px] text-[color:var(--green,#227457)] w-[364px]" data-node-id="2059:2365">
                  LEMBRETE PARA HOJE
                </p>
                <p className="font-['Manrope:Bold'] font-bold leading-[28px] relative shrink-0 text-[19px] text-[color:var(--ink,#203c46)] w-[364px]" data-node-id="2059:2366">
                  Você tem com quem contar.
                </p>
                <p className="font-['Manrope:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[364px]" data-node-id="2059:2367">
                  Um passo de cada vez, no seu ritmo.
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--blur\/lg,16px)] items-start justify-center relative shrink-0 w-full" data-node-id="2009:8502" data-name="Minha jornada em números">
              <div className="bg-[var(--surface,white)] content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px px-[20px] py-[18px] relative rounded-[18px]" data-node-id="2009:8503" data-name="div.surface-card">
                <div className="content-stretch flex gap-[var(--item-spacing\/202_97,202.97000122070312px)] items-start justify-between relative shrink-0 w-full" data-node-id="2009:8505" data-name="div.flex">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:8506">
                    <p className="leading-[var(--text\/xl,20px)]">Minha frequência</p>
                  </div>
                  <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center py-[6px] relative rounded-[var(--blur\/md,12px)] shrink-0 size-[36px]" data-node-id="2009:8507" data-name="span.grid">
                    <div className="relative shrink-0 size-[24px]" data-node-id="2009:8508" data-name="Component 1">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent5} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8509" data-name="p.mt-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[28px] text-[color:var(--permaneo-text,#203746)] w-full" data-node-id="2009:8510">
                    <p className="leading-[36px]">88,3%</p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[353.333px]" data-node-id="2129:2392">
                  Presença acumulada no ano
                </p>
              </div>
              <div className="bg-[var(--surface,white)] content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px px-[20px] py-[18px] relative rounded-[18px]" data-node-id="2009:8511" data-name="div.surface-card">
                <div className="content-stretch flex gap-[var(--item-spacing\/233_59,233.58999633789062px)] items-start justify-between relative shrink-0 w-full" data-node-id="2009:8513" data-name="div.flex">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:8514">
                    <p className="leading-[var(--text\/xl,20px)]">Minha média</p>
                  </div>
                  <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center py-[6px] relative rounded-[var(--blur\/md,12px)] shrink-0 size-[36px]" data-node-id="2009:8515" data-name="span.grid">
                    <div className="relative shrink-0 size-[24px]" data-node-id="2009:8516" data-name="Component 1">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent6} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8517" data-name="p.mt-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[28px] text-[color:var(--permaneo-text,#203746)] w-full" data-node-id="2009:8518">
                    <p className="leading-[36px]">8,8</p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[354px]" data-node-id="2129:2393">
                  Média geral das suas notas
                </p>
              </div>
              <div className="bg-[var(--surface,white)] content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px px-[20px] py-[18px] relative rounded-[18px]" data-node-id="2009:8519" data-name="div.surface-card">
                <div className="content-stretch flex gap-[var(--item-spacing\/204_95,204.9499969482422px)] items-start justify-between pr-[0.01px] relative shrink-0 w-full" data-node-id="2009:8521" data-name="div.flex">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:8522">
                    <p className="leading-[var(--text\/xl,20px)]">Pedidos de apoio</p>
                  </div>
                  <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex flex-col items-center py-[6px] relative rounded-[var(--blur\/md,12px)] shrink-0 size-[36px]" data-node-id="2009:8523" data-name="span.grid">
                    <div className="relative shrink-0 size-[24px]" data-node-id="2009:8524" data-name="Component 1">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent7} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8525" data-name="p.mt-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[28px] text-[color:var(--permaneo-text,#203746)] w-full" data-node-id="2009:8526">
                    <p className="leading-[36px]">0</p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[354.667px]" data-node-id="2129:2394">
                  Sua escola está aqui para ajudar
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--dialog\/viewport-inset,24px)] items-start justify-center relative shrink-0 w-full" data-node-id="2009:8527" data-name="div.grid">
              <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[592px]" data-node-id="2059:2368" data-name="Minha evolução e próximos passos">
                <div className="bg-[var(--surface,white)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start p-[24px] relative rounded-[20px] shrink-0 w-[592px]" data-node-id="2009:8528" data-name="Minha evolução · presença e notas">
                  <div className="content-stretch flex flex-col h-[26px] items-start relative shrink-0 w-full" data-node-id="2009:8530" data-name="h2.mb-3">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[17px] text-[color:var(--permaneo-text,#203746)] tracking-[var(--letter-spacing\/-0_24,-0.24px)] w-full" data-node-id="2009:8531">
                      <p className="leading-[26px]">Sua presença ao longo do ano</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[12px] h-[184px] items-end py-[8px] relative shrink-0 w-[544px]" data-node-id="2009:8532" data-name="Presença mensal · escala de 0 a 100%">
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8533" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8538" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8539">
                          <p className="leading-[20px]">87,3%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8536" data-name="div.flex-1">
                        <div className="absolute bg-[var(--brand,#246579)] inset-[14.22px_0_0_0] opacity-70 rounded-[6px]" data-node-id="2009:8537" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8534" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8535">
                          <p className="leading-[20px]">Fev</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8540" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8545" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8546">
                          <p className="leading-[20px]">89,7%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8543" data-name="div.flex-1">
                        <div className="absolute bg-[var(--brand,#246579)] inset-[11.54px_0_0_0] opacity-70 rounded-[6px]" data-node-id="2009:8544" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8541" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8542">
                          <p className="leading-[20px]">Mar</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8547" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8552" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8553">
                          <p className="leading-[20px]">88,7%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8550" data-name="div.flex-1">
                        <div className="absolute bg-[var(--brand,#246579)] inset-[12.66px_0_0_0] opacity-70 rounded-[6px]" data-node-id="2009:8551" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8548" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8549">
                          <p className="leading-[20px]">Abr</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8554" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8559" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8560">
                          <p className="leading-[20px]">86,7%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8557" data-name="div.flex-1">
                        <div className="absolute bg-[var(--brand,#246579)] inset-[14.9px_0_0_0] opacity-70 rounded-[6px]" data-node-id="2009:8558" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8555" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8556">
                          <p className="leading-[20px]">Mai</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8561" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8566" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8567">
                          <p className="leading-[20px]">87,2%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8564" data-name="div.flex-1">
                        <div className="absolute bg-[var(--brand,#246579)] inset-[14.34px_0_0_0] opacity-70 rounded-[6px]" data-node-id="2009:8565" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8562" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8563">
                          <p className="leading-[20px]">Jun</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8568" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8573" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8574">
                          <p className="leading-[20px]">89,9%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8571" data-name="div.flex-1">
                        <div className="absolute bg-[var(--brand,#246579)] inset-[11.31px_0_0_0] opacity-70 rounded-[6px]" data-node-id="2009:8572" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8569" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8570">
                          <p className="leading-[20px]">Ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-full items-center relative shrink-0 w-[67.429px]" data-node-id="2009:8575" data-name="li.flex">
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8580" data-name="span.w-12">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-text,#203746)] text-center w-[67.429px]" data-node-id="2009:8581">
                          <p className="leading-[20px]">88,5%</p>
                        </div>
                      </div>
                      <div className="bg-[var(--soft,#eaf1ee)] flex-[1_0_0] min-h-px relative rounded-[6px] w-[36px]" data-node-id="2009:8578" data-name="div.flex-1">
                        <div className="absolute bg-[var(--green,#227457)] inset-[12.88px_0_0_0] rounded-[6px]" data-node-id="2009:8579" data-name="div.h-full" />
                      </div>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[67.429px]" data-node-id="2009:8576" data-name="span.w-10">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[12px] text-[color:var(--permaneo-muted,#4e6575)] text-center w-[67.429px]" data-node-id="2009:8577">
                          <p className="leading-[20px]">Set</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col h-[34px] items-start pt-[8px] relative shrink-0 w-full" data-node-id="2009:8582" data-name="h2.mb-2">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[16px] text-[color:var(--permaneo-text,#203746)] tracking-[var(--letter-spacing\/-0_24,-0.24px)] w-full" data-node-id="2009:8583">
                      <p className="leading-[24px]">Suas notas por bimestre</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-start relative shrink-0 w-full" data-node-id="2009:8584" data-name="div.flex">
                    <div className="bg-[var(--soft,#eaf1ee)] content-stretch flex flex-col items-start p-[12px] relative rounded-[12px] self-stretch shrink-0 w-[173.333px]" data-node-id="2009:8585" data-name="div.flex-1">
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="2009:8586" data-name="p.text-xs">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] text-center whitespace-nowrap" data-node-id="2009:8587">
                          <p className="leading-[var(--line-height\/16,16px)]">1º bim.</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="2009:8588" data-name="p.text-xl">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Bold')] font-[var(--font\/weight-bold,700)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/xl,20px)] text-center whitespace-nowrap" data-node-id="2009:8589">
                          <p className="leading-[var(--line-height\/28,28px)]">8,8</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[var(--soft,#eaf1ee)] content-stretch flex flex-col items-start p-[12px] relative rounded-[12px] self-stretch shrink-0 w-[173.333px]" data-node-id="2009:8590" data-name="div.flex-1">
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="2009:8591" data-name="p.text-xs">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] text-center whitespace-nowrap" data-node-id="2009:8592">
                          <p className="leading-[var(--line-height\/16,16px)]">2º bim.</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="2009:8593" data-name="p.text-xl">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Bold')] font-[var(--font\/weight-bold,700)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/xl,20px)] text-center whitespace-nowrap" data-node-id="2009:8594">
                          <p className="leading-[var(--line-height\/28,28px)]">8,9</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[var(--soft,#eaf1ee)] content-stretch flex flex-[1_0_0] flex-col h-[70px] items-start min-w-px p-[12px] relative rounded-[12px]" data-node-id="2009:8595" data-name="div.flex-1">
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="2009:8596" data-name="p.text-xs">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] text-center whitespace-nowrap" data-node-id="2009:8597">
                          <p className="leading-[var(--line-height\/16,16px)]">3º bim.</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="2009:8598" data-name="p.text-xl">
                        <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Bold')] font-[var(--font\/weight-bold,700)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/xl,20px)] text-center whitespace-nowrap" data-node-id="2009:8599">
                          <p className="leading-[var(--line-height\/28,28px)]">8,7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--greenbg,#e6f3ec)] content-stretch flex flex-col gap-[12px] items-start overflow-clip px-[24px] py-[22px] relative rounded-[20px] shrink-0 w-[592px]" data-node-id="2059:2369" data-name="Seu próximo passo">
                  <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[26px] relative shrink-0 text-[18px] text-[color:var(--ink,#203c46)] w-[544px]" data-node-id="2059:2370">
                    Um pequeno passo já faz diferença
                  </p>
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[22px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[544px]" data-node-id="2059:2371">
                    Reserve um momento para revisar uma matéria ou conversar com alguém da escola.
                  </p>
                  <div className="content-stretch cursor-pointer flex gap-[12px] h-[50px] items-center relative shrink-0 w-[544px]" data-node-id="2059:2372" data-name="Atalhos de cuidado">
                    <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[12px] shrink-0" texto="Quero conversar" />
                    <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[12px] shrink-0" estilo="Secundário" texto="Meu espaço" />
                  </div>
                </div>
              </div>
              <div className="bg-[var(--surface,white)] content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px p-[24px] relative rounded-[20px]" data-node-id="2009:8600" data-name="Pedir apoio · Assunto definido">
                <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[34px] relative shrink-0 text-[23px] text-[color:var(--ink,#203c46)] w-[552px]" data-node-id="2026:3180">
                  Vamos conversar?
                </p>
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[22px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[552px]" data-node-id="2026:3181">
                  Conte o que está acontecendo. Vamos pensar juntos no próximo passo.
                </p>
                <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[552px]" data-node-id="2026:3182">
                  Para quem
                </p>
                <button className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex flex-col items-start p-[15px] relative rounded-[12px] shrink-0 w-[552px]" data-node-id="2026:3183" data-name="Campo · Para quem">
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--ink,#203c46)] text-left w-[489px]" data-node-id="2026:3184">
                    Coordenação
                  </p>
                  <div className="absolute left-[520px] size-[16px] top-[17px]" data-node-id="2026:3185" data-name="icon/down">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDown} />
                  </div>
                </button>
                <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[552px]" data-node-id="2026:3188">
                  Assunto
                </p>
                <button className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex flex-col items-start p-[15px] relative rounded-[12px] shrink-0 w-[552px]" data-node-id="2026:3189" data-name="Campo · Assunto">
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--ink,#203c46)] text-left w-[489px]" data-node-id="2026:3190">
                    Selecione o assunto
                  </p>
                  <div className="absolute left-[520px] size-[16px] top-[17px]" data-node-id="2026:3191" data-name="icon/down">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDown} />
                  </div>
                </button>
                <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[552px]" data-node-id="2026:3194">
                  Como podemos ajudar?
                </p>
                <button className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex flex-col items-start min-h-[110px] p-[15px] relative rounded-[12px] shrink-0 w-[552px]" data-node-id="2026:3195" data-name="Campo · Como podemos ajudar?">
                  <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--ink,#203c46)] text-left w-[522px]" data-node-id="2026:3196">
                    Conte como podemos ajudar…
                  </p>
                </button>
                <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[12px] shrink-0 w-[552px]" texto="Registrar pedido de apoio" />
                <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[552px]" data-node-id="2026:3201">
                  Nesta demonstração, o pedido fica apenas nesta sessão e não é enviado à escola.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default function StudentDashboardLight(props) {
  return <div className={styles.screen}><Component05MeuPainelClaro {...props} /></div>;
}
