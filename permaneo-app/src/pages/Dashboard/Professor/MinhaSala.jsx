import StudentPortrait from '../../../components/students/StudentPortrait.jsx';
import ClassAttendance from '../../../components/students/ClassAttendance.jsx';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Armchair, BookOpen, Camera, CheckCircle2, ChevronDown, DoorOpen, Eye, Grid2X2, Info,
  LayoutGrid, List, Maximize, Maximize2, Minus, Minimize2, Move3D, PanelsTopLeft, Plus, Redo2, Search, Shuffle, Undo2, UsersRound, X,
} from 'lucide-react';
import {
  atencoes, categorias, chamadaRegistrada, chaveObservacoes, dataFormatada, faltasConsecutivas, hoje, lerLocal,
  normalizar, ordemAssentos, ordenarObservacoes, perfilDemo, percentual, presencas, presencasAbreviadas,
  situacaoAluno, situacoes, turmaMeta, turmasDemo,
} from '../../../data/sala.js';
import styles from './MinhaSala.module.css';
import useSeatDrag from '../../../hooks/useSeatDrag.js';

const views = [['mapa', 'Sala Virtual', Armchair], ['carometro', 'Carômetro', Grid2X2], ['lista', 'Lista', List]];
const mapaLocal = (id) => 'permaneo-demo-assentos-' + id;
const autorDemo = 'Renata Oliveira';
const acao = styles.action;
const icon = (Icon, size = 17) => <Icon size={size} aria-hidden="true" />;

function Avatar({ aluno }) {
  return <StudentPortrait student={aluno} className={styles.avatar} decorative />;
}

function Sinal({ aluno, texto = false }) {
  const estado = situacaoAluno(aluno);
  return <span className={styles.signal}><i data-status={estado} aria-hidden="true" />{texto && situacoes[estado]}</span>;
}

function Busca({ label, value, onChange }) {
  const id = useId();
  return <div className={styles.field}><label htmlFor={id}>{label}</label><span className={styles.search}>
    {icon(Search)}<input id={id} type="search" value={value} onChange={(event) => onChange(event.target.value)} />
  </span></div>;
}

function Seletor({ label, value, onChange, options }) {
  const id = useId();
  return <div className={styles.field}><label htmlFor={id}>{label}</label><span className={styles.select}>
    <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map(([id, text]) => <option key={id} value={id}>{text}</option>)}
    </select>{icon(ChevronDown, 15)}
  </span></div>;
}

function listaOpcoes(turmas, campo, rotulo) {
  return [['', rotulo], ...[...new Set(turmas.map((turma) => turma[campo]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true })).map((valor) => [valor, valor])];
}

function MiniaturaSala({ total }) {
  return <div className={styles.roomThumb} aria-hidden="true" data-students={Math.min(total, 12)}>
    <span className={styles.thumbBoard} />
    <span className={styles.thumbTeacher} />
    <span className={styles.thumbSeats}>{Array.from({ length: Math.min(total, 12) }, (_, index) => <i key={index} />)}</span>
  </div>;
}

