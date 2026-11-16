import { useState } from 'react';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import styles from './DemoForm.module.css';
export default function DemoForm({ title, onSave, records, student }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pendente');
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ text, date, status, student });
      }}
    >
      <h2 id="dialog-title">{title}</h2>
      <p>Dados fictícios · Registro salvo apenas neste navegador. Nenhuma mensagem é enviada.</p>
      <TextField
        label="Registro de acompanhamento"
        as="textarea"
        required
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Combine um próximo passo com o estudante"
      />
      <TextField
        label="Próximo retorno"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Situação"
        as="select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {['Pendente', 'Em andamento', 'Concluída'].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </TextField>
      <Button type="submit">Salvar registro demonstrativo</Button>
      {!!records.length && (
        <div className={styles.history}>
          <h3>Histórico local</h3>
          {records.map((r, i) => (
            <p key={i}>
              <b>{r.status}</b> · {r.text}
              {r.date && ' · ' + r.date}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}
