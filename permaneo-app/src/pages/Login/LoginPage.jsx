
import { useState } from 'react';
import { ArrowLeft, Sun, Moon, LayoutDashboard, BookOpen, GraduationCap } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import ProfileOption from '../../components/ui/ProfileOption.jsx';
import TextField from '../../components/ui/TextField.jsx';
import styles from './LoginPage.module.css';

const profiles = [
  { value: 'director', title: 'Coordenação', description: 'Visão da escola, acompanhamento e decisões', icon: LayoutDashboard },
  { value: 'teacher', title: 'Professor', description: 'Minhas turmas, presença e acompanhamento', icon: BookOpen },
  { value: 'student', title: 'Aluno', description: 'Minha jornada, frequência e pedidos de apoio', icon: GraduationCap },
];

export default function LoginPage({ role, onSelectRole, onNavigate, dark, onToggleTheme, photo, logo, frequenciaIntegrada = false }) {
  const [email, setEmail] = useState('demo@permaneo.com.br');
  const [password, setPassword] = useState('permaneo');
  const [error, setError] = useState('');
  const enter = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Informe um e-mail válido para a demonstração.'); return; }
    if (!password.trim()) { setError('Preencha a senha de demonstração ou use “Explorar sem preencher”.'); return; }
    onNavigate(role);
  };

  return (
    <section className={styles.login} onClick={(event) => event.stopPropagation()}>
      <aside className={styles.story}>
        <a className={styles.brand} href="#home" onClick={(event) => { event.preventDefault(); onNavigate('home'); }}>
          <img src={logo} alt="" width="40" height="31" /><span>Permane<span>o</span></span>
        </a>
        <img className={styles.photo} src={photo} alt="Convivência no ambiente escolar" width="832" height="518" />
        <div className={styles.message}>
          <small>PERMANECER É CONSTRUIR POSSIBILIDADES</small>
          <h1>Toda trajetória<br />merece <span>continuar.</span></h1>
          <p>Juntos, direção, professores e estudantes percebem cedo e cuidam melhor.</p>
        </div>
      </aside>
      <div className={styles.access}>
        <header className={styles.toolbar}>
          <a href="#home" onClick={(event) => { event.preventDefault(); onNavigate('home'); }}><ArrowLeft size={18} /> Voltar ao início</a>
          <Button variant="secondary" onClick={onToggleTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}>{dark ? <Sun size={20} /> : <Moon size={20} />}</Button>
        </header>
        <form className={styles.form} onSubmit={enter}>
          <small>SEU ESPAÇO DE CUIDADO</small>
          <h2>Que bom ter você aqui.</h2>
          <p>Escolha seu perfil para explorar o Permaneo.</p>
          <div className={styles.profiles} role="radiogroup" aria-label="Perfil de acesso">
            {profiles.map((profile) => <ProfileOption key={profile.value} {...profile} selected={role === profile.value} onSelect={onSelectRole} />)}
          </div>
          <TextField label="E-mail de demonstração" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} autoComplete="off" />
          <TextField label="Senha de demonstração" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} autoComplete="off" />
          {error && <p role="alert" className={styles.error}>{error}</p>}
          <Button type="submit">Entrar na demonstração</Button>
          <Button variant="secondary" onClick={() => onNavigate(role)}>Explorar sem preencher</Button>
          <a className={styles.studentDemoLink} href="#/student" onClick={(event) => {
            event.preventDefault(); onSelectRole('student'); onNavigate('student');
          }}>Acessar área do aluno (demonstração)</a>
          {frequenciaIntegrada && <Button variant="secondary" onClick={() => onNavigate('frequencia')}>Acessar frequência integrada</Button>}
          <Button variant="ghost" onClick={() => setError('Esta é uma demonstração. Use o e-mail demo@permaneo.com.br e a senha permaneo. Nenhuma conta real é necessária.')}>Esqueci minha senha</Button>
        </form>
        <footer>Ambiente demonstrativo. Nenhuma conta real é criada.<br />Use os dados de exemplo; não informe uma senha real.</footer>
      </div>
    </section>
  );
}
