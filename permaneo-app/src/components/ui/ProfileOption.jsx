import { Check } from 'lucide-react';
import styles from './ProfileOption.module.css';

export default function ProfileOption({ value, title, description, icon: Icon, selected, onSelect }) {
  return (
    <button className={`${styles.option} ${selected ? styles.selected : ''}`} type="button" role="radio" aria-checked={selected} onClick={() => onSelect(value)}>
      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
      <strong>{title}</strong>
      <span>{description}</span>
      <span className={styles.indicator} aria-hidden="true">{selected && <Check size={13} strokeWidth={3} />}</span>
    </button>
  );
}
