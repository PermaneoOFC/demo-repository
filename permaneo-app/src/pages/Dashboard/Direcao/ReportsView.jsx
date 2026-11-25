import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  Download,
  FileSpreadsheet,
  HeartHandshake,
  Info,
  Users,
} from 'lucide-react';
import { demoStudents } from '../../../data/students.js';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import { chamadaRegistrada, foiPresenca, turmasDemo } from '../../../data/sala.js';
import styles from './ReportsView.module.css';

const periods = ['Ano letivo (Fev–Set)', '3º Bimestre', 'Últimos 30 dias'];

function formatPercent(value) {
  if (value == null || Number.isNaN(value)) return '—';
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
}

function formatGrade(value) {
  if (value == null || Number.isNaN(value)) return '—';
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function studentAttendanceForPeriod(profile, calls, period) {
  const callList = calls.filter(chamadaRegistrada);
  const callPresent = callList.filter(foiPresenca).length;

  if (period === 'Últimos 30 dias') {
    const recent = profile.recentAttendance || [];
    const baseTotal = recent.length;
    const basePresent = recent.filter((day) => !day.absent).length;
    const total = baseTotal + callList.length;
    if (!total) return null;
    return Math.round(((basePresent + callPresent) / total) * 1000) / 10;
  }

  if (period === '3º Bimestre') {
    const october = profile.months?.find((m) => m.month === 'Outubro');
    const baseTotal = october ? october.total : 0;
    const basePresent = october ? october.present : 0;
    const total = baseTotal + callList.length;
    if (!total) return null;
    return Math.round(((basePresent + callPresent) / total) * 1000) / 10;
  }

  const baseTotal = profile.totalLessons || 0;
  const basePresent = profile.attendance != null ? (profile.attendance / 100) * baseTotal : 0;
  const total = baseTotal + callList.length;
  if (!total) return null;
  return Math.round(((basePresent + callPresent) / total) * 1000) / 10;
}

function studentGradeForPeriod(profile, period) {
  const grades = profile.grades || [];
  if (!grades.length) return null;
  if (period === '3º Bimestre') {
    const third = grades.map((g) => g.scores?.[2]).filter((v) => typeof v === 'number');
    return third.length ? third.reduce((a, b) => a + b, 0) / third.length : null;
  }
  const all = grades.flatMap((g) => g.scores || []);
  return all.length ? all.reduce((a, b) => a + b, 0) / all.length : null;
}

export default function ReportsView({
  records = [],
  classAttendance = {},
  localStudents = [],
  onOpenProfile,
  onNotify,
}) {
  const [className, setClassName] = useState('Todas as turmas');
  const [grade, setGrade] = useState('Todas as séries');
  const [period, setPeriod] = useState(periods[0]);
  const [situation, setSituation] = useState('Todas');
  const idPrefix = useId();

  const students = useMemo(() => {
    const base = demoStudents.map((s) => {
      const profile = getStudentProfile(s.key);
      const classId = turmasDemo.find((t) => t.nome === s.className)?.id;
      const calls = Object.values(classAttendance[classId] || {}).map((map) => map?.[s.key]);
      const frequency = studentAttendanceForPeriod(profile, calls, period);
      const gradeAvg = studentGradeForPeriod(profile, period);
      return {
        key: s.key,
        name: s.name,
        className: s.className,
        serie: turmasDemo.find((t) => t.nome === s.className)?.serie || `${s.className.split(' ')[0]} ano`,
        frequency,
        gradeAvg,
        attention: frequency != null && frequency < 85,
      };
    });

    const added = localStudents.map((s) => {
      const classId = turmasDemo.find((t) => t.nome === s.className)?.id;
      const calls = Object.values(classAttendance[classId] || {}).map((map) => map?.[s.id]);
      const valid = calls.filter(chamadaRegistrada);
      const frequency = valid.length
        ? Math.round((valid.filter(foiPresenca).length / valid.length) * 1000) / 10
        : (typeof s.attendance === 'number' ? s.attendance : null);
      return {
        key: s.id,
        name: s.name,
        className: s.className || '9º A',
        serie: s.grade || `${(s.className || '9º A').split(' ')[0]} ano`,
        frequency,
        gradeAvg: null,
        attention: frequency != null && frequency < 85,
      };
    });

    return [...base, ...added];
  }, [classAttendance, localStudents, period]);

  const classOptions = useMemo(
    () => ['Todas as turmas', ...new Set(students.map((s) => s.className))].filter(Boolean),
    [students]
  );

  const gradeOptions = useMemo(
    () => ['Todas as séries', ...new Set(students.map((s) => s.serie))].filter(Boolean),
    [students]
  );

  const classRows = useMemo(() => {
    const names = [...new Set(students.map((s) => s.className))];
    return names
      .map((name) => {
        const list = students.filter((s) => s.className === name);
        const freqs = list.map((s) => s.frequency).filter((v) => v != null);
        const grades = list.map((s) => s.gradeAvg).filter((v) => v != null);
        const avgFreq = freqs.length ? freqs.reduce((a, b) => a + b, 0) / freqs.length : null;
        const avgGrade = grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : null;
        const attentionCount = list.filter((s) => s.attention).length;
        const actionsCount = records.filter((r) =>
          list.some((s) => s.key === r.student || s.name === r.student)
        ).length;
        return {
          name,
          serie: list[0]?.serie || '—',
          students: list,
          avgFreq,
          avgGrade,
          attentionCount,
          actionsCount,
        };
      })
      .filter((row) =>
        (className === 'Todas as turmas' || row.name === className) &&
        (grade === 'Todas as séries' || row.serie === grade) &&
        (situation === 'Todas' ||
          (situation === 'Com atenção' && row.attentionCount > 0) ||
          (situation === 'Regular' && row.attentionCount === 0))
      );
  }, [students, records, className, grade, situation]);

  const filteredStudents = useMemo(
    () => classRows.flatMap((row) => row.students),
    [classRows]
  );

  const attentionStudents = useMemo(
    () => filteredStudents.filter((s) => s.attention),
    [filteredStudents]
  );

  const totalActions = classRows.reduce((sum, row) => sum + row.actionsCount, 0);
  const overallFreqValues = filteredStudents.map((s) => s.frequency).filter((v) => v != null);
  const overallFreq = overallFreqValues.length
    ? overallFreqValues.reduce((a, b) => a + b, 0) / overallFreqValues.length
    : null;

  const exportCsv = () => {
    const rows = [
      ['Relatório consolidado Permaneo — demonstração'],
      ['Período', period, 'Turma', className, 'Série', grade],
      [],
      ['Turma', 'Série', 'Estudantes', 'Frequência média', 'Média de notas', 'Precisam de atenção', 'Ações registradas'],
      ...(classRows.length
        ? classRows.map((row) => [
            row.name,
            row.serie,
            row.students.length,
            formatPercent(row.avgFreq),
            formatGrade(row.avgGrade),
            row.attentionCount,
            row.actionsCount,
          ])
        : [['Nenhuma turma na seleção atual', '', 0, '—', '—', 0, 0]]),
    ];
    const csv = '\ufeff' + rows.map((r) => r.map((v) => `"${String(v ?? '').replaceAll('"', '""')}"`).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio-permaneo-demonstrativo.csv';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    onNotify?.('Relatório demonstrativo baixado.');
  };

  return (
    <main className={styles.page} data-local-content>
      <header className={styles.intro}>
        <div>
          <p className={styles.context}>
            Escola Estadual Horizonte <span>· Demonstração da coordenação</span>
          </p>
          <h1>Relatórios</h1>
          <p>Visão consolidada por turma e período para apoiar decisões pedagógicas da equipe.</p>
        </div>
        <button type="button" className={styles.exportButton} onClick={exportCsv}>
          <Download size={17} aria-hidden="true" />
          Exportar CSV
        </button>
      </header>

      <section className={styles.filters} aria-label="Filtros do relatório">
        <div className={styles.filterField}>
          <label htmlFor={`${idPrefix}-turma`}>Turma</label>
          <select id={`${idPrefix}-turma`} value={className} onChange={(event) => setClassName(event.target.value)}>
            {classOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterField}>
          <label htmlFor={`${idPrefix}-serie`}>Série</label>
          <select id={`${idPrefix}-serie`} value={grade} onChange={(event) => setGrade(event.target.value)}>
            {gradeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterField}>
          <label htmlFor={`${idPrefix}-periodo`}>Período</label>
          <select id={`${idPrefix}-periodo`} value={period} onChange={(event) => setPeriod(event.target.value)}>
            {periods.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterField}>
          <label htmlFor={`${idPrefix}-situacao`}>Situação da turma</label>
          <select id={`${idPrefix}-situacao`} value={situation} onChange={(event) => setSituation(event.target.value)}>
            <option>Todas</option>
            <option>Com atenção</option>
            <option>Regular</option>
          </select>
        </div>
      </section>

      <section className={styles.kpis} aria-label="Resumo do relatório">
        <article className={styles.kpi}>
          <div className={styles.kpiTop}>
            <span>Turmas filtradas</span>
            <FileSpreadsheet size={17} aria-hidden="true" />
          </div>
          <strong>{classRows.length}</strong>
          <small>Período: {period}</small>
        </article>
        <article className={styles.kpi}>
          <div className={styles.kpiTop}>
            <span>Estudantes na seleção</span>
            <Users size={17} aria-hidden="true" />
          </div>
          <strong>{filteredStudents.length}</strong>
          <small>Inclui cadastros locais da demo</small>
        </article>
        <article className={styles.kpi}>
          <div className={styles.kpiTop}>
            <span>Frequência média</span>
            <Activity size={17} aria-hidden="true" />
          </div>
          <strong>{formatPercent(overallFreq)}</strong>
          <small>Meta de referência: 75%</small>
        </article>
        <article className={styles.kpi}>
          <div className={styles.kpiTop}>
            <span>Ações registradas</span>
            <HeartHandshake size={17} aria-hidden="true" />
          </div>
          <strong>{totalActions}</strong>
          <small>{attentionStudents.length} estudante(s) em atenção</small>
        </article>
      </section>

      <section className={styles.panel} aria-labelledby="reports-table-title">
        <div className={styles.panelHeader}>
          <div>
            <h2 id="reports-table-title">Consolidado por turma</h2>
            <p>Resultados calculados com base nos dados fictícios e chamadas salvas neste navegador.</p>
          </div>
          <div className={styles.panelActions}>
            <Link className={styles.secondaryAction} to="/directorFollowup">Abrir acompanhamento</Link>
            <Link className={styles.secondaryAction} to="/carometroManagement">Abrir Carômetro</Link>
          </div>
        </div>

        {classRows.length ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Turma</th>
                  <th scope="col">Série</th>
                  <th scope="col">Estudantes</th>
                  <th scope="col">Frequência média</th>
                  <th scope="col">Média de notas</th>
                  <th scope="col">Precisam de atenção</th>
                  <th scope="col">Ações registradas</th>
                </tr>
              </thead>
              <tbody>
                {classRows.map((row) => {
                  const level = row.avgFreq == null
                    ? 'good'
                    : row.avgFreq < 75
                      ? 'critical'
                      : row.avgFreq < 85
                        ? 'warning'
                        : 'good';
                  return (
                    <tr key={row.name}>
                      <th scope="row">{row.name}</th>
                      <td>{row.serie}</td>
                      <td>{row.students.length}</td>
                      <td>
                        <div className={styles.freqCell}>
                          <span className={styles.barTrack} aria-hidden="true">
                            <span
                              className={styles.barFill}
                              data-level={level}
                              style={{ width: `${Math.max(0, Math.min(100, row.avgFreq ?? 0))}%` }}
                            />
                          </span>
                          <strong>{formatPercent(row.avgFreq)}</strong>
                        </div>
                      </td>
                      <td>{formatGrade(row.avgGrade)}</td>
                      <td>
                        <span className={styles.countBadge} data-alert={row.attentionCount > 0}>
                          {row.attentionCount}
                        </span>
                      </td>
                      <td>{row.actionsCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>Nenhuma turma corresponde aos filtros selecionados.</p>
        )}
      </section>

      <section className={styles.panel} aria-labelledby="reports-attention-title">
        <div className={styles.panelHeader}>
          <div>
            <h2 id="reports-attention-title">Estudantes que merecem atenção no recorte</h2>
            <p>Estudantes com frequência abaixo de 85% nas turmas selecionadas.</p>
          </div>
        </div>
        {attentionStudents.length ? (
          <div className={styles.studentList}>
            {attentionStudents.map((student) => (
              <div key={student.key} className={styles.studentRow}>
                <div className={styles.studentInfo}>
                  <strong>{student.name}</strong>
                  <small>
                    {student.className} · Frequência de {formatPercent(student.frequency)}
                    {student.gradeAvg != null ? ` · Média ${formatGrade(student.gradeAvg)}` : ''}
                  </small>
                </div>
                <div className={styles.studentActions}>
                  <span className={styles.countBadge} data-alert="true">
                    <AlertTriangle size={12} aria-hidden="true" style={{ marginRight: 5 }} />
                    Atenção
                  </span>
                  {onOpenProfile && (
                    <button
                      type="button"
                      className={styles.secondaryAction}
                      onClick={() => onOpenProfile(student.key)}
                    >
                      Ver perfil
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nenhum estudante abaixo de 85% neste recorte.</p>
        )}
      </section>

      <aside className={styles.notice}>
        <Info size={16} aria-hidden="true" />
        <span>
          Modo demonstração: dados fictícios. As ações registradas e chamadas locais refletem o que foi salvo neste navegador e o CSV exporta apenas o recorte demonstrativo atual.
        </span>
      </aside>
    </main>
  );
}
