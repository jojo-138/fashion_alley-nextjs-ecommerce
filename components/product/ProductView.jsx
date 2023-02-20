import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import useCart from 'hooks/useCart';
import getDiscountedPrice from 'lib/getDiscountedPrice';
import fetchAPI from 'lib/fetchAPI';
import ProductDropDown from './ProductDropDown';
import ProductColors from './ProductColors';
import { shippingPolicy, returnPolicy, routerOptions } from '/constants';
import imgPlaceholder from 'public/img_placeholder.jpg';
import styles from 'styles/product/ProductView.module.css';

const ProductView = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [imgsShown, setImgsShown] = useState([imgPlaceholder, imgPlaceholder]);

  const { isReady, query, push, replace } = useRouter();
  const { key, setKey, cartId, cartItemCount, setCartItemCount } = useBetween(useCart);
  const { id, name, price, discount, description, details, colors, imgs, inventory } = product;

  useEffect(() => {
    if (isReady) {
      setSelectedColor(query.color);
      setSelectedSize(query.size);
      setImgsShown(imgs[query.color]);
      setSizes(inventory[query.color]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query.color, query.size]);

  useEffect(() => {
    if (sizes[selectedSize] === 0) {
      for (let size in sizes) {
        if (sizes[size] > 0) {
          replace({ query: { ...query, size, color: selectedColor } }, null, routerOptions);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes, selectedColor]);

  const handleColorClick = (color) =>
    color !== selectedColor && push({ query: { ...query, color } }, null, routerOptions);

  const handleSizeChange = ({ target: { value } }) =>
    replace({ query: { ...query, size: value } }, null, routerOptions);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cartId) return push('/login');

    fetchAPI('/api/cart/cart-item', 'POST', {
      cartId,
      productId: id,
      itemName: `${selectedSize} / ${selectedColor}`,
    })
      .then(({ status }) => {
        if (status === 'success') {
          setCartItemCount(cartItemCount + 1);
          setKey(key + 1);
        }
      })
      .catch(console.log);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.imgGallery}>
        {imgsShown.map((img, i) => (
          <li key={i}>
            <Image
              src={img}
              alt={name}
              fill
              sizes='(max-width: 600px) 100vw, 500px'
              priority={i < 1}
            />
          </li>
        ))}
      </ul>
      <div>
        <div className={styles.details}>
          <div>
            <h2>{name}</h2>
            <div>
              <p
                className={styles.price}
                style={{ textDecoration: discount && 'line-through' }}>
                {price}
              </p>
              <p className={styles.discount}>
                {discount && `$${getDiscountedPrice(price, discount)}`}
              </p>
            </div>
          </div>
          <ProductColors
            colors={colors}
            width='2rem'
            gap='1.5rem'
            align='center'
            selectedColor={selectedColor}
            handleColorClick={handleColorClick}
          />
          <form onSubmit={handleSubmit}>
            <div className={styles.sizeBtnWrap}>
              {Object.keys(sizes).map((size, i) => (
                <label
                  htmlFor={size}
                  className={
                    sizes[size] === 0
                      ? styles.invalid
                      : selectedSize === size
                      ? styles.checked
                      : undefined
                  }
                  key={i}>
                  <input
                    type='radio'
                    name='size'
                    value={size}
                    id={size}
                    checked={selectedSize === size}
                    disabled={sizes[size] === 0}
                    onChange={handleSizeChange}
                  />
                  {size}
                </label>
              ))}
            </div>
            <button
              type='submit'
              className={`${styles.addBtn} ${!selectedSize ? styles.invalid : undefined}`}
              disabled={!selectedSize}>
              Add to cart
            </button>
          </form>
          <p>{description}</p>
          <ProductDropDown
            name='details'
            content={details}
          />
          <ProductDropDown
            name='shipping policy'
            content={shippingPolicy}
          />
          <ProductDropDown
            name='return policy'
            content={returnPolicy}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
