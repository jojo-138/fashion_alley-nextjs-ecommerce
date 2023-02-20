import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/CustomSubmit.module.css';

const CustomSubmit = ({ isLoading, value, formError }) => {
  return (
    <>
      <span className={styles.spinnerWrap}>
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className={styles.spinner}
            aria-label='Loading'
          />
        ) : (
          <input
            type='submit'
            value={value}
          />
        )}
      </span>
      <p className={styles.error}>{formError}</p>
    </>
  );
};

export default CustomSubmit;
