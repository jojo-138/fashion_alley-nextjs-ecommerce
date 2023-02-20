import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/CustomInput.module.css';

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(
  (
    {
      inputFor,
      type,
      label,
      value,
      error,
      handleChange,
      handleEraseClick,
      handleValidation,
      handleInputFocus,
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        <label htmlFor={inputFor}>{`${label}:`}</label>
        <div className={`${styles.inputContainer} ${error.length ? styles.invalid : undefined}`}>
          <input
            type={type}
            id={inputFor}
            name={inputFor}
            value={value}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleValidation && handleValidation(inputFor, value)}
            onFocus={() => handleInputFocus && handleInputFocus(inputFor)}
            className={error.length ? styles.invalid : undefined}
            ref={ref}
          />
          {value !== '' && (
            <span onClick={() => handleEraseClick(inputFor)}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                aria-label='Delete input'
              />
            </span>
          )}
        </div>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }
);

export default CustomInput;
