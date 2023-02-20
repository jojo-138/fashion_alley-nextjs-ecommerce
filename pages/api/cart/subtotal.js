import { query } from 'db';
import resMsg from 'lib/resMsg';

export default async function cartSubtotal(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'PUT') {
    const { cartId, subtotal } = req.body;

    await query(`update carts set subtotal = $1 where id = $2`, [subtotal, cartId]);

    return res.send(resMsg('success', 'Subtotal successfully updated.'));
  } else {
    return res.status(405).end();
  }
}
