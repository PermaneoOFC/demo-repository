import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import StudentCard from './StudentCard.jsx';
import styles from './LocalStudents.module.css';
export default function LocalStudents({ students, onOpen, page }) {
  const [grid, setGrid] = useState(null);
  useEffect(() => {
    setGrid(null);
    const find = () => setGrid(document.querySelector('[data-name="Grade de estudantes"]'));
    find();
    const o = new MutationObserver(find);
    o.observe(document.getElementById('root'), { subtree: true, childList: true });
    return () => o.disconnect();
  }, [page]);
  return grid ? (
    createPortal(
      students.map((s) => <StudentCard key={s.id} student={s} onOpen={() => onOpen(s)} />),
      grid
    )
  ) : (
    <span className={styles.placeholder} />
  );
}
