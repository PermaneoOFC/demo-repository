import StudentPortrait from './StudentPortrait.jsx';
import styles from './StudentCard.module.css';
import Button from '../ui/Button.jsx';
export default function StudentCard({ student, onOpen }) {
  return (
    <article className={styles.card} data-name={'Estudante · ' + student.name}>
      <div className={styles.identity}>
        <StudentPortrait student={student} className={styles.avatar} decorative />
        <div>
          <h3>{student.name}</h3>
          <p>{student.className} · Matrícula ativa</p>
        </div>
      </div>
      <p>✓ Acompanhamento regular</p>
      <small>Cadastro demonstrativo local</small>
      <div className={styles.bottom}>
        <span>
          Frequência
          <br />
          <b>Sem registros</b>
        </span>
        <Button onClick={onOpen}>Ver perfil</Button>
      </div>
    </article>
  );
}
