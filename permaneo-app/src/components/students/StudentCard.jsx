import styles from './StudentCard.module.css';
import Button from '../ui/Button.jsx';
export default function StudentCard({ student, onOpen }) {
  return (
    <article className={styles.card} data-name={'Estudante · ' + student.name}>
      <div className={styles.identity}>
        {student.photo ? (
          <img className={styles.avatar} src={student.photo} alt={'Foto de ' + student.name} />
        ) : (
          <span className={styles.avatar}>
            {student.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </span>
        )}
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
