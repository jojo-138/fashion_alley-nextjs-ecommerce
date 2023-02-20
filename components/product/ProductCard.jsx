import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import getDiscountedPrice from 'lib/getDiscountedPrice';
import { slugSubstring } from 'lib/utils';
import ProductColors from './ProductColors';
import imgPlaceholder from 'public/img_placeholder.jpg';
import styles from 'styles/product/ProductCard.module.css';

const ProductCard = ({ product, priority, sizes }) => {
  const { name, thumbnails: img, price, discount, slug, colors } = product;
  const [imgs, setImgs] = useState({ front: imgPlaceholder, back: imgPlaceholder });

  useEffect(() => {
    if (img) setImgs(img);
  }, [img]);

  const productImg = (side) => (
    <Image
      src={side === 'front' ? imgs.front : imgs.back}
      alt={`${name} - ${side === 'front' ? 'Front' : 'Back'}`}
      className={side === 'front' ? styles.front : undefined}
      fill
      priority={priority}
      sizes={sizes}
    />
  );

  return (
    <>
      <Link href={`/products/${slug}&slug=${slugSubstring(slug)}`}>
        <div className={styles.img}>
          {productImg('back')}
          {productImg('front')}
        </div>
      </Link>
      <p className={styles.name}>
        <Link href={`/products/${slug}&slug=${slugSubstring(slug)}`}>{name}</Link>
      </p>
      <div>
        <p
          className={styles.price}
          style={{ textDecoration: discount && 'line-through' }}>
          {price}
        </p>
        <p className={styles.discount}>{discount && `$${getDiscountedPrice(price, discount)}`}</p>
      </div>
      <ProductColors
        colors={colors}
        withLinks
        width={'1.3rem'}
        gap='0.7rem'
      />
    </>
  );
};

export default ProductCard;
