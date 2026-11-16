import styles from './App.module.css';
import PermaneoPage from './pages/PermaneoPage.jsx';
import { HashRouter } from 'react-router-dom';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#permaneo-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById('permaneo-content')?.focus();
      }}>Pular para o conteúdo principal</a>
      <main id="permaneo-content" tabIndex={-1} className={styles.appRoot}>
        <HashRouter><PermaneoPage /></HashRouter>
      </main>
    </>
  );
}
