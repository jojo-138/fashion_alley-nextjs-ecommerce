import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/navbar/DarkModeToggle.module.css';

const DarkModeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(null);
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

  const handleChange = () => setActiveTheme(inactiveTheme);

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('theme'));
    savedTheme ? setActiveTheme(savedTheme) : setActiveTheme('light');
  }, []);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    localStorage.setItem('theme', JSON.stringify(activeTheme));
  }, [activeTheme]);

  return (
    <div
      title={`Change to ${inactiveTheme} mode`}
      className={styles.toggle}
      role='checkbox'
      aria-checked={activeTheme === 'light' ? 'true' : 'false'}
      aria-label={`${activeTheme} mode on`}>
      <input
        type='checkbox'
        id='checkbox'
        onChange={handleChange}
        aria-label={`Change to ${inactiveTheme} mode`}
      />
      <label htmlFor='checkbox'>
        <FontAwesomeIcon
          icon={faMoon}
          className={styles.moon}
        />
        <FontAwesomeIcon
          icon={faSun}
          className={styles.sun}
        />
        <div className={styles.ball} />
      </label>
    </div>
  );
};

export default DarkModeToggle;
