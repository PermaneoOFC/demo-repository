import { chamadaRegistrada, foiPresenca, turmasDemo } from './sala.js';

export const levels = [
  ['regular', 'Situação regular', '#398e72'],
  ['attention', 'Atenção necessária', '#c58b32'],
  ['priority', 'Necessidade de intervenção', '#b86855'],
  ['urgent', 'Acompanhamento urgente', '#875586'],
  ['unknown', 'Dados insuficientes', '#80949b'],
];

export const classMeta = (name) => turmasDemo.find((item) => item.nome === name);
export function schoolGrade(student) {
  const year = student.className?.match(/^\d+º/)?.[0];
  return student.grade || classMeta(student.className)?.serie || (year ? year + ' ano' : '');
}
export const schoolShift = (student) => student.period || classMeta(student.className)?.periodo || '';
export const dateLabel = (value) => value ? value.split('-').reverse().join('/') : 'Sem data';
export function isoDate(value) {
  if (typeof value !== 'string') return '';
  return value.includes('/') ? value.split('/').reverse().join('-') : value.slice(0, 10);
}
export const within = (date, from, to) => (!from || Boolean(date && date >= from)) && (!to || Boolean(date && date <= to));
export const percent = (value) => value == null ? '—' : value.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
export const frequency = (entries) => entries.length ? 100 * entries.filter((entry) => foiPresenca(entry.status)).length / entries.length : null;

export function attendanceEntries(student, classAttendance) {
  const days = new Map((student.recentAttendance || []).map((day) => [
    isoDate(day.date), day.absent ? day.justified ? 'JUSTIFICADA' : 'AUSENTE' : 'PRESENTE',
  ]));
  for (const [date, statuses] of Object.entries(classAttendance[classMeta(student.className)?.id] || {})) {
    const status = statuses?.[student.key];
    if (chamadaRegistrada(status)) days.set(date, status);
  }
  return [...days].sort(([a], [b]) => a.localeCompare(b)).map(([date, status]) => ({ date, status }));
}

export function studentSituation(days) {
  const rate = frequency(days);
  let absences = 0;
  for (let index = days.length - 1; index >= 0 && !foiPresenca(days[index].status); index--) absences++;
  if (rate == null) return { rate, absences, level: 'unknown' };
  if (absences >= 3) return { rate, absences, level: 'urgent' };
  if (rate < 75) return { rate, absences, level: 'priority' };
  return { rate, absences, level: rate < 85 ? 'attention' : 'regular' };
}

export function periodKey(date, view) {
  if (view === 'month') return date.slice(0, 7);
  if (view === 'term') return date.slice(0, 4) + '-' + (Math.ceil(Number(date.slice(5, 7)) / 2) * 2 - 1).toString().padStart(2, '0');
  if (view !== 'week') return date;
  const monday = new Date(date + 'T12:00:00Z');
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
  return monday.toISOString().slice(0, 10);
}

export function periodLabel(key, view) {
  const [year, month] = key.split('-');
  if (view === 'month') return month + '/' + year;
  if (view === 'term') return month + '–' + (Number(month) + 1).toString().padStart(2, '0') + '/' + year;
  return dateLabel(key).slice(0, 5);
}

export function previousPeriod(from, to) {
  if (!from || !to || from > to) return null;
  const start = new Date(from + 'T12:00:00Z');
  const end = new Date(to + 'T12:00:00Z');
  const day = 86_400_000;
  return [new Date(2 * start - end - day), new Date(start - day)].map((date) => date.toISOString().slice(0, 10));
}
