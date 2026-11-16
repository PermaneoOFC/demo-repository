import styles from './App.module.css';
import PermaneoPage from './pages/PermaneoPage.jsx';
import { HashRouter } from 'react-router-dom';

export default function App() {
  return (
    <main className={styles.appRoot}>
      <HashRouter><PermaneoPage /></HashRouter>
    </main>
  );
}
