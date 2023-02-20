import Image from 'next/image';
import Link from 'next/link';
import { useState, memo } from 'react';
import { slugSubstring } from 'lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/navbar/panels/cart/CartItem.module.css';

const CartItem = ({ item, idx, handleQtyUpdate, handleRemoveItem }) => {
  const { cart_item_id, name, img, size, color, slug, price, discount_price, quantity, inventory } =
    item;

  const [qty, setQty] = useState(quantity);

  const updateQty = (change) => {
    if (change === 'increment') {
      if (qty + 1 <= inventory) {
        setQty(qty + 1);
        handleQtyUpdate(cart_item_id, qty + 1, 'add');
      }
    } else if (change === 'decrement') {
      setQty(qty - 1);
      qty - 1 > 0
        ? handleQtyUpdate(cart_item_id, qty - 1, 'minus')
        : handleRemoveItem(cart_item_id);
    } else {
      setQty(0);
      handleRemoveItem(cart_item_id);
    }
  };

  const iconBtns = (role) => (
    <button
      onClick={() => updateQty(role)}
      aria-label={role}>
      <FontAwesomeIcon
        icon={role === 'increment' ? faPlus : role === 'decrement' ? faMinus : faTrash}
        className={role === 'remove' ? styles.removeIcon : undefined}
      />
    </button>
  );

  return (
    <div className={styles.container}>
      <Link href={`/products/${slug}&slug=${slugSubstring(slug)}`}>
        <div className={`${styles.imgWrap} ${inventory === 0 ? styles.unavailable : undefined}`}>
          <Image
            src={img}
            alt={name}
            fill
            priority={idx < 3}
            sizes='(max-width: 460px) 70px, (max-width: 800px) 84px, 96px'
          />
        </div>
      </Link>
      <div className={`${styles.itemDetails} ${inventory === 0 ? styles.unavailable : undefined}`}>
        <Link href={`/products/${slug}&slug=${slugSubstring(slug)}`}>
          <p>
            <b>{name}</b>
          </p>
        </Link>
        <p>
          {size}, {color}
        </p>
        {inventory === 0 ? (
          <div className={styles.noStock}>
            <p>Out of Stock!</p>
            {iconBtns('remove')}
          </div>
        ) : (
          <>
            <p>
              <span className={discount_price ? styles.originalPrice : undefined}>{price}</span>{' '}
              <span className={styles.discountPrice}>{!discount_price ? '' : discount_price}</span>{' '}
              <span className={styles.inventory}>{inventory <= 10 && `${inventory} left!`}</span>
            </p>
            <div className={styles.quantityTotal}>
              <div className={styles.quantity}>
                <div className={styles.itemQty}>
                  {iconBtns('decrement')}
                  <input
                    aria-label='quantity'
                    value={qty}
                    readOnly
                  />
                  {iconBtns('increment')}
                </div>
                {iconBtns('remove')}
              </div>
              <p>
                &#36; {(qty * (discount_price ? discount_price : price).substring(1)).toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CartItem);