function MinhasTurmas({ turmas, linkSala, classAttendance, classAttendanceMeta, onSaveAttendance }) {
  const [busca, setBusca] = useState('');
  const [serie, setSerie] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [chamada, setChamada] = useState(null);
  const visiveis = turmas.filter((turma) =>
    normalizar(turma.nome).includes(normalizar(busca)) && (!serie || turma.serie === serie) && (!periodo || turma.periodo === periodo));
  return <>
    <div className={styles.toolbar}>
      <Busca label="Buscar turma" value={busca} onChange={setBusca} />
      <Seletor label="Série" value={serie} onChange={setSerie} options={listaOpcoes(turmas, 'serie', 'Todas as séries')} />
      <Seletor label="Período" value={periodo} onChange={setPeriodo} options={listaOpcoes(turmas, 'periodo', 'Todos os períodos')} />
    </div>
    <div className={styles.sectionHeader}>
      <h2>Turmas vinculadas</h2><span role="status">{visiveis.length} {visiveis.length === 1 ? 'turma' : 'turmas'}</span>
    </div>
    {!visiveis.length && <p className={styles.empty}>{turmas.length ? 'Nenhuma turma corresponde aos filtros.' : 'Sua conta ainda não tem turmas vinculadas.'}</p>}
    <div className={styles.classGrid}>
      {visiveis.map((turma) => {
        const frequencias = turma.estudantes.map((aluno) => aluno.frequencia).filter((valor) => valor != null);
        const media = frequencias.length ? frequencias.reduce((soma, valor) => soma + valor, 0) / frequencias.length : null;
        const acompanhamento = turma.estudantes.filter((aluno) => ['attention', 'priority'].includes(situacaoAluno(aluno))).length;
        const ultimaChamada = Object.keys(classAttendance?.[turma.id] || {}).sort().at(-1);
        const registrosHoje = Object.values(classAttendance?.[turma.id]?.[hoje()] || {}).filter(chamadaRegistrada).length;
        return <article className={styles.classCard} key={turma.id}>
          <header><span className={styles.classIcon}>{icon(UsersRound, 22)}</span><span>{turmaMeta(turma)}</span></header>
          <MiniaturaSala total={turma.estudantes.length} />
          <h3>{turma.nome}</h3>
          <dl className={styles.classMetrics}>
            <div><dt>Estudantes</dt><dd>{turma.estudantes.length}</dd></div>
            <div><dt>Frequência média</dt><dd>{percentual(media)}</dd></div>
            <div><dt>Precisam de atenção</dt><dd>{acompanhamento}</dd></div>
          </dl>
          <p className={styles.latestCall}>{icon(CheckCircle2, 15)} {registrosHoje ? registrosHoje + ' registros na chamada de hoje' : ultimaChamada ? 'Última chamada em ' + dataFormatada(ultimaChamada) : 'Nenhuma chamada registrada'}</p>
          <div className={styles.classActions}>
            <button type="button" className={acao} data-kind="primary" onClick={() => setChamada(turma)}>{icon(CheckCircle2)} Realizar chamada</button>
            <Link to={linkSala(turma.id)} className={acao} aria-label={'Abrir sala virtual ' + turma.nome}>Sala Virtual {icon(ArrowRight)}</Link>
          </div>
        </article>;
      })}
    </div>
    {chamada && <ClassAttendance turma={chamada} attendance={classAttendance?.[chamada.id] || {}} attendanceMeta={classAttendanceMeta?.[chamada.id] || {}} onSave={(date, statuses, lesson) => onSaveAttendance(chamada.id, date, statuses, lesson)} onClose={() => setChamada(null)} />}
  </>;
}

