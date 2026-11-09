import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './main.module.css';
import App from './App.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import './global.css';
import { initializeAccessibility } from './services/accessibility.js';

// Identificador público fornecido pelo painel UserWay do Permaneo.
initializeAccessibility(import.meta.env.VITE_USERWAY_ACCOUNT_ID ?? 'csVkjYy3VL');

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <div className={styles.mount}>
        <ErrorBoundary><App /></ErrorBoundary>
      </div>
    </React.StrictMode>,
  );
}
