import { useState } from 'react';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import styles from './SupportForm.module.css';
const subjects = [
  'Dificuldades nos estudos',
  'Frequência',
  'Organização da rotina',
  'Quero conversar',
  'Outro assunto',
];

export default function SupportForm() {
  const [requests, setRequests] = useLocalStorage('permaneo-demo-support', []);
  const [recipient, setRecipient] = useState('Coordenação');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function saveRequest(event) {
    event.preventDefault();
    if (!message.trim()) return;
    setRequests((previous) => [
      ...previous,
      {
        recipient,
        subject,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setSent(true);
    setMessage('');
  }

  return (
    <section
      className={styles.panel}
      data-local-content
      onClick={(event) => event.stopPropagation()}
    >
      <h2>Vamos conversar?</h2>
      <p>Conte o que está acontecendo. Vamos pensar juntos no próximo passo.</p>
      <form onSubmit={saveRequest}>
        <TextField
          label="Para quem"
          as="select"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
        >
          <option>Coordenação</option>
          <option>Professor(a)</option>
        </TextField>
        <TextField
          label="Assunto"
          as="select"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          <option value="">Selecione o assunto</option>
          {subjects.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </TextField>
        <TextField
          label="Como podemos ajudar?"
          as="textarea"
          rows={4}
          required
          maxLength={1000}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setSent(false);
          }}
          placeholder="Conte como podemos ajudar…"
        />
        <Button type="submit" disabled={!message.trim()}>
          Enviar pedido demonstrativo
        </Button>
      </form>
      <small>
        Nesta demonstração, o pedido fica apenas neste navegador e não é enviado à escola.
      </small>
      {sent && (
        <p className={styles.success} role="status">
          Pedido demonstrativo registrado. Nenhuma mensagem foi enviada.
        </p>
      )}
      {requests.length > 0 && (
        <details open>
          <summary>Meus pedidos demonstrativos ({requests.length})</summary>
          {requests.map((request, index) => (
            <article className={styles.request} key={index}>
              <b>{request.subject}</b> · {request.recipient}
              <p>{request.message}</p>
              <small>
                {new Date(request.createdAt).toLocaleString('pt-BR')} · Salvo neste navegador
              </small>
              <p>
                Sem envio à escola. Ainda não há responsável, resposta ou retorno agendado nesta
                demonstração.
              </p>
            </article>
          ))}
        </details>
      )}
    </section>
  );
}