function Mapa({ turma, alunos, visiveis, ordem, editing, origem, onSeat, onDrop, onOpen, selecionado, attendance, highlight }) {
  const [zoom, setZoom] = useState(100);
  const [camera, setCamera] = useState('isometrica');
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const map = useRef(null);
  const viewport = useRef(null);
  const drag = useRef(null);
  const { preview, handlers } = useSeatDrag(viewport, onDrop);
  const tooltipId = useId();
  const escala = zoom / 100;
  const total = Math.max(6, ordem.length);
  const nomeVisivel = new Set(visiveis.map((aluno) => aluno.id));
  const colunas = ordem.length <= 9 ? 3 : ordem.length <= 24 ? 4 : 5;
  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === map.current);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);
  useEffect(() => {
    if (!selecionado && !highlight) return;
    const seat = [...(viewport.current?.querySelectorAll('[data-student-id]') || [])]
      .find((item) => item.dataset.studentId === String(selecionado || highlight));
    if (seat) {
      const view = viewport.current.getBoundingClientRect();
      const rect = seat.getBoundingClientRect();
      viewport.current.scrollBy({
        left: rect.left + rect.width / 2 - view.left - view.width / 2,
        top: rect.top + rect.height / 2 - view.top - view.height / 2,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }, [selecionado, highlight]);
  function mover(event) {
    if (event.target !== event.currentTarget) return;
    const botoes = { ArrowLeft: [-64, 0], ArrowRight: [64, 0], ArrowUp: [0, -64], ArrowDown: [0, 64] };
    const ajuste = botoes[event.key];
    if (ajuste) {
      event.preventDefault();
      event.currentTarget.scrollBy(...ajuste);
    }
  }
  function focusSeat(event, index) {
    const directions = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -colunas, ArrowDown: colunas };
    const step = directions[event.key];
    if (!step) return;
    event.preventDefault();
    const seat = viewport.current.querySelector('[data-seat-index="' + (index + step) + '"] button');
    seat?.focus();
  }
  async function toggleFullscreen() {
    try {
      if (fullscreen) await document.exitFullscreen();
      else await map.current.requestFullscreen();
      setFullscreenError(false);
    } catch {
      setFullscreenError(true);
    }
  }
  return <section ref={map} className={styles.map} data-editing={editing} aria-label="Mapa de assentos">
    <div className={styles.mapBar}>
      <span>{icon(LayoutGrid, 16)} Ambiente da turma</span>
      <div className={styles.zoom} role="group" aria-label="Zoom do mapa">
        <button type="button" aria-label="Reduzir zoom" disabled={zoom <= 75} onClick={() => setZoom(Math.max(75, zoom - 25))}>{icon(Minus)}</button>
        <output aria-live="polite">{zoom}%</output>
        <button type="button" aria-label="Aumentar zoom" disabled={zoom >= 150} onClick={() => setZoom(Math.min(150, zoom + 25))}>{icon(Plus)}</button>
        <button type="button" aria-label="Restaurar zoom e posição" onClick={() => {
          setZoom(100);
          setCamera('isometrica');
          viewport.current.scrollTo(0, 0);
        }}>{icon(Maximize, 15)}<span className={styles.controlLabel}>Centralizar</span></button>
        {document.fullscreenEnabled && <button type="button" aria-label={fullscreen ? 'Sair da tela cheia' : 'Tela cheia'} onClick={toggleFullscreen}>{icon(fullscreen ? Minimize2 : Maximize2, 16)}</button>}
      </div>
    </div>
    {fullscreenError && <p className={styles.notice} role="status">O navegador não conseguiu abrir a tela cheia.</p>}
    <div className={styles.sceneControls} role="group" aria-label="Perspectiva da sala">
      <span>Perspectiva</span>
      {[
        ['isometrica', 'Isométrica', Move3D],
        ['professor', 'Professor', Eye],
        ['superior', 'Superior', PanelsTopLeft],
      ].map(([id, label, Icon]) => <button key={id} type="button" aria-pressed={camera === id} onClick={() => setCamera(id)}>
        {icon(Icon, 15)}{label}
      </button>)}
      {!editing && <span className={styles.dragHint}>{icon(Camera, 14)} Arraste para explorar</span>}
    </div>
    <div className={styles.viewport} ref={viewport} tabIndex={0} role="region" aria-label="Planta rolável; use as setas para mover" onKeyDown={mover}
      onWheel={(event) => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();
        setZoom((current) => Math.max(75, Math.min(150, current + (event.deltaY < 0 ? 10 : -10))));
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button')) return;
        const el = event.currentTarget;
        drag.current = { x: event.clientX + el.scrollLeft, y: event.clientY + el.scrollTop };
        el.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!drag.current) return;
        event.currentTarget.scrollTo(drag.current.x - event.clientX, drag.current.y - event.clientY);
      }}
      onLostPointerCapture={() => { drag.current = null; }}>
      <div className={styles.scene} data-camera={camera} style={{ '--cols': colunas, '--zoom': escala, '--scene-width': `${Math.max(360, (colunas * 150 + 84) * escala)}px` }}>
        <div className={styles.wall} aria-hidden="true">
          <div className={styles.window}><i /><i /><i /><i /></div>
          <div className={styles.clock}><span>10:10</span></div>
          <div className={styles.board}>Sala de aprendizagem<span>Aprender · participar · continuar</span></div>
          <div className={styles.window}><i /><i /><i /><i /></div>
        </div>
        <div className={styles.floor} style={{ '--zoom': escala, '--cols': colunas }}>
          <div className={styles.sideWindow} aria-hidden="true"><i /><i /><i /><i /></div>
          <div className={styles.entry} aria-hidden="true"><span>{icon(DoorOpen, 20)}</span><small>Entrada</small></div>
          <div className={styles.plant} aria-hidden="true"><i /><i /><i /><b /></div>
          <div className={styles.front}><div className={styles.teacherDesk}><span>Mesa do professor</span><i /></div></div>
          <div className={styles.desks}>
          {Array.from({ length: total }, (_, index) => {
            const aluno = alunos.get(ordem[index]);
            const disponivel = aluno && nomeVisivel.has(aluno.id);
            const cadeira = 'Carteira ' + (index + 1);
            const callStatus = attendance[aluno?.id];
            const source = preview?.source ?? origem;
            const deskHandlers = editing ? handlers(index, () => onSeat(index)) : null;
            return <div key={index} className={styles.seat} data-seat-index={index} data-empty={!aluno}
              data-faded={!!aluno && !disponivel} data-student-id={aluno?.id}
              data-selected={!!aluno && (selecionado === aluno.id || highlight === aluno.id)}
              data-drag-source={preview?.source === index} data-drop-target={preview?.target === index}
              data-available={editing && source != null && source !== index}>
              {disponivel ? <button type="button" className={styles.desk}
                {...(deskHandlers || { onClick: (event) => onOpen(aluno, event) })}
                onKeyDown={editing ? (event) => { deskHandlers.onKeyDown(event); focusSeat(event, index); } : undefined}
                aria-label={editing ? cadeira + ': ' + aluno.nome : aluno.nome}
                aria-pressed={editing ? origem === index : undefined}
                aria-describedby={editing ? undefined : tooltipId + index}>
                <Avatar aluno={aluno} />
                <span className={styles.deskName}>{aluno.nome.split(' ')[0]}</span>
                {!editing && callStatus ? <span className={styles.attendanceMark} data-call={callStatus} aria-hidden="true">{presencasAbreviadas[callStatus]}</span> : <Sinal aluno={aluno} />}
                {!editing && <span className={styles.seatTip} id={tooltipId + index} role="tooltip">
                  <strong>{aluno.nome}</strong><span>{turma.nome} · {percentual(aluno.frequencia)}</span>
                  <span className={styles.srOnly}>{situacoes[situacaoAluno(aluno)]}{callStatus && ' · Chamada de hoje: ' + presencas[callStatus]}</span>
                </span>}
              </button> : editing && !aluno && origem != null
                ? <button type="button" className={styles.emptyDesk} aria-label={cadeira + ': livre'} onKeyDown={(event) => focusSeat(event, index)} onClick={() => onSeat(index)}>
                  {icon(Armchair, 18)}
                </button> : <span className={styles.emptyDesk} aria-hidden="true">{icon(Armchair, 18)}</span>}
              <small aria-hidden="true">{String(index + 1).padStart(2, '0')}</small>
            </div>;
          })}
          </div>
        </div>
      </div>
    </div>
    {preview && alunos.has(ordem[preview.source]) && createPortal(
      <div className={styles.dragPreview} style={{ left: preview.x, top: preview.y }} aria-hidden="true">
        <Avatar aluno={alunos.get(ordem[preview.source])} /><b>{alunos.get(ordem[preview.source]).nome}</b>
      </div>,
      document.fullscreenElement || document.body,
    )}
  </section>;
}

