import { query } from 'db';
import { addProductToCart } from 'db/queries/cartText';
import resMsg from 'lib/resMsg';

export default async function cartItem(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const { cartId, productId, itemName } = req.body;

    await query(addProductToCart, [cartId, productId, itemName]);

    return res.send(resMsg('success', 'Product item successfully added to cart.'));
  } else if (req.method === 'PUT') {
    const { cartItemId, quantity } = req.body;

    await query(`update cart_items set quantity = $1 where id = $2`, [quantity, cartItemId]);

    return res.send(resMsg('success', 'Product item quantity successfully updated.'));
  } else if (req.method === 'DELETE') {
    const { cartItemId } = req.body;

    await query(`delete from cart_items where id = $1`, [cartItemId]);

    return res.send(resMsg('success', 'Product item successfully deleted from cart.'));
  } else {
    return res.status(405).end();
  }
}
