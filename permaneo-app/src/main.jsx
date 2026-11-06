import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './main.module.css';
import App from './App.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import './global.css';

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
