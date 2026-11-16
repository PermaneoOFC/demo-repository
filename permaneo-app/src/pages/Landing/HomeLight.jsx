import HomeExperience from './HomeExperience.jsx';
import styles from './HomeLight.module.css';

export default function HomeLight(props) {
  return <div className={styles.screen}><HomeExperience {...props} /></div>;
}
