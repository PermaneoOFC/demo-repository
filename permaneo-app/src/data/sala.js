import { demoStudents } from './students.js';
import { getStudentProfile } from './studentProfiles.js';

export const categorias = {
  PARTICIPACAO: 'Participação nas aulas',
  APRENDIZAGEM: 'Dificuldades de aprendizagem',
  COMPORTAMENTO: 'Comportamento em sala',
  EVOLUCAO: 'Evolução acadêmica',
  FREQUENCIA: 'Faltas e atrasos',
  ACOMPANHAMENTO: 'Necessidade de acompanhamento',
  GERAL: 'Observação geral',
};
export const atencoes = { INFORMATIVO: 'Informativo', ACOMPANHAMENTO: 'Acompanhamento', PRIORITARIO: 'Prioritário' };
export const situacoes = {
  regular: 'Situação regular',
  attention: 'Atenção necessária',
  priority: 'Acompanhamento prioritário',
  unknown: 'Dados insuficientes',
};
export const presencas = { PRESENTE: 'Presente', AUSENTE: 'Ausente', JUSTIFICADA: 'Justificada', NAO_REGISTRADA: 'Não registrada' };
export const normalizar = (texto = '') => texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
export const percentual = (valor) => valor == null ? 'Sem registros' : valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
export const turmaMeta = (turma) => [turma.serie, turma.periodo].filter(Boolean).join(' · ') || 'Série e período não informados';
const dataIso = (dia) => dia?.includes('/') ? dia.split('/').reverse().join('-') : (dia || '');
export const dataFormatada = (dia) => dataIso(dia).slice(0, 10).split('-').reverse().join('/');
export const hoje = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Sao_Paulo' }).format(new Date());

export const turmasDemo = [
  { id: '9a', nome: '9º A', serie: '9º ano', periodo: 'Manhã' },
  { id: '8a', nome: '8º A', serie: '8º ano', periodo: 'Tarde' },
].map((turma) => ({
  ...turma,
  estudantes: demoStudents.filter((aluno) => aluno.className === turma.nome).map((aluno) => {
    const perfil = getStudentProfile(aluno.key);
    return { id: aluno.id, nome: aluno.name, foto: aluno.photo, frequencia: perfil.attendance };
  }),
}));

export const chaveObservacoes = (id) => 'permaneo-profile-notes-' + id;
export const lerLocal = (chave, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(chave)) ?? fallback; }
  catch { return fallback; }
};

export function ordenarObservacoes(observacoes) {
  return [...observacoes].sort((a, b) =>
    dataIso(b.data || b.date).localeCompare(dataIso(a.data || a.date)) ||
    (b.registradoEm || '').localeCompare(a.registradoEm || '') ||
    (Number(b.id) || 0) - (Number(a.id) || 0)
  );
}

export function perfilDemo(id) {
  if (!demoStudents.some((aluno) => aluno.key === id)) {
    return { aulas: [], observacoes: ordenarObservacoes(lerLocal(chaveObservacoes(id))) };
  }
  const perfil = getStudentProfile(id);
  return {
    notas: perfil.grades,
    aulas: [...perfil.recentAttendance].reverse().map((aula) => ({
      data: dataIso(aula.date),
      situacao: aula.absent ? (aula.justified ? 'JUSTIFICADA' : 'AUSENTE') : 'PRESENTE',
    })),
    observacoes: ordenarObservacoes([...lerLocal(chaveObservacoes(id)), ...perfil.observations]),
  };
}

export function situacaoAluno(aluno) {
  if (aluno.atencao === 'PRIORITARIO') return 'priority';
  // Mesmo limiar que gera o alerta de frequência no Carômetro.
  if (aluno.atencao === 'ACOMPANHAMENTO' || aluno.frequencia < 85 && aluno.frequencia != null) return 'attention';
  return aluno.frequencia == null ? 'unknown' : 'regular';
}

export function faltasConsecutivas(aulas) {
  const registradas = aulas.filter((aula) => aula.situacao !== 'NAO_REGISTRADA');
  if (!registradas.length) return null;
  const ultimaPresenca = registradas.findIndex((aula) => aula.situacao === 'PRESENTE');
  return ultimaPresenca === -1 ? registradas.length : ultimaPresenca;
}

export function ordemAssentos(estudantes, salvos = []) {
  const ids = new Set(estudantes.map((aluno) => aluno.id));
  const ordem = Array.from({ length: Math.max(6, estudantes.length) }, (_, i) =>
    ids.delete(salvos[i]) ? salvos[i] : null);
  const restantes = ids.values();
  return ordem.map((id) => id ?? restantes.next().value ?? null);
}
