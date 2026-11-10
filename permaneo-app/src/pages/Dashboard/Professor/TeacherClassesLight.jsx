import imgVariant3 from '../../../images/figma/422ec51e450a50eea47e.svg';
import imgVariant4 from '../../../images/figma/5ca6414882706a85b404.svg';
import imgVinculoSimboloVetorial from '../../../images/figma/0b159117e6958f36ab6c.svg';
import imgComponent1 from '../../../images/figma/6a09a452ab339511b0f0.svg';
import imgComponent2 from '../../../images/figma/b2e8c8927e0c4a124764.svg';
import imgComponent3 from '../../../images/figma/8038ffe4ddfdddb0a1d6.svg';
import imgComponent4 from '../../../images/figma/34d7f0633c5dfab266ee.svg';
import imgComponent5 from '../../../images/figma/35ccd39e074e165e835d.svg';
import imgComponent6 from '../../../images/figma/9e723f4d70b95bbf5457.svg';
import imgComponent7 from '../../../images/figma/1371c55dbe93e00d6fae.svg';
import imgComponent8 from '../../../images/figma/9ddd72eefbbb59d36b24.svg';
import imgComponent9 from '../../../images/figma/9e08ae45a5b95135939b.svg';
import imgComponent10 from '../../../images/figma/2a8eebcd81235283d22d.svg';
import imgComponent11 from '../../../images/figma/294e4687d8f3ac9f5b37.svg';















