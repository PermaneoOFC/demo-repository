import HomeExperience from './HomeExperience.jsx';
import styles from './HomeDark.module.css';

export default function HomeDark(props) {
  return <div className={styles.screen}><HomeExperience {...props} /></div>;
}
