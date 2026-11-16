import { useRef, useState } from 'react';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import styles from './AddStudentForm.module.css';
export default function AddStudentForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [guardian, setGuardian] = useState('');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');
  const input = useRef();
  const upload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
      setError('Selecione uma imagem de até 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !className) {
          setError('Preencha o nome completo e selecione a série e a turma.');
          return;
        }
        onSave({ name: name.trim(), className, guardian, contact, photo });
      }}
    >
      <h2 id="dialog-title">Adicionar aluno</h2>
      <p>Cadastro de demonstração · * campos obrigatórios</p>
      <div className={styles.photoRow}>
        {photo ? (
          <img className={styles.avatar} src={photo} alt="Prévia da foto do aluno" />
        ) : (
          <span className={styles.avatar}>
            {name
              .split(' ')
              .filter(Boolean)
              .map((n) => n[0])
              .slice(0, 2)
              .join('') || 'RA'}
          </span>
        )}
        <div>
          <p>Foto do aluno · opcional</p>
          <div className={styles.actions}>
            <Button variant="secondary" onClick={() => input.current.click()}>
              {photo ? 'Substituir' : 'Enviar'}
            </Button>
            <Button variant="secondary" onClick={() => setPhoto('')}>
              Remover
            </Button>
          </div>
          <small>Arquivo local de demonstração · até 2 MB</small>
          <input
            ref={input}
            className={styles.file}
            type="file"
            accept="image/*"
            aria-label="Foto do aluno"
            onChange={upload}
          />
        </div>
      </div>
      <TextField
        label="Nome completo"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Série e turma"
        as="select"
        required
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      >
        <option value="">Selecione uma turma</option>
        {['6º A', '7º B', '8º A', '9º A', '1º EM A', '2º EM B'].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </TextField>
      <TextField
        label="Nome do responsável"
        value={guardian}
        onChange={(e) => setGuardian(e.target.value)}
      />
      <TextField
        label="Contato do responsável"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      {error && <p role="alert">{error}</p>}
      <Button
        variant="secondary"
        onClick={() => {
          setName('Rafaela Almeida');
          setClassName('8º A');
          setGuardian('Responsável de demonstração');
        }}
      >
        Preencher exemplo
      </Button>
      <div className={styles.footer}>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar aluno</Button>
      </div>
    </form>
  );
}