import styles from './TeacherClassesLight.module.css';
















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
function PermaneoSiteRegistrosDaTurma({ className, aba = "Frequ\xEAncia", tema = "Claro" }) {
  return <div className={className || "content-stretch flex flex-col gap-[22px] items-start relative w-[1216px]"} data-node-id="2031:3270">
      <div className="bg-[var(--surface2,#edf2f1)] content-stretch flex gap-[12px] items-start p-[8px] relative rounded-[10px] shrink-0 w-[1216px]" data-node-id="2031:3271" data-name="Abas de registros">
        <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[220px]" texto="Frequência" />
        <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[220px]" estilo="Secundário" texto="Notas" />
        <PermaneoSiteButton className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[220px]" estilo="Secundário" texto="Observações" />
      </div>
      <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[18px] items-start p-[24px] relative rounded-[14px] shrink-0 w-[1216px]" data-node-id="2031:3278" data-name="Registro · Frequência">
        <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[24px] relative shrink-0 text-[16px] text-[color:var(--muted,#536a72)] w-[1168px]" data-node-id="2031:3279">
          Marque quem faltou no dia selecionado.
        </p>
        <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[21px] relative shrink-0 text-[14px] text-[color:var(--brand,#246579)] w-[1168px]" data-node-id="2031:3280">
          Data da frequência · 09/10/2026
        </p>
        <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex gap-[18px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[1168px]" data-node-id="2031:3281" data-name="Frequência · Camila Rocha">
          <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[570px]" data-node-id="2031:3282">
            Camila Rocha
          </p>
          <div className="bg-[var(--greenbg,#e6f3ec)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col h-[40px] items-start p-[10px] relative rounded-[14px] shrink-0 w-[320px]" data-node-id="2031:3283" data-name="Situação">
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--green,#227457)] w-[300px]" data-node-id="2031:3284">
              Sem pendências
            </p>
          </div>
          <button className="content-stretch cursor-pointer flex gap-[10px] items-center relative shrink-0 w-[170px]" data-node-id="2031:3285" data-name="Faltou · Camila Rocha">
            <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[3px] relative rounded-[6px] shrink-0 size-[26px]" data-node-id="2031:3286" data-name="Checkbox" />
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left whitespace-nowrap" data-node-id="2031:3289">
              Faltou
            </p>
          </button>
        </div>
        <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex gap-[18px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[1168px]" data-node-id="2031:3291" data-name="Frequência · Isabela Moura">
          <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[570px]" data-node-id="2031:3292">
            Isabela Moura
          </p>
          <div className="bg-[var(--greenbg,#e6f3ec)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col h-[40px] items-start p-[10px] relative rounded-[14px] shrink-0 w-[320px]" data-node-id="2031:3293" data-name="Situação">
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--green,#227457)] w-[300px]" data-node-id="2031:3294">
              Sem pendências
            </p>
          </div>
          <button className="content-stretch cursor-pointer flex gap-[10px] items-center relative shrink-0 w-[170px]" data-node-id="2031:3295" data-name="Faltou · Isabela Moura">
            <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[3px] relative rounded-[6px] shrink-0 size-[26px]" data-node-id="2031:3296" data-name="Checkbox" />
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left whitespace-nowrap" data-node-id="2031:3299">
              Faltou
            </p>
          </button>
        </div>
        <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex gap-[18px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[1168px]" data-node-id="2031:3301" data-name="Frequência · Eduardo Azeredo">
          <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[570px]" data-node-id="2031:3302">
            Eduardo Azeredo
          </p>
          <div className="bg-[var(--greenbg,#e6f3ec)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col h-[40px] items-start p-[10px] relative rounded-[14px] shrink-0 w-[320px]" data-node-id="2031:3303" data-name="Situação">
            <div className="absolute bg-[var(--amberbg,#fff2df)] h-[40px] left-[-1px] rounded-[14px] top-[-1px] w-[320px]" data-node-id="2036:2551" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Manrope:SemiBold'] font-semibold leading-[20px] left-[9px] text-[13px] text-[color:var(--amber,#87530f)] top-[9px] w-[300px]" data-node-id="2036:2552">
              Precisa de atenção
            </p>
          </div>
          <button className="content-stretch cursor-pointer flex gap-[10px] items-center relative shrink-0 w-[170px]" data-node-id="2031:3305" data-name="Faltou · Eduardo Azeredo">
            <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[3px] relative rounded-[6px] shrink-0 size-[26px]" data-node-id="2031:3306" data-name="Checkbox" />
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left whitespace-nowrap" data-node-id="2031:3309">
              Faltou
            </p>
          </button>
        </div>
        <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex gap-[18px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[1168px]" data-node-id="2031:3311" data-name="Frequência · Yasmin Cunha">
          <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[570px]" data-node-id="2031:3312">
            Yasmin Cunha
          </p>
          <div className="bg-[var(--greenbg,#e6f3ec)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col h-[40px] items-start p-[10px] relative rounded-[14px] shrink-0 w-[320px]" data-node-id="2031:3313" data-name="Situação">
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--green,#227457)] w-[300px]" data-node-id="2031:3314">
              Sem pendências
            </p>
          </div>
          <button className="content-stretch cursor-pointer flex gap-[10px] items-center relative shrink-0 w-[170px]" data-node-id="2031:3315" data-name="Faltou · Yasmin Cunha">
            <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[3px] relative rounded-[6px] shrink-0 size-[26px]" data-node-id="2031:3316" data-name="Checkbox" />
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left whitespace-nowrap" data-node-id="2031:3319">
              Faltou
            </p>
          </button>
        </div>
        <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex gap-[18px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[1168px]" data-node-id="2031:3321" data-name="Frequência · Lívia Monteiro">
          <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[570px]" data-node-id="2031:3322">
            Lívia Monteiro
          </p>
          <div className="bg-[var(--greenbg,#e6f3ec)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col h-[40px] items-start p-[10px] relative rounded-[14px] shrink-0 w-[320px]" data-node-id="2031:3323" data-name="Situação">
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[13px] text-[color:var(--green,#227457)] w-[300px]" data-node-id="2031:3324">
              Sem pendências
            </p>
          </div>
          <button className="content-stretch cursor-pointer flex gap-[10px] items-center relative shrink-0 w-[170px]" data-node-id="2031:3325" data-name="Faltou · Lívia Monteiro">
            <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col items-start p-[3px] relative rounded-[6px] shrink-0 size-[26px]" data-node-id="2031:3326" data-name="Checkbox" />
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] text-left whitespace-nowrap" data-node-id="2031:3329">
              Faltou
            </p>
          </button>
        </div>
        <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[260px]" texto="Salvar frequência" />
        <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[1168px]" data-node-id="2031:3334">
          Registro demonstrativo. Nenhum aviso é enviado.
        </p>
      </div>
    </div>;
}
function Component1({ className, variant = "3" }) {
  const is4 = variant === "4";
  return <div className={className || "relative size-[18px]"} id={is4 ? "node-2009_2707" : "node-2009_2705"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={is4 ? imgVariant4 : imgVariant3} />
    </div>;
}
function Component04MinhasTurmasClaro() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:8198" data-name="04 · Minhas turmas | Claro">
      <div className="content-stretch flex items-start min-h-[1200px] relative shrink-0 w-full" data-node-id="2009:8199" data-name="div.min-h-screen">
        <div className="bg-[var(--permaneo-surface,white)] border-[var(--permaneo-border,#d7e2ea)] border-r-[length:var(--border\/default,1px)] border-solid content-stretch flex flex-col gap-[var(--dialog\/viewport-inset,24px)] h-[1200px] items-start p-[16px] shrink-0 sticky top-0 w-[260px]" data-node-id="2009:8200" data-name="aside.sticky">
          <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:8201" data-name="a.px-2">
            <div className="content-stretch flex flex-col items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-full" data-node-id="2009:8202" data-name="a.px-2">
              <div className="content-stretch flex gap-[var(--item-spacing\/8,8px)] items-center relative shrink-0" data-node-id="2009:8203" data-name="span.inline-flex">
                <div className="relative shrink-0 size-[35px]" data-node-id="2009:8204" data-name="Logo Permaneo · Vínculo · Vetor">
                  <div className="absolute h-[26.979px] left-0 top-[4.01px] w-[35px]" data-node-id="2089:2409" data-name="Vínculo · símbolo vetorial">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
                  </div>
                </div>
                <a className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-node-id="2009:8209" data-name="span.text-lg">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:Bold')] font-[var(--font-weight\/700,700)] justify-center leading-[0] relative shrink-0 text-[#203c46] text-[length:var(--line-height\/18,18px)] text-left tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:8210">
                    <p>
                      <span className="leading-[var(--line-height\/28,28px)]">Permane</span>
                      <span className="leading-[var(--line-height\/28,28px)] text-[#227457]">o</span>
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-node-id="2009:8211" data-name="div.flex-1">
            <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0 w-full" data-node-id="2009:8212" data-name="Menu da plataforma">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:8213" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:8213;11:17006" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:8213;11:17009" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="I2009:8213;11:17010">
                    <p className="leading-[var(--text\/xl,20px)]">Minhas turmas</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:8214" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:8214;11:16841" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent2} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:8214;11:16843" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:8214;11:16844">
                    <p className="leading-[var(--text\/xl,20px)]">Acompanhamento</p>
                  </div>
                </a>
              </div>
              <a className="content-stretch cursor-pointer flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[var(--blur\/md,12px)] shrink-0 w-[227px]" data-node-id="2233:2901" data-name="Carômetro">
                <Component1 className="relative shrink-0 size-[18px]" variant="4" />
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2233:2901;11:12231" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--color\/azure\/37,#50606e)] text-left w-full" data-node-id="I2233:2901;11:12232" role="link" tabIndex="0">
                    <p className="cursor-pointer font-['Manrope:Medium'] font-medium leading-[20px] text-[14px]">Carômetro</p>
                  </div>
                </div>
              </a>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:8215" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:8215;11:16854" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent3} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:8215;11:16857" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:8215;11:16858">
                    <p className="leading-[var(--text\/xl,20px)]">Notificações</p>
                  </div>
                </a>
                <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex flex-col items-start px-[8px] relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0" data-node-id="I2009:8215;11:16859" data-name="9 não lidas">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Bold')] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-warning,#8a530d)] text-[length:var(--font-size\/12,12px)] whitespace-nowrap" data-node-id="I2009:8215;11:16860">
                    <p className="leading-[var(--line-height\/16,16px)]">9</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[12px] py-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="2009:8216" data-name="Component 2">
                <div className="relative shrink-0 size-[18px]" data-node-id="I2009:8216;11:16868" data-name="Component 1">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
                </div>
                <a className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="I2009:8216;11:16871" data-name="span.flex-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-left w-full" data-node-id="I2009:8216;11:16872">
                    <p className="leading-[var(--text\/xl,20px)]">Configurações</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-[var(--permaneo-border,#d7e2ea)] border-solid border-t-[length:var(--border\/default,1px)] content-stretch flex flex-col gap-[var(--mention\/pill-bleed,8px)] items-start pt-[16px] relative shrink-0 w-full" data-node-id="2009:8217" data-name="div.border-t">
            <div className="content-stretch flex gap-[var(--blur\/md,12px)] items-center px-[8px] relative shrink-0 w-full" data-node-id="2009:8218" data-name="div.flex">
              <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--corner-radius\/33554400,33554400px)] shrink-0 size-[36px]" data-node-id="2009:8219" data-name="span.grid">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-brand,#24647b)] text-[length:var(--blur\/lg,16px)] text-center whitespace-nowrap" data-node-id="2009:8220">
                  <p className="leading-[var(--dialog\/viewport-inset,24px)]">RO</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="2009:8221" data-name="div.min-w-0">
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:8222" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/sm,14px)] w-full" data-node-id="2009:8223">
                    <p className="leading-[var(--text\/xl,20px)]">Renata Oliveira</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="2009:8224" data-name="p.truncate">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/12,12px)] w-full" data-node-id="2009:8225">
                    <p className="leading-[var(--line-height\/16,16px)]">Professor(a)</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="content-stretch cursor-pointer flex gap-[var(--mention\/pill-bleed,8px)] h-[36px] items-center pb-[8.5px] pt-[7.5px] px-[16px] relative rounded-[10px] shrink-0 w-full" data-node-id="2009:8226" data-name="Component 3">
              <div className="relative shrink-0 size-[16px]" data-node-id="I2009:8226;11:17018" data-name="Component 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent5} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] text-center whitespace-nowrap" data-node-id="I2009:8226;11:17022">
                <p className="leading-[var(--text\/xl,20px)]">Sair</p>
              </div>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-center min-w-px pb-[366px] relative" data-node-id="2009:8227" data-name="div.min-w-0">
          <div className="backdrop-blur-[4px] bg-[var(--permaneo-subtle,#eaf1f5)] border-[var(--permaneo-border,#d7e2ea)] border-b-[length:var(--border\/default,1px)] border-solid content-stretch flex gap-[var(--blur\/md,12px)] h-[64px] items-center px-[24px] shrink-0 sticky top-0 w-full z-[2]" data-node-id="2009:8228" data-name="header.sticky">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="2009:8229" data-name="p.hidden">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--font-size\/14,14px)] whitespace-nowrap" data-node-id="2009:8230">
                <p className="leading-[var(--line-height\/20,20px)]">{`Escola Estadual Horizonte `}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-[76px] pl-[1251.3px] relative" data-node-id="2009:8231" data-name="div.ml-auto:margin">
              <div className="content-stretch cursor-pointer flex gap-[var(--toast\/icon-margin-end,4px)] items-center relative shrink-0" data-node-id="2009:8232" data-name="div.ml-auto">
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:8233" data-name="Component 4">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:8233;11:17065" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent6} />
                  </div>
                  <div className="absolute bg-[var(--permaneo-warning-bg,#fff3e1)] right-[6px] rounded-[var(--corner-radius\/33554400,33554400px)] size-[8px] top-[6px]" data-node-id="I2009:8233;11:17068" data-name="span.absolute" />
                </a>
                <a className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-node-id="2009:8234" data-name="Component 5">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I2009:8234;11:17103" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent7} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--blur\/lg,16px)] items-start max-w-[1280px] p-[32px] relative shrink-0 w-[1280px] z-[1]" data-node-id="2009:8235" data-name="main.mx-auto">
            <div className="content-stretch flex items-end relative shrink-0 w-full" data-node-id="2009:8236" data-name="div.mb-6">
              <div className="content-stretch flex flex-col gap-[var(--toast\/icon-margin-end,4px)] items-start relative shrink-0" data-node-id="2009:8237" data-name="div">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8238" data-name="h1.text-2xl">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-3,'Sora:SemiBold')] font-[var(--font-weight\/600,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/30,30px)] tracking-[var(--letter-spacing\/-0_45,-0.45px)] whitespace-nowrap" data-node-id="2009:8239">
                    <p className="leading-[var(--line-height\/36,36px)]">Minhas turmas</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-node-id="2009:8240" data-name="p.mt-1">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--line-height\/16,16px)] whitespace-nowrap" data-node-id="2009:8241">
                    <p className="leading-[var(--width\/24,24px)]">Registre frequência, notas e observações. Os dados alimentam os indicadores de atenção.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__240px_minmax(0,1fr)] grid-rows-[_58px] h-[66px] pt-[8px] relative shrink-0 w-full" data-node-id="2009:8242" data-name="div.mb-6">
              <div className="col-1 content-stretch flex flex-col gap-[var(--item-spacing\/6,6px)] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="2009:8243" data-name="div.grid">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8244" data-name="label.font-medium">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--blur\/md,12px)] w-full" data-node-id="2009:8245">
                    <p className="leading-[var(--blur\/lg,16px)]">Turma</p>
                  </div>
                </div>
                <button className="border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch cursor-pointer flex gap-[var(--item-spacing\/173_36,173.36000061035156px)] h-[36px] items-center justify-between px-[12px] py-[8px] relative rounded-[var(--text\/2xs,10px)] shrink-0 w-full" data-node-id="2009:8246" data-name="button#p-turma">
                  <div className="absolute bg-[var(--permaneo-surface,white)] h-[36px] left-[-1px] right-[-1px] rounded-[var(--text\/2xs,10px)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[-1px]" data-node-id="2009:8247" data-name="button#p-turma:shadow" />
                  <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-node-id="2009:8248" data-name="span">
                    <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-1,'Manrope:Regular')] font-[var(--font-weight\/400,400)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--font-size\/14,14px)] text-center whitespace-nowrap" data-node-id="2009:8249">
                      <p className="leading-[var(--line-height\/20,20px)]">8º A</p>
                    </div>
                  </div>
                  <div className="opacity-[calc(var(--opacity\/50,100)/100)] relative shrink-0 size-[16px]" data-node-id="2009:8250" data-name="Component 1">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent8} />
                  </div>
                </button>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--blur\/lg,16px)] items-start justify-center pt-[8px] relative shrink-0 w-full" data-node-id="2009:8251" data-name="div.mb-6">
              <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-[1_0_0] flex-col gap-[var(--blur\/md,12px)] items-start min-w-px p-[20px] relative rounded-[var(--radius-card,18px)]" data-node-id="2009:8252" data-name="div.surface-card">
                <div className="absolute bg-[var(--permaneo-surface,white)] inset-[-1px_-0.99px_-1px_-1px] rounded-[var(--blur\/lg,16px)] shadow-[0px_1px_2px_0px_rgba(35,53,68,0.05),0px_4px_16px_-8px_rgba(35,53,68,0.1)]" data-node-id="2009:8253" data-name="div.surface-card:shadow" />
                <div className="content-stretch flex gap-[var(--item-spacing\/241_07,241.07000732421875px)] items-start justify-between relative shrink-0 w-full" data-node-id="2009:8254" data-name="div.flex">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:8255">
                    <p className="leading-[var(--text\/xl,20px)]">Estudantes</p>
                  </div>
                  <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center py-[6px] relative rounded-[var(--blur\/md,12px)] shrink-0 size-[36px]" data-node-id="2009:8256" data-name="span.grid">
                    <div className="relative shrink-0 size-[24px]" data-node-id="2009:8257" data-name="Component 1">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent9} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8258" data-name="p.mt-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/3xl,30px)] w-full" data-node-id="2009:8259">
                    <p className="leading-[var(--text\/4xl,36px)]">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-[1_0_0] flex-col gap-[var(--blur\/md,12px)] items-start min-w-px p-[20px] relative rounded-[var(--radius-card,18px)]" data-node-id="2009:8260" data-name="div.surface-card">
                <div className="absolute bg-[var(--permaneo-surface,white)] inset-[-1px] rounded-[var(--blur\/lg,16px)] shadow-[0px_1px_2px_0px_rgba(35,53,68,0.05),0px_4px_16px_-8px_rgba(35,53,68,0.1)]" data-node-id="2009:8261" data-name="div.surface-card:shadow" />
                <div className="content-stretch flex gap-[var(--item-spacing\/200_89,200.88999938964844px)] items-start justify-between relative shrink-0 w-full" data-node-id="2009:8262" data-name="div.flex">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:8263">
                    <p className="leading-[var(--text\/xl,20px)]">Frequência média</p>
                  </div>
                  <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-center py-[6px] relative rounded-[var(--blur\/md,12px)] shrink-0 size-[36px]" data-node-id="2009:8264" data-name="span.grid">
                    <div className="relative shrink-0 size-[24px]" data-node-id="2009:8265" data-name="Component 1">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent10} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8266" data-name="p.mt-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/3xl,30px)] w-full" data-node-id="2009:8267">
                    <p className="leading-[var(--text\/4xl,36px)]">90,6%</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--permaneo-surface,white)] border-[length:var(--border\/default,1px)] border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch drop-shadow-[0px_8px_12px_rgba(20,41,54,0.07)] flex flex-[1_0_0] flex-col gap-[var(--blur\/md,12px)] items-start min-w-px p-[20px] relative rounded-[var(--radius-card,18px)]" data-node-id="2009:8268" data-name="div.surface-card">
                <div className="absolute bg-[var(--permaneo-surface,white)] inset-[-1px_-0.99px_-1px_-1px] rounded-[var(--blur\/lg,16px)] shadow-[0px_1px_2px_0px_rgba(35,53,68,0.05),0px_4px_16px_-8px_rgba(35,53,68,0.1)]" data-node-id="2009:8269" data-name="div.surface-card:shadow" />
                <div className="content-stretch flex gap-[var(--item-spacing\/180_01,180.00999450683594px)] items-start justify-between pr-[0.01px] relative shrink-0 w-full" data-node-id="2009:8270" data-name="div.flex">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-2,'Manrope:Medium')] font-[var(--font-weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-muted,#4e6575)] text-[length:var(--text\/sm,14px)] whitespace-nowrap" data-node-id="2009:8271">
                    <p className="leading-[var(--text\/xl,20px)]">Precisam de atenção</p>
                  </div>
                  <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex flex-col items-center py-[6px] relative rounded-[var(--blur\/md,12px)] shrink-0 size-[36px]" data-node-id="2009:8272" data-name="span.grid">
                    <div className="relative shrink-0 size-[24px]" data-node-id="2009:8273" data-name="Component 1">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent11} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="2009:8274" data-name="p.mt-3">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family\/font-4,'Sora:SemiBold')] font-[var(--font\/weight-semibold,600)] justify-center leading-[0] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--text\/3xl,30px)] w-full" data-node-id="2009:8275">
                    <p className="leading-[var(--text\/4xl,36px)]">1</p>
                  </div>
                </div>
              </div>
            </div>
            <PermaneoSiteRegistrosDaTurma className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[1216px]" />
          </div>
        </div>
      </div>
    </div>;
}
export default function TeacherClassesLight(props) {
  return <div className={styles.screen}><Component04MinhasTurmasClaro {...props} /></div>;
}
