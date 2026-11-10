import { useId } from 'react';
import styles from './TextField.module.css';

export default function TextField({ as: Element = 'input', label, children, id, ...props }) {
  const generatedId = useId();
  const controlId = id || generatedId;

  return (
    <label className={styles.field} htmlFor={controlId}>
      <span>{label}</span>
      {Element === 'input' ? (
        <input className={styles.control} id={controlId} aria-label={label} {...props} />
      ) : (
        <Element className={styles.control} id={controlId} aria-label={label} {...props}>
          {children}
        </Element>
      )}
    </label>
  );
}
