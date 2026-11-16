import { useState } from 'react';
import { demoStudents } from '../../data/students.js';
import styles from './StudentPortrait.module.css';

// Inline fallback: available even when the network or an uploaded photo fails.
function IllustratedFallback({ id }) {
  const seed = [...String(id)].reduce((sum, char) => (sum * 31 + char.codePointAt(0)) >>> 0, 7);
  const skin = ['#dba77f', '#a96d4c', '#754932', '#efc5a4'][seed % 4];
  const shirt = ['#246579', '#227457', '#73668b', '#a16643'][seed % 4];
  return <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <rect width="120" height="120" fill="#dce9e7" />
    <path d="M14 120c0-28 19-40 46-40s46 12 46 40" fill={shirt} />
    <path d="M50 73h20v20c-6 7-14 7-20 0" fill={skin} />
    <ellipse cx="60" cy="49" rx="28" ry="33" fill="#34302d" />
    <ellipse cx="60" cy="55" rx="24" ry="30" fill={skin} />
    <path d={seed % 2 ? 'M35 46c-7-28 44-42 51-4-15-5-23-15-25-19-4 13-14 20-26 23' : 'M35 43c-7-29 49-35 50 2-15-2-24-10-30-16-6 10-12 12-20 14'} fill="#34302d" />
    <g fill="#302b29"><circle cx="50" cy="54" r="2" /><circle cx="70" cy="54" r="2" /></g>
    <path d="M54 69q6 5 12 0" fill="none" stroke="#733e32" strokeWidth="2" strokeLinecap="round" />
    {seed % 3 === 0 && <g fill="none" stroke="#344c52" strokeWidth="2"><rect x="40" y="47" width="17" height="13" rx="5" /><rect x="63" y="47" width="17" height="13" rx="5" /><path d="M57 52h6" /></g>}
  </svg>;
}

function PortraitImage({ source, name, id, decorative, loading }) {
  const [failed, setFailed] = useState(false);
  return source && !failed
    ? <img src={source} alt={decorative ? '' : `Retrato de ${name}`} width="512" height="512" loading={loading} decoding="async" onError={() => setFailed(true)} />
    : <span className={styles.fallback} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : `Avatar ilustrado de ${name}`}><IllustratedFallback id={id} /></span>;
}

export default function StudentPortrait({ student, className = '', decorative = false, loading = 'lazy' }) {
  const id = student.id ?? student.key;
  const name = student.name ?? student.nome ?? 'estudante';
  const registered = demoStudents.find((item) => item.id === id);
  const source = registered?.photo || student.photo || student.foto;
  return <span className={`${styles.portrait} ${className}`} data-student-id={id} aria-hidden={decorative || undefined}>
    <PortraitImage key={`${id}:${source || ''}`} source={source} name={name} id={id} decorative={decorative} loading={loading} />
  </span>;
}
