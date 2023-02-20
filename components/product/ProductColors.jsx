import Link from 'next/link';
import { slugSubstring } from 'lib/utils';
import { colorsHex } from '/constants';
import styles from 'styles/product/ProductColors.module.css';

const ProductCatalogColors = ({
  colors,
  withLinks,
  width,
  gap,
  align,
  selectedColor,
  handleColorClick,
}) => {
  const colorBtn = (color, i) => (
    <div
      key={i}
      onClick={() => !withLinks && handleColorClick(color)}
      className={`${styles.color} ${selectedColor === color ? styles.active : undefined}`}
      title={color}
      style={{
        backgroundColor: colorsHex[color],
        width: width,
      }}
    />
  );

  return (
    <div
      className={styles.container}
      style={{ justifyContent: align, gap }}>
      {colors.map((item, i) => {
        return withLinks ? (
          <Link
            key={i}
            href={`/products/${item.slug}&slug=${slugSubstring(item.slug)}`}>
            {colorBtn(item.color)}
          </Link>
        ) : (
          colorBtn(item, i)
        );
      })}
    </div>
  );
};

export default ProductCatalogColors;
