import imgIconGrid from '../../images/figma/d7ee6606d9ddda0df6b2.svg';
import imgIconArrow from '../../images/figma/b6e662e57223a14872b2.svg';
import imgIconBook from '../../images/figma/246c5630bee904b4a4c8.svg';
import imgIconGraduation from '../../images/figma/67466946abb091be59de.svg';
import imgVideoCotidianoEscolarGifEmLooping from '../../images/hero.svg';
import imgVinculoSimboloVetorial from '../../images/figma/b9617e1108578bf4478b.svg';
import imgIconeSun from '../../images/figma/9b3e4d81507d448f0ca2.svg';
import imgIconeCheck from '../../images/figma/b4320ab29a2c5eb481f3.svg';
import imgIconeHeart from '../../images/figma/0706ce2642b49622f79a.svg';
import imgIconEye from '../../images/figma/3123f328a52668f983ed.svg';
import imgIconChat from '../../images/figma/a347ecda72e8ad69eae7.svg';
import imgIconPeople from '../../images/figma/50654cd999745a68bbfc.svg';
import imgLinhaDeFrequenciaVetoresEditaveis from '../../images/figma/baedca5b734fce172f4c.svg';
import imgIconeChat from '../../images/figma/4874b46cd32e03cd9246.svg';
import imgVinculoSimboloVetorial1 from '../../images/figma/725f6d0f6e5e0301065d.svg';
















import styles from './HomeLight.module.css';















