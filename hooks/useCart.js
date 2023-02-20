import { useState } from 'react';

export default function useCart() {
  const [key, setKey] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(null);

  return {
    key,
    setKey,
    cartId,
    setCartId,
    cartItemCount,
    setCartItemCount,
  };
}
