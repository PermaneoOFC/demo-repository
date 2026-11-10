import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './main.module.css';
import App from './App.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import './global.css';
import { initializeAccessibility } from './services/accessibility.js';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <div className={styles.mount}>
        <ErrorBoundary><App /></ErrorBoundary>
      </div>
    </React.StrictMode>,
  );

  // Os serviços opcionais não participam da montagem da aplicação React.
  window.setTimeout(() => {
    initializeAccessibility(import.meta.env.VITE_USERWAY_ACCOUNT_ID ?? 'csVkjYy3VL');
  }, 0);
}
