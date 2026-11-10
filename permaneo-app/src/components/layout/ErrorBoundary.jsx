import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <section className={styles.error} role="alert">
        <h1>Não foi possível abrir esta tela.</h1>
        <p>O Permaneo encontrou um erro. Recarregue para tentar novamente.</p>
        <pre>{this.state.error.message}</pre>
        <button type="button" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
        <a href={window.location.pathname}>Voltar ao início</a>
      </section>
    );
  }
}
