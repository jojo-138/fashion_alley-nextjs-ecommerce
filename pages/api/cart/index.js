import { query } from 'db';
import { getCartItems } from 'db/queries/cartText';
import formatCartItems from 'db/lib/formatCartItems';
import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async function cart(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const userId = req.session.user.id;

    const [{ id, subtotal }] = await query(`select id, subtotal from carts where user_id = $1`, [
      userId,
    ]);

    const cartItems = await query(getCartItems, [id]);

    return res.send({
      cartId: id,
      items: formatCartItems(cartItems),
      subtotal: subtotal,
    });
  } else {
    return res.status(405).end();
  }
});