function PermaneoSiteButton({ className, estilo = "Prim\xE1rio", texto = "Continuar" }) {
  return <div className={className || "bg-[var(--brand,#246579)] content-stretch flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px]"} data-node-id="2024:3368">
      <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--onbrand,white)] whitespace-nowrap" data-node-id="2024:3371">
        {texto}
      </p>
    </div>;
}
function PermaneoSitePerfisDaHome({ className, perfil = "gestao", tema = "Claro" }) {
  return <div className={className || "content-stretch flex gap-[72px] items-start relative w-[1592px]"} data-node-id="2027:3478">
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[760px]" data-node-id="2027:3479" data-name="A escola e seus perfis">
        <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[18px] relative shrink-0 text-[12px] text-[color:var(--brand,#246579)] w-[760px] whitespace-pre-wrap" data-node-id="2027:3480">{`03  \xB7  TR\xCAS OLHARES. UM PROP\xD3SITO.`}</p>
        <div className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[0] relative shrink-0 text-[44px] text-[color:var(--ink,#203c46)] w-[760px]" data-node-id="2027:3481">
          <p className="leading-[66px] mb-0">Uma escola conectada</p>
          <p className="leading-[66px]">pela permanência.</p>
        </div>
        <div className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[0] relative shrink-0 text-[17px] text-[color:var(--muted,#536a72)] w-[760px]" data-node-id="2027:3482">
          <p className="leading-[26px] mb-0">Cada pessoa com seu espaço.</p>
          <p className="leading-[26px]">Todos com a possibilidade de fazer a diferença.</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[760px]" data-node-id="2027:3483" data-name="Perfis da plataforma">
          <div className="bg-[var(--bluebg,#e8f2f5)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex gap-[var(--space-control,16px)] items-center p-[20px] relative rounded-[10px] shrink-0 w-[760px]" data-node-id="2027:3484" data-name="Selecionar perfil · Direção e coordenação">
            <div className="relative shrink-0 size-[26px]" data-node-id="2027:3485" data-name="icon/grid">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGrid} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[630px]" data-node-id="2027:3490" data-name="Texto do perfil">
              <p className="font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] w-[630px]" data-node-id="2027:3491">
                Direção e coordenação
              </p>
              <p className="font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[630px]" data-node-id="2027:3492">
                Visão da escola, acompanhamento e relatórios
              </p>
            </div>
            <div className="relative shrink-0 size-[20px]" data-node-id="2027:3493" data-name="icon/arrow">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow} />
            </div>
          </div>
          <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex gap-[var(--space-control,16px)] items-center p-[20px] relative rounded-[10px] shrink-0 w-[760px]" data-node-id="2027:3495" data-name="Selecionar perfil · Professor(a)">
            <div className="relative shrink-0 size-[26px]" data-node-id="2027:3496" data-name="icon/book">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBook} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-left w-[630px]" data-node-id="2027:3498" data-name="Texto do perfil">
              <p className="font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] w-[630px]" data-node-id="2027:3499">
                Professor(a)
              </p>
              <p className="font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[630px]" data-node-id="2027:3500">
                Frequência, notas e observações das turmas
              </p>
            </div>
            <div className="relative shrink-0 size-[20px]" data-node-id="2027:3501" data-name="icon/arrow">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow} />
            </div>
          </button>
          <button className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch cursor-pointer flex gap-[var(--space-control,16px)] items-center p-[20px] relative rounded-[10px] shrink-0 w-[760px]" data-node-id="2027:3503" data-name="Selecionar perfil · Estudante">
            <div className="relative shrink-0 size-[26px]" data-node-id="2027:3504" data-name="icon/graduation">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGraduation} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-left w-[630px]" data-node-id="2027:3506" data-name="Texto do perfil">
              <p className="font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] w-[630px]" data-node-id="2027:3507">
                Estudante
              </p>
              <p className="font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[630px]" data-node-id="2027:3508">
                Minha jornada, frequência e pedidos de apoio
              </p>
            </div>
            <div className="relative shrink-0 size-[20px]" data-node-id="2027:3509" data-name="icon/arrow">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow} />
            </div>
          </button>
        </div>
      </div>
      <div className="bg-[var(--soft,#eaf1ee)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[32px] relative rounded-[14px] shrink-0 w-[760px]" data-node-id="2027:3511" data-name="Prévia do perfil">
        <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[20px] items-start p-[26px] relative rounded-[14px] shrink-0 w-[696px]" data-node-id="2027:3512" data-name="Interface · Direção e coordenação">
          <div className="content-stretch flex gap-[14px] items-start relative shrink-0 w-[644px]" data-node-id="2027:3513" data-name="Cabeçalho da prévia">
            <div className="relative shrink-0 size-[26px]" data-node-id="2027:3514" data-name="icon/grid">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGrid} />
            </div>
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] whitespace-nowrap" data-node-id="2027:3519">
              Direção e coordenação
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex gap-[var(--space-control,16px)] items-start relative shrink-0 w-[644px]" data-node-id="2027:3520" data-name="Indicadores ilustrativos">
            <div className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[6px] items-start p-[20px] relative rounded-[14px] shrink-0 w-[314px]" data-node-id="2027:3521" data-name="Estudantes">
              <p className="font-['Manrope:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[274px]" data-node-id="2027:3522">
                Estudantes
              </p>
              <p className="font-['Sora:SemiBold'] font-semibold leading-[48px] relative shrink-0 text-[32px] text-[color:var(--ink,#203c46)] w-[274px]" data-node-id="2027:3523">
                30
              </p>
            </div>
            <div className="bg-[var(--bg,#f7f9f8)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[6px] items-start p-[20px] relative rounded-[14px] shrink-0 w-[314px]" data-node-id="2027:3524" data-name="Frequência média">
              <p className="font-['Manrope:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--muted,#536a72)] w-[274px]" data-node-id="2027:3525">
                Frequência média
              </p>
              <p className="font-['Sora:SemiBold'] font-semibold leading-[48px] relative shrink-0 text-[32px] text-[color:var(--ink,#203c46)] w-[274px]" data-node-id="2027:3526">
                88,7%
              </p>
            </div>
          </div>
          <div className="[word-break:break-word] bg-[var(--greenbg,#e6f3ec)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[5px] items-start p-[18px] relative rounded-[14px] shrink-0 text-[color:var(--green,#227457)] w-[644px]" data-node-id="2027:3527" data-name="Cuidado em contexto">
            <p className="font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] w-[608px]" data-node-id="2027:3528">
              Um sinal para começar uma conversa.
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] w-[608px]" data-node-id="2027:3529">
              Lucas Gomes · 9º A · 5 faltas consecutivas
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[18px] relative shrink-0 text-[12px] text-[color:var(--brand,#246579)] w-[696px]" data-node-id="2027:3530">
          DIREÇÃO E COORDENAÇÃO
        </p>
        <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[48px] relative shrink-0 text-[32px] text-[color:var(--ink,#203c46)] w-[696px]" data-node-id="2027:3531">
          Uma visão clara para agir com cuidado.
        </p>
        <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[26px] relative shrink-0 text-[17px] text-[color:var(--muted,#536a72)] w-[696px]" data-node-id="2027:3532">
          Conecte os indicadores da escola e organize as próximas ações de apoio com a equipe.
        </p>
        <PermaneoSiteButton className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[49px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[430px]" texto="Explorar a gestão" />
        <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[18px] relative shrink-0 text-[12px] text-[color:var(--muted,#536a72)] w-[696px]" data-node-id="2027:3536">
          Prévia com dados fictícios.
        </p>
      </div>
    </div>;
}
function Component01HomeClaroPadrao() {
  return <div className="bg-[var(--permaneo-canvas,#f4f7fa)] content-stretch flex flex-col items-start relative size-full" data-node-id="2009:7550" data-name="01 · Home | Claro (padrão)">
      <div className="bg-[var(--surface,white)] content-stretch flex items-center justify-between overflow-clip px-[164px] py-[28px] relative shrink-0 w-[1920px]" data-node-id="2009:7551" data-name="Navegação principal">
        <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[250px]" data-node-id="2009:7552" data-name="Marca Permaneo">
          <div className="max-w-[133.8800048828125px] relative shrink-0 size-[40px]" data-node-id="2009:7553" data-name="Logo Permaneo · Vínculo · Vetor">
            <div className="absolute h-[30.833px] left-0 top-[4.58px] w-[40px]" data-node-id="2089:2377" data-name="Vínculo · símbolo vetorial">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[0] relative shrink-0 text-[#203c46] text-[25px] w-[190px]" data-node-id="2009:7554">
            <span className="leading-[36px]">Permane</span>
            <span className="leading-[36px] text-[#227457]">o</span>
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch cursor-pointer flex gap-[40px] items-center leading-[0] overflow-clip relative shrink-0 text-[15px] text-[color:var(--permaneo-muted,#4e6575)] text-left whitespace-nowrap" data-node-id="2009:7555" data-name="Menu">
          <button className="block font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] relative shrink-0" data-node-id="2009:7556">
            <p className="leading-[22px]">A proposta</p>
          </button>
          <button className="block font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] relative shrink-0" data-node-id="2009:7557">
            <p className="leading-[22px]">Como funciona</p>
          </button>
          <button className="block font-['Manrope:SemiBold'] font-semibold relative shrink-0" data-node-id="2009:7559">
            <p className="leading-[22px]">Para quem</p>
          </button>
          <button className="block font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] relative shrink-0" data-node-id="2009:7558">
            <p className="leading-[22px]">Soluções</p>
          </button>
        </div>
        <div className="content-stretch cursor-pointer flex gap-[16px] items-center overflow-clip relative shrink-0 w-[330px]" data-node-id="2009:7560" data-name="Acesso e tema">
          <a className="bg-[var(--permaneo-surface,white)] border border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex items-start overflow-clip p-[12px] relative rounded-[var(--radius-control,10px)] shrink-0 size-[48px]" data-node-id="2009:7561" data-name="Alternar tema">
            <div className="relative shrink-0 size-[24px]" data-node-id="2009:7562" data-name="Ícone / sun">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconeSun} />
            </div>
          </a>
          <a className="bg-[var(--permaneo-brand,#24647b)] content-stretch flex h-[48px] items-center justify-center px-[22px] py-[12px] relative rounded-[var(--radius-control,10px)] shrink-0" data-node-id="2009:7565" data-name="CTA / Acessar">
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--permaneo-on-brand,white)] text-left whitespace-nowrap" data-node-id="I2009:7565;325:15">
              Acessar plataforma
            </p>
          </a>
        </div>
      </div>
      <div className="bg-[var(--hero,#f1f5f2)] content-stretch flex gap-[72px] items-center overflow-clip px-[164px] py-[48px] relative shrink-0 w-[1920px]" data-node-id="2009:7566" data-name="Hero · Pessoas e permanência">
        <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-[740px]" data-node-id="2009:7567" data-name="Mensagem principal">
          <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-brand,#24647b)] w-[740px]" data-node-id="2009:7568">
            TECNOLOGIA COM UM OLHAR HUMANO
          </p>
          <div className="[word-break:break-word] font-['Sora:Bold'] font-bold leading-[0] relative shrink-0 text-[72px] text-[color:var(--permaneo-text,#203746)] w-[740px]" data-node-id="2009:7569">
            <p className="leading-[84px] mb-0">Toda trajetória</p>
            <p>
              <span className="leading-[84px]">{`merece `}</span>
              <span className="leading-[84px] text-[#1f785d]">continuar.</span>
            </p>
          </div>
          <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[29px] relative shrink-0 text-[20px] text-[color:var(--permaneo-muted,#4e6575)] w-[650px]" data-node-id="2009:7570">
            Mais presença. Mais vínculos. Uma escola que percebe cedo e caminha junto com cada estudante.
          </p>
          <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0 w-[740px]" data-node-id="2009:7571" data-name="Ações da apresentação">
            <a className="bg-[var(--permaneo-brand,#24647b)] content-stretch flex h-[56px] items-center justify-center px-[22px] py-[12px] relative rounded-[var(--radius-control,10px)] shrink-0" data-node-id="2009:7572" data-name="CTA / Explorar">
              <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--permaneo-on-brand,white)] text-left whitespace-nowrap" data-node-id="I2009:7572;325:16">
                Explorar a plataforma
              </p>
            </a>
            <button className="bg-[var(--permaneo-surface,white)] border border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex h-[56px] items-center justify-center px-[22px] py-[12px] relative rounded-[var(--radius-control,10px)] shrink-0" data-node-id="2009:7573" data-name="CTA / Conhecer">
              <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--permaneo-text,#203746)] text-left whitespace-nowrap" data-node-id="I2009:7573;325:18">
                Conhecer a proposta
              </p>
            </button>
          </div>
          <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-[740px]" data-node-id="2009:7574" data-name="Cuidado com os dados">
            <div className="relative shrink-0 size-[18px]" data-node-id="2009:7575" data-name="Ícone / check">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconeCheck} />
            </div>
            <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] w-[670px]" data-node-id="2009:7577">
              Cuidado com as pessoas. Respeito aos dados.
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[780px]" data-node-id="2009:7578" data-name="Vídeo de abertura e mensagem">
          <div className="h-[438.75px] relative rounded-[24px] shrink-0 w-[780px]" data-node-id="2117:2392" data-name="Vídeo · Cotidiano escolar · GIF em looping">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgVideoCotidianoEscolarGifEmLooping} />
          </div>
          <div className="bg-[var(--permaneo-surface,white)] border border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch flex gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[780px]" data-node-id="2009:7580" data-name="Presença e vínculo · Legenda do vídeo">
            <div className="relative shrink-0 size-[28px]" data-node-id="2009:7581" data-name="Ícone / heart">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconeHeart} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-[685px]" data-node-id="2009:7583" data-name="Texto da fotografia">
              <p className="font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] leading-[var(--dialog\/viewport-inset,24px)] relative shrink-0 text-[color:var(--permaneo-text,#203746)] text-[length:var(--blur\/lg,16px)] w-[685px]" data-node-id="2009:7584">
                Presença é vínculo. Cuidar é perceber.
              </p>
              <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] w-[685px]" data-node-id="2009:7585">
                Cenas do cotidiano escolar · Uso ilustrativo
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--surface,white)] content-stretch flex flex-col items-start overflow-clip px-[164px] py-[24px] relative shrink-0 w-[1920px]" data-node-id="2009:7586" data-name="Pilares da proposta">
        <div className="content-stretch cursor-pointer flex gap-[24px] items-start overflow-clip relative shrink-0 w-[1592px]" data-node-id="2009:7587" data-name="Três pilares">
          <button className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex gap-[var(--space-control,16px)] h-[116px] items-center p-[24px] relative rounded-[16px] shrink-0 w-[514.66px]" data-node-id="2027:3879" data-name="Perceber cedo">
            <div className="relative shrink-0 size-[28px]" data-node-id="2027:3880" data-name="icon/eye">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconEye} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[5px] items-start relative shrink-0 text-left w-[414px]" data-node-id="2027:3883" data-name="Proposta do pilar">
              <p className="font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] w-[414px]" data-node-id="2027:3884">
                Perceber cedo
              </p>
              <p className="font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[414px]" data-node-id="2027:3885">
                Um olhar atento para cada trajetória.
              </p>
            </div>
          </button>
          <button className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex gap-[var(--space-control,16px)] h-[116px] items-center p-[24px] relative rounded-[16px] shrink-0 w-[514.66px]" data-node-id="2027:3886" data-name="Acolher de perto">
            <div className="relative shrink-0 size-[28px]" data-node-id="2027:3887" data-name="icon/chat">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconChat} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[5px] items-start relative shrink-0 text-left w-[414px]" data-node-id="2027:3890" data-name="Proposta do pilar">
              <p className="font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] w-[414px]" data-node-id="2027:3891">
                Acolher de perto
              </p>
              <p className="font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[414px]" data-node-id="2027:3892">
                Informação que se transforma em apoio.
              </p>
            </div>
          </button>
          <button className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex gap-[var(--space-control,16px)] h-[116px] items-center p-[24px] relative rounded-[16px] shrink-0 w-[514.66px]" data-node-id="2027:3893" data-name="Caminhar juntos">
            <div className="relative shrink-0 size-[28px]" data-node-id="2027:3894" data-name="icon/people">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPeople} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[5px] items-start relative shrink-0 text-left w-[414px]" data-node-id="2027:3897" data-name="Proposta do pilar">
              <p className="font-['Manrope:SemiBold'] font-semibold leading-[26px] relative shrink-0 text-[17px] text-[color:var(--ink,#203c46)] w-[414px]" data-node-id="2027:3898">
                Caminhar juntos
              </p>
              <p className="font-['Manrope:Regular'] font-normal leading-[21px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[414px]" data-node-id="2027:3899">
                Toda a escola conectada pelo cuidado.
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="bg-[var(--surface,white)] content-stretch flex flex-col items-start overflow-clip px-[164px] py-[48px] relative shrink-0 w-[1920px]" data-node-id="2009:7591" data-name="A proposta · Informação que acolhe">
        <div className="content-stretch flex gap-[48px] items-center overflow-clip relative shrink-0 w-[1592px]" data-node-id="2009:7592" data-name="Desafio e demonstração">
          <div className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[36px] relative rounded-[16px] shrink-0 w-[764px]" data-node-id="2009:7593" data-name="O desafio">
            <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-brand,#24647b)] w-[692px]" data-node-id="2009:7594">
              O DESAFIO E A NOSSA SOLUÇÃO
            </p>
            <div className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[0] relative shrink-0 text-[40px] text-[color:var(--permaneo-text,#203746)] w-[692px]" data-node-id="2009:7595">
              <p className="leading-[52px] mb-0">A evasão começa</p>
              <p className="leading-[52px]">antes da ausência.</p>
            </div>
            <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[30px] relative shrink-0 text-[18px] text-[color:var(--permaneo-muted,#4e6575)] w-[692px]" data-node-id="2009:7596">
              Faltas recorrentes, dificuldades e vínculos enfraquecidos merecem atenção. O Permaneo reúne sinais e ações para apoiar cada trajetória no momento certo.
            </p>
            <a className="bg-[var(--permaneo-brand,#24647b)] content-stretch cursor-pointer flex h-[56px] items-center justify-center px-[22px] py-[12px] relative rounded-[var(--radius-control,10px)] shrink-0" data-node-id="2009:7597" data-name="CTA / Demonstração">
              <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--permaneo-on-brand,white)] text-left whitespace-nowrap" data-node-id="I2009:7597;325:16">
                Ver o cuidado na prática
              </p>
            </a>
          </div>
          <a className="bg-[var(--permaneo-canvas,#f4f7fa)] border border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch cursor-pointer flex flex-col gap-[16px] items-start overflow-clip p-[28px] relative rounded-[var(--radius-card,18px)] shrink-0 w-[780px]" data-node-id="2009:7598" data-name="Prévia do painel · Editável">
            <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[35px] relative shrink-0 text-[24px] text-[color:var(--permaneo-text,#203746)] text-left w-[724px]" data-node-id="2009:7599">
              Painel da escola
            </p>
            <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] text-left w-[724px]" data-node-id="2009:7600">
              Escola Estadual Horizonte · Dados fictícios
            </p>
            <div className="[word-break:break-word] content-stretch flex gap-[14px] items-start overflow-clip relative shrink-0 text-left w-[724px]" data-node-id="2009:7601" data-name="Indicadores demonstrativos">
              <div className="bg-[var(--permaneo-subtle,#eaf1f5)] content-stretch flex flex-col gap-[8px] items-start p-[20px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[232px]" data-node-id="2009:7602" data-name="Permaneo / Indicador">
                <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-muted,#4e6575)] w-[192px]" data-node-id="I2009:7602;335:2690">
                  Estudantes
                </p>
                <p className="font-['Sora:SemiBold'] font-semibold leading-[46px] relative shrink-0 text-[32px] text-[color:var(--permaneo-text,#203746)] w-[192px]" data-node-id="I2009:7602;335:2691">
                  30
                </p>
              </div>
              <div className="bg-[var(--permaneo-subtle,#eaf1f5)] content-stretch flex flex-col gap-[8px] items-start p-[20px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[232px]" data-node-id="2009:7603" data-name="Permaneo / Indicador">
                <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-muted,#4e6575)] w-[192px]" data-node-id="I2009:7603;335:2690">
                  Frequência média
                </p>
                <p className="font-['Sora:SemiBold'] font-semibold leading-[46px] relative shrink-0 text-[32px] text-[color:var(--permaneo-text,#203746)] w-[192px]" data-node-id="I2009:7603;335:2691">
                  88,7%
                </p>
              </div>
              <div className="bg-[var(--permaneo-subtle,#eaf1f5)] content-stretch flex flex-col gap-[8px] items-start p-[20px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[232px]" data-node-id="2009:7604" data-name="Permaneo / Indicador">
                <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-muted,#4e6575)] w-[192px]" data-node-id="I2009:7604;335:2690">
                  Precisam de atenção
                </p>
                <p className="font-['Sora:SemiBold'] font-semibold leading-[46px] relative shrink-0 text-[32px] text-[color:var(--permaneo-text,#203746)] w-[192px]" data-node-id="I2009:7604;335:2691">
                  8
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-[724px]" data-node-id="2009:7605" data-name="Evolução da frequência">
              <p className="[word-break:break-word] font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] leading-[22px] relative shrink-0 text-[15px] text-[color:var(--permaneo-text,#203746)] text-left w-[724px]" data-node-id="2009:7606">
                Presença que conta uma história
              </p>
              <div className="h-[180px] relative shrink-0 w-[724px]" data-node-id="2009:7607" data-name="Linha de frequência · Vetores editáveis">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLinhaDeFrequenciaVetoresEditaveis} />
              </div>
              <div className="[word-break:break-word] content-stretch flex font-['Manrope:Medium'] font-medium items-start justify-between leading-[20px] overflow-clip relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] text-left w-[724px]" data-node-id="2009:7611" data-name="Meses">
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7612">
                  Fev
                </p>
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7613">
                  Mar
                </p>
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7614">
                  Abr
                </p>
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7615">
                  Mai
                </p>
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7616">
                  Jun
                </p>
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7617">
                  Ago
                </p>
                <p className="relative shrink-0 w-[48px]" data-node-id="2009:7618">
                  Set
                </p>
              </div>
            </div>
            <div className="bg-[var(--permaneo-warning-bg,#fff3e1)] content-stretch flex gap-[14px] items-start overflow-clip p-[16px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[724px]" data-node-id="2009:7619" data-name="Alerta acolhedor">
              <div className="relative shrink-0 size-[24px]" data-node-id="2009:7620" data-name="Ícone / chat">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconeChat} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 text-left w-[650px]" data-node-id="2009:7623" data-name="Mensagem do indicador">
                <p className="font-[family-name:var(--font-family\/font-2,'Manrope:SemiBold')] font-[var(--font\/weight-semibold,600)] leading-[var(--dialog\/viewport-inset,24px)] relative shrink-0 text-[color:var(--permaneo-warning,#8a530d)] text-[length:var(--blur\/lg,16px)] w-[650px]" data-node-id="2009:7624">
                  Um sinal para iniciar uma conversa.
                </p>
                <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-muted,#4e6575)] w-[650px]" data-node-id="2009:7625">
                  Lucas Gomes · 9º A · 5 faltas consecutivas
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="[word-break:break-word] bg-[var(--soft,#eaf1ee)] content-stretch flex flex-col gap-[24px] items-start overflow-clip px-[164px] py-[48px] relative shrink-0 w-[1920px]" data-node-id="2009:7626" data-name="Como funciona">
        <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-brand,#24647b)] w-[1592px]" data-node-id="2009:7627">
          COMO FUNCIONA
        </p>
        <p className="font-['Sora:SemiBold'] font-semibold leading-[52px] relative shrink-0 text-[40px] text-[color:var(--permaneo-text,#203746)] w-[1500px]" data-node-id="2009:7628">
          Agir mais cedo. Com a equipe toda junta.
        </p>
        <div className="content-stretch cursor-pointer flex gap-[24px] items-start overflow-clip relative shrink-0 text-left w-[1592px]" data-node-id="2009:7629" data-name="Quatro passos">
          <a className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7630" data-name="Etapa / Acompanhe">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7631">{`01  /  Explorar \u2192`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[33px] relative shrink-0 text-[23px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7632">
              Acompanhe
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7633">
              Frequência, notas e observações em uma visão organizada.
            </p>
          </a>
          <a className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7634" data-name="Etapa / Perceba cedo">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7635">{`02  /  Explorar \u2192`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[33px] relative shrink-0 text-[23px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7636">
              Perceba cedo
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7637">
              Indicadores para identificar quem precisa de atenção.
            </p>
          </a>
          <a className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7638" data-name="Etapa / Ofereça apoio">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7639">{`03  /  Explorar \u2192`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[33px] relative shrink-0 text-[23px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7640">
              Ofereça apoio
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7641">
              Conversas e ações de cuidado acompanhadas pela equipe.
            </p>
          </a>
          <a className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7642" data-name="Etapa / Veja a evolução">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7643">{`04  /  Explorar \u2192`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[33px] relative shrink-0 text-[23px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7644">
              Veja a evolução
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7645">
              Acompanhe as intervenções e a trajetória dos estudantes.
            </p>
          </a>
        </div>
      </div>
      <div className="bg-[var(--surface,white)] content-stretch flex flex-col items-start overflow-clip px-[164px] py-[48px] relative shrink-0 w-[1920px]" data-node-id="2009:7646" data-name="Três perfis · Uma escola conectada">
        <PermaneoSitePerfisDaHome className="content-stretch flex gap-[72px] items-start relative shrink-0 w-[1592px]" />
      </div>
      <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex flex-col gap-[32px] items-start overflow-clip px-[164px] py-[48px] relative shrink-0 w-[1920px]" data-node-id="2009:7653" data-name="Soluções e modelo de negócio">
        <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-brand,#24647b)] w-[1592px]" data-node-id="2009:7654">
          DUAS SOLUÇÕES · CONTRATAÇÃO POR ESCOLA
        </p>
        <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[52px] relative shrink-0 text-[40px] text-[color:var(--permaneo-text,#203746)] w-[1592px]" data-node-id="2009:7655">
          Dois caminhos. O mesmo compromisso com a permanência.
        </p>
        <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal leading-[30px] relative shrink-0 text-[18px] text-[color:var(--permaneo-muted,#4e6575)] w-[1592px]" data-node-id="2009:7656">
          Escolha a plataforma completa ou amplie o acompanhamento com câmeras integradas.
        </p>
        <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-[1592px]" data-node-id="2009:7657" data-name="Duas soluções Permaneo">
          <div className="bg-[var(--surface,white)] border border-[var(--line,#d7e2e3)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[32px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[784px]" data-node-id="2095:2394" data-name="Solução / Permaneo Plataforma">
            <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold h-[38px] leading-[37px] relative shrink-0 text-[28px] text-[color:var(--ink,#203c46)] w-[720px]" data-node-id="I2095:2394;2095:2368">
              Permaneo Plataforma
            </p>
            <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal h-[50px] leading-[25px] relative shrink-0 text-[16px] text-[color:var(--muted,#536a72)] w-[720px]" data-node-id="I2095:2394;2095:2369">
              Gestão do acompanhamento escolar em um só lugar.
            </p>
            <div className="[word-break:break-word] content-stretch flex flex-col font-semibold gap-[4px] items-start overflow-clip relative shrink-0 w-[720px]" data-node-id="I2095:2394;2095:2370" data-name="Contratação">
              <p className="font-['Sora:SemiBold'] h-[38px] leading-[37px] relative shrink-0 text-[28px] text-[color:var(--brand,#246579)] w-[720px]" data-node-id="I2095:2394;2095:2371">
                Assinatura por escola
              </p>
              <p className="font-['Manrope:SemiBold'] h-[22px] leading-[22px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[720px]" data-node-id="I2095:2394;2095:2372">
                Mensal ou anual
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular'] font-normal gap-[10px] items-start leading-[25px] overflow-clip relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[720px] whitespace-pre-wrap" data-node-id="I2095:2394;2095:2373" data-name="Incluído na solução">
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2394;2095:2374">{`\u2713  Frequ\xEAncia, notas e hist\xF3rico dos estudantes`}</p>
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2394;2095:2375">{`\u2713  Alertas e acompanhamento de a\xE7\xF5es de apoio`}</p>
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2394;2095:2376">{`\u2713  Relat\xF3rios para dire\xE7\xE3o e professores`}</p>
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2394;2095:2377">{`\u2713  Acesso para gest\xE3o, professores e estudantes`}</p>
            </div>
            <button className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[50px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[300px]" data-node-id="I2095:2394;2095:2378" data-name="Conhecer solução">
              <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--onbrand,white)] text-left whitespace-nowrap" data-node-id="I2095:2394;2095:2378;2024:3371">
                Conhecer a plataforma
              </p>
            </button>
          </div>
          <div className="bg-[var(--surface,white)] border-2 border-[var(--brand,#246579)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[32px] relative rounded-[var(--radius-control,10px)] shrink-0 w-[784px]" data-node-id="2095:2408" data-name="Solução / Permaneo Inteligente">
            <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold h-[38px] leading-[37px] relative shrink-0 text-[28px] text-[color:var(--ink,#203c46)] w-[720px]" data-node-id="I2095:2408;2095:2381">
              Permaneo Inteligente
            </p>
            <p className="[word-break:break-word] font-['Manrope:Regular'] font-normal h-[50px] leading-[25px] relative shrink-0 text-[16px] text-[color:var(--muted,#536a72)] w-[720px]" data-node-id="I2095:2408;2095:2382">
              Plataforma completa + câmeras com reconhecimento facial por IA.
            </p>
            <div className="[word-break:break-word] content-stretch flex flex-col font-semibold gap-[4px] items-start overflow-clip relative shrink-0 w-[720px]" data-node-id="I2095:2408;2095:2383" data-name="Contratação">
              <p className="font-['Sora:SemiBold'] h-[38px] leading-[37px] relative shrink-0 text-[28px] text-[color:var(--brand,#246579)] w-[720px]" data-node-id="I2095:2408;2095:2384">
                Implantação + assinatura
              </p>
              <p className="font-['Manrope:SemiBold'] h-[22px] leading-[22px] relative shrink-0 text-[14px] text-[color:var(--muted,#536a72)] w-[720px]" data-node-id="I2095:2408;2095:2385">
                Equipamentos, integração e suporte
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular'] font-normal gap-[10px] items-start leading-[25px] overflow-clip relative shrink-0 text-[16px] text-[color:var(--ink,#203c46)] w-[720px] whitespace-pre-wrap" data-node-id="I2095:2408;2095:2386" data-name="Incluído na solução">
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2408;2095:2387">{`\u2713  Todos os recursos da plataforma`}</p>
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2408;2095:2388">{`\u2713  Entradas e sa\xEDdas nos pontos monitorados`}</p>
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2408;2095:2389">{`\u2713  C\xE2meras integradas ao acompanhamento escolar`}</p>
              <p className="h-[25px] relative shrink-0 w-[720px]" data-node-id="I2095:2408;2095:2390">{`\u2713  Instala\xE7\xE3o, configura\xE7\xE3o e suporte da solu\xE7\xE3o`}</p>
            </div>
            <button className="bg-[var(--brand,#246579)] content-stretch cursor-pointer flex h-[50px] items-center justify-center px-[20px] py-[13px] relative rounded-[10px] shrink-0 w-[300px]" data-node-id="I2095:2408;2095:2391" data-name="Conhecer solução">
              <p className="[word-break:break-word] font-['Manrope:Bold'] font-bold leading-[22px] relative shrink-0 text-[12px] text-[color:var(--onbrand,white)] text-left whitespace-nowrap" data-node-id="I2095:2408;2095:2391;2024:3371">
                Conhecer a integração
              </p>
            </button>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] w-[1592px]" data-node-id="2009:7666">
          Investimento sob consulta, conforme o porte da escola e a estrutura de implantação.
        </p>
      </div>
      <div className="[word-break:break-word] bg-[var(--surface,white)] content-stretch flex flex-col gap-[24px] items-start overflow-clip px-[164px] py-[48px] relative shrink-0 w-[1920px]" data-node-id="2009:7667" data-name="Implantação gradual">
        <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-brand,#24647b)] w-[1592px]" data-node-id="2009:7668">
          CONSTRUÍDO COM A ESCOLA
        </p>
        <p className="font-['Sora:SemiBold'] font-semibold leading-[52px] relative shrink-0 text-[40px] text-[color:var(--permaneo-text,#203746)] w-[1592px]" data-node-id="2009:7669">
          Começa com uma conversa. Cresce com a confiança.
        </p>
        <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-[1592px]" data-node-id="2009:7670" data-name="Etapas da implantação">
          <div className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7671" data-name="Escutar a escola">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7672">{`01  /  Implanta\xE7\xE3o`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-[22px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7673">
              Escutar a escola
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7674">
              Compreender a realidade e os desafios de permanência.
            </p>
          </div>
          <div className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7675" data-name="Demonstrar e validar">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7676">{`02  /  Implanta\xE7\xE3o`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-[22px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7677">
              Demonstrar e validar
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7678">
              Apresentar a plataforma e propor um projeto-piloto.
            </p>
          </div>
          <div className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7679" data-name="Preparar a equipe">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7680">{`03  /  Implanta\xE7\xE3o`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-[22px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7681">
              Preparar a equipe
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7682">
              Orientar os profissionais e organizar o acompanhamento.
            </p>
          </div>
          <div className="bg-[var(--surface\/claro,white)] border border-[#d7e2e3] border-solid content-stretch flex flex-col gap-[16px] h-[240px] items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-[380px]" data-node-id="2009:7683" data-name="Acompanhar e expandir">
            <p className="font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-green,#1f785d)] w-[332px] whitespace-pre-wrap" data-node-id="2009:7684">{`04  /  Implanta\xE7\xE3o`}</p>
            <p className="font-['Sora:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-[22px] text-[color:var(--permaneo-text,#203746)] w-[332px]" data-node-id="2009:7685">
              Acompanhar e expandir
            </p>
            <p className="font-['Manrope:Regular'] font-normal leading-[23px] relative shrink-0 text-[16px] text-[color:var(--permaneo-muted,#4e6575)] w-[332px]" data-node-id="2009:7686">
              Avaliar a experiência e ampliar por indicação e parcerias.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#245c67] content-stretch flex flex-col items-start overflow-clip px-[164px] py-[64px] relative shrink-0 w-[1920px]" data-node-id="2009:7687" data-name="Toda história continua">
        <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-[1592px]" data-node-id="2009:7688" data-name="Convite à demonstração">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 text-[color:var(--permaneo-on-brand,white)] w-[1100px]" data-node-id="2009:7689" data-name="Mensagem final">
            <div className="font-['Sora:SemiBold'] font-semibold leading-[0] relative shrink-0 text-[40px] w-[1100px]" data-node-id="2009:7690">
              <p className="leading-[52px] mb-0">Cada estudante que permanece</p>
              <p className="leading-[52px]">é uma história que continua.</p>
            </div>
            <p className="font-['Manrope:Regular'] font-normal leading-[25px] relative shrink-0 text-[17px] w-[1100px]" data-node-id="2009:7691">
              Explore a demonstração nos perfis de gestão, professor e estudante.
            </p>
          </div>
          <a className="bg-[var(--permaneo-surface,white)] border border-[var(--permaneo-border,#d7e2ea)] border-solid content-stretch cursor-pointer flex h-[56px] items-center justify-center px-[22px] py-[12px] relative rounded-[var(--radius-control,10px)] shrink-0" data-node-id="2009:7692" data-name="CTA / Experimentar">
            <p className="[word-break:break-word] font-['Manrope:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--permaneo-text,#203746)] text-left whitespace-nowrap" data-node-id="I2009:7692;325:18">
              Vamos conhecer?
            </p>
          </a>
        </div>
      </div>
      <div className="bg-[var(--bg,#f7f9f8)] content-stretch flex flex-col gap-[32px] items-start overflow-clip px-[164px] py-[36px] relative shrink-0 w-[1920px]" data-node-id="2009:7693" data-name="Rodapé">
        <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-[1592px]" data-node-id="2009:7694" data-name="Identidade e privacidade">
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[250px]" data-node-id="2009:7695" data-name="Marca Permaneo">
            <div className="max-w-[133.8800048828125px] relative shrink-0 size-[40px]" data-node-id="2009:7696" data-name="Logo Permaneo · Vínculo · Vetor">
              <div className="absolute h-[30.833px] left-0 top-[4.58px] w-[40px]" data-node-id="2089:2385" data-name="Vínculo · símbolo vetorial">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVinculoSimboloVetorial1} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Sora:SemiBold'] font-semibold leading-[0] relative shrink-0 text-[#203c46] text-[25px] w-[190px]" data-node-id="2009:7697">
              <span className="leading-[36px]">Permane</span>
              <span className="leading-[36px] text-[#227457]">o</span>
            </p>
          </div>
          <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] w-[700px]" data-node-id="2009:7698">
            Tecnologia para perceber. Pessoas para acolher.
          </p>
          <p className="[word-break:break-word] font-['Manrope:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--permaneo-caption,#637988)] w-[460px] whitespace-pre-wrap" data-node-id="2009:7699">{`Permaneo \xB7 Projeto  \xB7 2026`}</p>
        </div>
        <div className="content-stretch flex items-start relative shrink-0 w-[1592px]" data-node-id="2027:3900" data-name="Mais informações">
          <button className="[word-break:break-word] block cursor-pointer font-['Manrope:SemiBold'] font-semibold leading-[0] relative shrink-0 text-[14px] text-[color:var(--brand,#246579)] text-left whitespace-nowrap" data-node-id="2027:3901">
            <p className="leading-[21px]">Privacidade na proposta</p>
          </button>
        </div>
      </div>
    </div>;
}
export default function HomeLight(props) {
  return <div className={styles.screen}><Component01HomeClaroPadrao {...props} /></div>;
}
