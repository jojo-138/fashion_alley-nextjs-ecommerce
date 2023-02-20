import { useRouter } from 'next/router';
import HighlightCarousel from 'components/carousel/HighlightCarousel';
import ProductCard from './ProductCard';
import styles from 'styles/product/ProductHighlights.module.css';

const ProductHighlights = ({ title, products, link }) => {
  const { push } = useRouter();

  return (
    <section className={styles.highlightSection}>
      <h1>{title}</h1>
      <HighlightCarousel>
        {products.map((product, i) => (
          <div
            key={i}
            className={`keen-slider__slide ${styles.keenSliderSlide}`}>
            <ProductCard
              product={product}
              priority={title === 'Newly Arrived' && i < 4}
              sizes='(max-width: 500px) 50vw,
                (max-width: 700px) 33vw, 25vw'
            />
          </div>
        ))}
      </HighlightCarousel>
      <button
        className={styles.viewBtn}
        onClick={() => push(link)}>
        View All
      </button>
    </section>
  );
};

export default ProductHighlights;
