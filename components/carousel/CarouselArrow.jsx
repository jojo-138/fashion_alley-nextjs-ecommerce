import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/carousel/CarouselArrow.module.css';

const CarouselArrow = ({ direction, onArrowClick }) => {
  return (
    <div
      onClick={onArrowClick}
      className={styles.container}>
      <button aria-label={direction}>
        <FontAwesomeIcon
          icon={direction === 'left' ? faCircleChevronLeft : faCircleChevronRight}
          className={`${styles.arrow} ${
            direction === 'left' ? styles.arrowLeft : styles.arrowRight
          }`}
        />
      </button>
    </div>
  );
};

export default CarouselArrow;
