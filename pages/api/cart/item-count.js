import { query } from 'db';

export default async function itemCount(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const { cartId } = req.body;

    const [{ sum }] = await query(`select sum(quantity) from cart_items where cart_id = $1`, [
      cartId,
    ]);

    return res.send(parseInt(sum));
  } else {
    return res.status(405).end();
  }
}
