import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import { useBetween } from 'use-between';
import useMediaQuery from 'hooks/useMediaQuery';
import useCart from 'hooks/useCart';
import fetchAPI from 'lib/fetchAPI';
import formatCartItems from 'lib/formatCartItems';
import CloseIcon from 'components/CloseIcon';
import PanelLayout from 'components/PanelLayout';
import CartItem from './CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/navbar/panels/cart/CartSidePanel.module.css';

const CartSidePanel = ({ user, handleCartClick, active }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState({
    cartId: null,
    subtotal: '0.00',
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mediaQ = useMediaQuery(540);
  const { setCartId, cartItemCount, setCartItemCount } = useBetween(useCart);
  const { replace } = useRouter();

  useEffect(() => {
    if (user?.id && !cart.cartId) {
      fetchAPI('/api/cart', 'POST')
        .then(({ cartId, items, subtotal }) => {
          setCart({ cartId: cartId, subtotal: subtotal.substring(1) });
          setCartId(cartId);

          const cartItemsArr = [];
          items.forEach((item) => {
            if (item.inventory < item.quantity) {
              fetchAPI('/api/cart/cart-item', 'PUT', {
                cartItemId: item.cart_item_id,
                quantity: 0,
              })
                .then(({ status }) => {
                  if (status === 'success') cartItemsArr.push({ ...item, quantity: 0 });
                })
                .catch(() => {
                  setError('Error updating quantity. Refresh and try again.');
                });
            } else {
              cartItemsArr.push(item);
            }
          });
          setCartItems(cartItemsArr);
        })
        .catch(() => {
          setError('Error loading cart. Refresh and try again.');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (cart.cartId) {
      const newSubtotal = !cartItems.length
        ? '0.00'
        : cartItems
            .reduce(
              (acc, curr) =>
                acc +
                parseFloat((curr.discount_price ? curr.discount_price : curr.price).substring(1)) *
                  curr.quantity,
              0
            )
            .toFixed(2);

      fetchAPI('/api/cart/subtotal', 'PUT', { cartId: cart.cartId, subtotal: newSubtotal })
        .then(({ status }) => {
          if (status === 'success') {
            setCart({ ...cart, subtotal: newSubtotal });
          }
        })
        .catch(() => setError('Error updating subtotal. Refresh and try again.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const handleQtyUpdate = useCallback(
    (cartItemId, qty, diff) => {
      fetchAPI('/api/cart/cart-item', 'PUT', { cartItemId, quantity: qty })
        .then(({ status }) => {
          if (status === 'success') {
            setCartItemCount(diff === 'add' ? cartItemCount + 1 : cartItemCount - 1);
            setCartItems((curr) =>
              curr.map((obj) => (obj.cart_item_id === cartItemId ? { ...obj, quantity: qty } : obj))
            );
          } else {
            setError('Error updating quantity. Refresh and try again.');
          }
        })
        .catch(() => setError('Error updating quantity. Refresh and try again.'));
    },
    [cartItemCount, setCartItemCount]
  );

  const handleRemoveItem = useCallback(
    (cartItemId) => {
      fetchAPI('/api/cart/cart-item', 'DELETE', { cartItemId })
        .then(({ status }) => {
          if (status === 'success') {
            setCartItems((curr) => curr.filter((obj) => obj.cart_item_id !== cartItemId));
            setCartItemCount(cartItemCount - 1);
          }
        })
        .catch(() => setError('Error deleting cart item. Refresh and try again.'));
    },
    [cartItemCount, setCartItemCount]
  );

  const redirectToStripe = async () => {
    if (!user?.id || !cartItems.length) return;

    setLoading(true);
    const items = formatCartItems(cartItems);
    const checkoutSession = await fetchAPI('/api/stripe/create-session', 'POST', {
      items,
    });
    setLoading(false);

    checkoutSession.url
      ? replace(checkoutSession.url)
      : setError('Something went wrong! Refresh and try again.');
  };

  return (
    <PanelLayout
      height='100%'
      width={mediaQ ? '95%' : '500px'}
      boxShadow='-6px 0 10px var(--panel-shadow-color)'
      position='right'
      active={active}
      handleClick={handleCartClick}>
      <div className={styles.container}>
        <header>
          <h1>Cart</h1>
          <CloseIcon handleClick={handleCartClick} />
        </header>
        {!user?.id ? (
          <h3>
            <Link
              href='/login'
              onClick={handleCartClick}>
              Log in
            </Link>{' '}
            to start ordering!
          </h3>
        ) : (
          <>
            <div className={styles.cartItems}>
              {!cartItems.length ? (
                <h3>
                  Your cart is empty.
                  <br />
                  <Link
                    href='/'
                    onClick={handleCartClick}>
                    Start shopping now!
                  </Link>
                </h3>
              ) : (
                <>
                  {cartItems.map((item, i) => (
                    <CartItem
                      item={item}
                      idx={i}
                      handleQtyUpdate={handleQtyUpdate}
                      handleRemoveItem={handleRemoveItem}
                      key={item.cart_item_id}
                    />
                  ))}
                </>
              )}
            </div>
            <div className={styles.subtotalCheckoutWrap}>
              <p className={styles.error}>{error}</p>
              <div className={styles.subtotal}>
                <p>Subtotal</p>
                <p>&#36; {cart.subtotal}</p>
              </div>
              <p>Shipping, taxes, and discount codes calculated at checkout.</p>
              <button
                onClick={redirectToStripe}
                disabled={!cartItems.length}>
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className={styles.spinner}
                    aria-label='Loading'
                  />
                ) : (
                  'Check Out'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </PanelLayout>
  );
};

export default CartSidePanel;
