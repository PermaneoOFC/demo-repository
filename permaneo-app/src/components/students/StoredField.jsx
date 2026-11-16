import styles from './StoredField.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.js';
export default function StoredField({ label, storageKey, initialValue, type = 'number' }) {
  const [value, setValue] = useLocalStorage('permaneo-field-' + storageKey, initialValue);
  return (
    <input
      className={styles.input}
      aria-label={label}
      type={type}
      min={type === 'number' ? 0 : undefined}
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
