import styles from './Toggle.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.js';
export default function Toggle({ label, storageKey, initialValue = true }) {
  const [enabled, setEnabled] = useLocalStorage('permaneo-toggle-' + storageKey, initialValue);
  return (
    <button
      className={styles.toggle}
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={enabled}
      onClick={(e) => {
        e.stopPropagation();
        setEnabled((v) => !v);
      }}
    >
      <span />
    </button>
  );
}
