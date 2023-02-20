import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import newArrivals from 'public/newArrivals.jpg';
import sale from 'public/sale.jpg';
import dress from 'public/dress.jpg';
import 'keen-slider/keen-slider.min.css';
import styles from 'styles/carousel/FeatureCarousel.module.css';

const features = [
  {
    src: newArrivals,
    alt: 'New Arrivals',
    link: '/New-Arrivals',
  },
  {
    src: sale,
    alt: 'Sale',
    link: '/Sale',
  },
  {
    src: dress,
    alt: 'Dress',
    link: '/category/Womens/Dresses',
  },
];

const FeatureCarousel = () => {
  const [opacities, setOpacities] = useState([]);
  const [idx, setIdx] = useState(0);
  const { push } = useRouter();
  const [sliderRef] = useKeenSlider(
    {
      slides: features.length,
      loop: true,
      drag: false,
      defaultAnimation: { duration: 2000 },
      detailsChanged(s) {
        const new_opacities = s.track.details.slides.map((slide) => slide.portion);
        setOpacities(new_opacities);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        const clearNextTimeout = () => {
          clearTimeout(timeout);
        };
        const nextTimeout = () => {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        };
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('slideChanged', () => setIdx(Math.abs(slider.animator.targetIdx) % 3));
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <div
      ref={sliderRef}
      className={`fader ${styles.fader}`}
      onClick={() => push(features[idx].link)}
      aria-label={features[idx].alt}>
      {features.map(({ src, alt }, i) => (
        <div
          className={`fader__slide ${styles.faderSlide}`}
          style={{ opacity: opacities[i] }}
          key={i}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={i === 0}
            sizes='(max-width: 1165px) 100vw, 1143px'
          />
        </div>
      ))}
    </div>
  );
};

export default FeatureCarousel;
