import styles from './Modal.module.css';

export default function Modal({ children, onClose, labelledBy }) {
  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={handleOverlayMouseDown}
    >
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        {children}
      </section>
    </div>
  );
}