function CarteirasAlternativas({ view, alunos, onOpen }) {
  return <ul className={view === 'lista' ? styles.list : styles.peopleGrid} aria-label="Estudantes da turma">
    {alunos.map((aluno) => <li key={aluno.id}>
      <button type="button" onClick={(event) => onOpen(aluno, event)}>
        <Avatar aluno={aluno} />
        <span><strong>{aluno.nome}</strong><small>Frequência: {percentual(aluno.frequencia)}</small></span>
        <Sinal aluno={aluno} texto />
        {icon(ArrowRight, 16)}
      </button>
    </li>)}
  </ul>;
}

function ObservacaoForm({ autor, onSave, onCancel }) {
  const [erro, setErro] = useState('');
  function enviar(event) {
    event.preventDefault();
    const dados = Object.fromEntries(new FormData(event.currentTarget));
    dados.descricao = dados.descricao.trim();
    if (!dados.descricao) return setErro('Escreva a descrição antes de salvar.');
    try {
      onSave(dados);
    } catch {
      setErro('Não foi possível salvar a observação no navegador.');
    }
  }
  return <form className={styles.noteForm} onSubmit={enviar}>
    <h3>Adicionar observação</h3>
    <p>Descreva o que foi observado e, se possível, combine um próximo passo. Evite rótulos.</p>
    <fieldset>
      <label className={styles.field}>Categoria<select name="categoria" defaultValue="GERAL">
        {Object.entries(categorias).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select></label>
      <label className={styles.field}>Nível de atenção<select name="atencao">
        {Object.entries(atencoes).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select></label>
      <label className={styles.field}>Descrição<textarea name="descricao" rows={5} required maxLength={2000} /></label>
      <label className={styles.field}>Data do registro<input type="date" name="data" defaultValue={hoje()} max={hoje()} required /></label>
      <label className={styles.field}>Professor responsável<input value={autor} readOnly /></label>
      {erro && <p role="alert">{erro}</p>}
      <div className={styles.dialogActions}>
        <button type="submit" className={acao} data-kind="primary">Salvar observação</button>
        <button type="button" className={acao} onClick={onCancel}>Cancelar</button>
      </div>
    </fieldset>
  </form>;
}

function PerfilPainel({ aluno, turma, onClose, onOpenProfile, onNota }) {
  const dados = perfilDemo(aluno.id);
  const perfil = { ...dados, observacoes: dados.observacoes.filter((nota) => nota.visibilidade !== 'RESTRITA') };
  const [editando, setEditando] = useState(false);
  const [aviso, setAviso] = useState('');
  const dialog = useRef(null);
  const formAnchor = useRef(null);
  const addButton = useRef(null);
  useEffect(() => {
    const modal = dialog.current;
    if (modal && !modal.open) modal.showModal();
    return () => { if (modal?.open) modal.close(); };
  }, []);
  useEffect(() => {
    if (editando) formAnchor.current?.querySelector('select')?.focus();
  }, [editando]);
  function fecharForm() {
    setEditando(false);
    addButton.current?.focus();
  }
  function guardar(dados) {
    const nova = { ...dados, id: crypto.randomUUID(), autor: autorDemo, registradoEm: new Date().toISOString() };
    const chave = chaveObservacoes(aluno.id);
    localStorage.setItem(chave, JSON.stringify([...lerLocal(chave), nova]));
    onNota();
    fecharForm();
    setAviso('Observação salva.');
  }
  const faltas = faltasConsecutivas(perfil.aulas);
  const notas = perfil.notas?.flatMap((linha) => linha.scores) || [];
  const media = notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : null;
  function fecharPerfil() {
    dialog.current.close();
    onClose();
  }
  return <dialog ref={dialog} data-local-content className={styles.drawer} onCancel={(event) => { event.preventDefault(); fecharPerfil(); }}
    aria-labelledby="perfil-sala-titulo">
    <div className={styles.drawerTop}><span>{icon(BookOpen)} Carômetro</span>
      <button className={acao} aria-label="Fechar perfil" type="button" onClick={fecharPerfil}>{icon(X, 20)}</button>
    </div>
    <div className={styles.identity}><Avatar aluno={aluno} /><div>
      <h2 id="perfil-sala-titulo">{aluno.nome}</h2>
      <p>{[turma.nome, turma.serie, turma.periodo].filter(Boolean).join(' · ')}</p><Sinal aluno={aluno} texto />
    </div></div>
    <dl className={styles.profileMetrics}>
      <div><dt>Frequência</dt><dd>{percentual(aluno.frequencia)}</dd></div>
      <div><dt>Faltas consecutivas</dt><dd>{faltas ?? 'Sem registros'}</dd></div>
      <div><dt>Média das notas</dt><dd>{media ?? 'Indisponível'}</dd></div>
    </dl>
    <div className={styles.dialogActions}>
      <button className={acao} type="button" onClick={() => onOpenProfile(aluno.id)}>
        Ver perfil completo {icon(ArrowRight, 15)}
      </button>
      <button ref={addButton} className={acao} data-kind="primary" type="button" onClick={() => {
        setAviso('');
        setEditando(true);
      }}>{icon(Plus)} Adicionar observação</button>
    </div>
    {aviso && <p className={styles.notice} role="status">{aviso}</p>}
    {editando && <div ref={formAnchor}><ObservacaoForm autor={autorDemo} onCancel={fecharForm} onSave={guardar} /></div>}
      <section className={styles.profileBlock}>
        <h3>Presença recente</h3>
        {!perfil.aulas.length && <p>Não há aulas registradas para este estudante.</p>}
        <ul>{perfil.aulas.slice(0, 6).map((aula) => <li key={aula.data}>
          <span>{dataFormatada(aula.data)}</span>
          <strong>{presencas[aula.situacao]}</strong>
        </li>)}</ul>
      </section>
      {perfil.notas?.length > 0 && <details className={styles.profileBlock}>
        <summary>Notas por disciplina</summary>
        <ul>{perfil.notas.map(({ subject, scores }) => <li key={subject}><span>{subject}</span>
          <strong>{scores.map((nota) => nota.toLocaleString('pt-BR')).join(' · ')}</strong></li>)}</ul>
      </details>}
      <section className={styles.profileBlock}>
        <h3>Histórico de observações</h3>
        {!perfil.observacoes.length && <p>Nenhuma observação registrada.</p>}
        <ol className={styles.notes}>{perfil.observacoes.map((nota) => <li key={nota.id}>
          <strong>{categorias[nota.categoria] || nota.subject}</strong>
          <small>{nota.autor || nota.author} · {dataFormatada(nota.data || nota.date)}{nota.atencao && ' · ' + atencoes[nota.atencao]}</small>
          <p>{nota.descricao || nota.text}</p>
        </li>)}</ol>
      </section>
  </dialog>;
}

function Sala({ turma, view, busca, status, change, turmas, onOpenProfile, onNota, onSaveMap, attendance, attendanceMeta, onSaveAttendance }) {
  const [edicao, setEdicao] = useState(null);
  const [chamada, setChamada] = useState(false);
  const [origem, setOrigem] = useState(null);
  const [aviso, setAviso] = useState('');
  const [erro, setErro] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const opener = useRef(null);
  const estudantes = turma.estudantes;
  const alunos = new Map(estudantes.map((aluno) => [aluno.id, aluno]));
  const rascunho = edicao?.atual;
  const ordem = rascunho || ordemAssentos(estudantes, turma.assentos);
  const filtrar = (aluno) => rascunho || (normalizar(aluno.nome).includes(normalizar(busca)) && (!status || situacaoAluno(aluno) === status));
  const visiveis = ordem.map((id) => alunos.get(id)).filter((aluno) => aluno && filtrar(aluno));
  const alunoSelecionado = alunos.get(selecionado);
  function abrir(aluno, event) {
    opener.current = event.currentTarget;
    setSelecionado(aluno.id);
  }
  function assento(index) {
    if (origem === null || origem === index) {
      setOrigem(origem === index || !ordem[index] ? null : index);
      return;
    }
    moverAssento(origem, index);
  }
  function moverAssento(de, para) {
    if (!edicao || de === para || !alunos.has(ordem[de]) || para < 0 || para >= ordem.length) return;
    const nova = [...ordem];
    [nova[de], nova[para]] = [nova[para], nova[de]];
    setEdicao({ atual: nova, anteriores: [...edicao.anteriores, ordem], posteriores: [] });
    const nome = alunos.get(nova[para]).nome;
    const outroAluno = alunos.get(nova[de]);
    setAviso(outroAluno ? nome + ' e ' + outroAluno.nome + ' trocaram de lugar.' : nome + ' ocupou a carteira ' + (para + 1) + '.');
    setOrigem(null);
  }
  function desfazer(refazer = false) {
    const { atual, anteriores, posteriores } = edicao;
    if (refazer && posteriores.length) {
      setEdicao({ atual: posteriores[0], anteriores: [...anteriores, atual], posteriores: posteriores.slice(1) });
    } else if (!refazer && anteriores.length) {
      setEdicao({ atual: anteriores.at(-1), anteriores: anteriores.slice(0, -1), posteriores: [atual, ...posteriores] });
    } else return;
    setOrigem(null);
    setAviso(refazer ? 'Alteração refeita.' : 'Alteração desfeita.');
  }
  function cancelarMapa() {
    setEdicao(null);
    setOrigem(null);
    setErro('');
    setAviso('');
  }
  function guardarMapa() {
    try {
      onSaveMap(turma.id, ordem);
      cancelarMapa();
      setAviso('Mapa de assentos salvo.');
    } catch {
      setErro('Não foi possível salvar o mapa no navegador.');
    }
  }
  return <>
    <div className={styles.roomHeader}>
      <Link to="/teacher" className={styles.back}>{icon(ArrowLeft, 16)} Minhas Turmas</Link>
      <Seletor label="Trocar turma" value={turma.id} onChange={(id) => change({ turma: id })}
        options={turmas.map((item) => [item.id, item.nome + ' · ' + turmaMeta(item)])} />
    </div>
    <div className={styles.sectionHeader}>
      <div><h2>Turma {turma.nome}</h2><p>{turmaMeta(turma)} · {estudantes.length} {estudantes.length === 1 ? 'estudante' : 'estudantes'}</p></div>
      {view === 'mapa' && estudantes.length > 0 && !rascunho && <div className={styles.dialogActions}><button className={acao} data-kind="primary" type="button" onClick={() => setChamada(true)}>{icon(CheckCircle2)} Registrar frequência</button><button className={acao} type="button" onClick={() => {
        setEdicao({ atual: ordem, anteriores: [], posteriores: [] });
        setAviso('');
      }}>{icon(Shuffle)} Editar mapa</button></div>}
    </div>
    <div className={styles.roomTools}>
      <div className={styles.views} role="group" aria-label="Visualização">
        {views.map(([id, label, Icon]) => <button key={id} type="button" disabled={!!rascunho}
          aria-pressed={view === id} onClick={() => change({ vista: id })}>{icon(Icon)} {label}</button>)}
      </div>
      {!rascunho && <div className={styles.toolbar}>
        <Busca label="Buscar estudante" value={busca} onChange={(q) => change({ q }, true)} />
        <Seletor label="Acompanhamento" value={status} onChange={(status) => change({ status })}
          options={ [['', 'Todas as situações'], ...Object.entries(situacoes)] } />
      </div>}
    </div>
    {rascunho && <div className={styles.editBar}>
      <div><strong>Organizar assentos</strong>
        <p>{origem == null ? 'Arraste os estudantes para reorganizar a sala. Você também pode selecionar duas carteiras com clique ou teclado.' : alunos.get(ordem[origem]).nome + ' selecionado. Escolha a carteira de destino.'}</p></div>
      <div className={styles.dialogActions}>
        <button type="button" className={acao} disabled={!edicao.anteriores.length} onClick={() => desfazer()}>{icon(Undo2)} Desfazer</button>
        <button type="button" className={acao} disabled={!edicao.posteriores.length} onClick={() => desfazer(true)}>{icon(Redo2)} Refazer</button>
        <button type="button" className={acao} data-kind="primary" onClick={guardarMapa}>Salvar mapa</button>
        <button type="button" className={acao} onClick={cancelarMapa}>Cancelar</button>
      </div>
    </div>}
    {aviso && <p className={styles.notice} role="status">{aviso}</p>}
    {erro && <p className={styles.notice} role="alert">{erro}</p>}
    {!visiveis.length && <p className={styles.empty}>{estudantes.length ? 'Nenhum estudante corresponde aos filtros.' : 'Não há estudantes matriculados nesta turma.'}</p>}
    {!!visiveis.length && (view === 'mapa'
      ? <Mapa turma={turma} alunos={alunos} visiveis={visiveis} ordem={ordem} editing={!!rascunho}
        origem={origem} onSeat={assento} onDrop={moverAssento} onOpen={abrir} selecionado={selecionado}
        attendance={attendance[hoje()] || {}} highlight={busca && visiveis.length === 1 ? visiveis[0].id : null} />
      : <CarteirasAlternativas view={view} alunos={visiveis} onOpen={abrir} />)}
    <div className={styles.legend} aria-label="Legenda de acompanhamento">
      {Object.entries(situacoes).map(([id, label]) => <span className={styles.signal} key={id}><i data-status={id} aria-hidden="true" />{label}</span>)}
    </div>
    <p className={styles.hint}>{icon(Info, 15)} Os lugares mostram a organização da turma. A situação de acompanhamento não indica presença na aula.</p>
    {!rascunho && Object.keys(attendance[hoje()] || {}).length > 0 && <div className={styles.legend} aria-label="Chamada de hoje">
      {Object.entries(presencasAbreviadas).filter(([state]) => state !== 'NAO_REGISTRADA').map(([state, initials]) =>
        <span className={styles.callLegend} key={state}><b className={styles.attendanceMark} data-call={state}>{initials}</b>{presencas[state]}</span>)}
    </div>}
    {chamada && <ClassAttendance turma={turma} attendance={attendance} attendanceMeta={attendanceMeta}
      onSave={onSaveAttendance} onClose={() => setChamada(false)} />}
    {alunoSelecionado && <PerfilPainel key={selecionado} aluno={alunoSelecionado} turma={turma}
      onClose={() => {
        setSelecionado(null);
        opener.current?.focus({ preventScroll: true });
      }} onOpenProfile={onOpenProfile}
      onNota={onNota} />}
  </>;
}

export default function MinhaSala({ room, localStudents, onOpenProfile, classAttendance, classAttendanceMeta, onSaveAttendance }) {
  const [query, setQuery] = useSearchParams();
  const [, atualizarDemo] = useState(0);
  const turmas = turmasDemo.map((turma) => ({ ...turma, assentos: lerLocal(mapaLocal(turma.id)),
    estudantes: [...turma.estudantes, ...localStudents
      .filter((aluno) => aluno.className === turma.nome)
      .map((aluno) => ({ id: aluno.id, nome: aluno.name, foto: aluno.photo }))].map((aluno) => ({
      ...aluno, atencao: ordenarObservacoes(lerLocal(chaveObservacoes(aluno.id))).find((nota) => nota.atencao && nota.visibilidade !== 'RESTRITA')?.atencao,
    })),
  }));
  const turma = turmas.find((item) => item.id === query.get('turma')) ?? turmas[0];
  const linkSala = (id) => '/teacherRoom?turma=' + encodeURIComponent(id);
  const view = views.some(([id]) => id === query.get('vista')) ? query.get('vista') : 'mapa';

  function change(campos, replace = false) {
    const nova = new URLSearchParams(query);
    Object.entries(campos).forEach(([chave, valor]) => valor ? nova.set(chave, valor) : nova.delete(chave));
    setQuery(nova, { replace });
  }
  function onNota() {
    atualizarDemo((value) => value + 1);
  }
  function onSaveMap(id, ordem) {
    localStorage.setItem(mapaLocal(id), JSON.stringify(ordem));
    atualizarDemo((value) => value + 1);
  }
  return <div className={styles.page} data-room={room} data-local-content>
    <header className={styles.hero}>
      <div><h1>{room ? 'Minha Sala' : 'Minhas Turmas'}</h1>
        <p>{room ? 'Organize os assentos e acompanhe cada estudante.' : 'Escolha uma turma para abrir a sala e acompanhar os estudantes.'}</p></div>
      <span className={styles.demo}>{icon(Info, 16)} Demonstração · Dados fictícios</span>
    </header>
    {!room && <nav className={styles.teacherLinks} aria-label="Acessos rápidos do professor">
      <Link className={acao} to="/carometroTeacher">{icon(Search)} Buscar estudante</Link>
      <Link className={acao} to="/teacherFollowup">{icon(BookOpen)} Registros de apoio</Link>
    </nav>}
    {room && turma ? <Sala key={turma.id} turma={turma} turmas={turmas}
      view={view} busca={query.get('q') ?? ''} status={query.get('status') ?? ''}
      change={change} onOpenProfile={onOpenProfile} onNota={onNota} onSaveMap={onSaveMap}
      attendance={classAttendance?.[turma.id] || {}} attendanceMeta={classAttendanceMeta?.[turma.id] || {}}
      onSaveAttendance={(date, statuses, lesson) => onSaveAttendance(turma.id, date, statuses, lesson)} />
    : <MinhasTurmas turmas={turmas} linkSala={linkSala} classAttendance={classAttendance} classAttendanceMeta={classAttendanceMeta} onSaveAttendance={onSaveAttendance} />}
  </div>;
}
