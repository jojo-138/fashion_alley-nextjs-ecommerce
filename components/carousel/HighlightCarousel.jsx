import { useState } from 'react';
import CarouselArrow from './CarouselArrow';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from 'styles/carousel/HighlightCarousel.module.css';

const HighlightCarousel = ({ children }) => {
  const [currSlide, setCurrSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    initial: 0,
    slides: {
      perView: 4,
      spacing: 10,
    },
    breakpoints: {
      '(max-width: 900px)': {
        slides: {
          perView: 4,
          spacing: 5,
        },
      },
      '(max-width: 700px)': {
        slides: {
          perView: 3,
          spacing: 5,
        },
      },
      '(max-width: 500px)': {
        slides: {
          perView: 2,
          spacing: 5,
        },
      },
    },
    slideChanged(slider) {
      setCurrSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.navigationWrapper}>
        <div
          ref={sliderRef}
          className='keen-slider'>
          {children}
        </div>
        {loaded && instanceRef.current && (
          <>
            <CarouselArrow
              direction='left'
              onArrowClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            />
            <CarouselArrow
              direction='right'
              onArrowClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className={styles.dots}>
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map((i) => {
            return (
              <button
                key={i}
                aria-label={`card ${i + 1}`}
                className={`${styles.dot} ${currSlide === i && styles.active}`}
                onClick={() => {
                  instanceRef.current?.moveToIdx(i);
                }}></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HighlightCarousel;
