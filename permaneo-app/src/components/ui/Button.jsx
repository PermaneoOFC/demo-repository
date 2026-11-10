import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
