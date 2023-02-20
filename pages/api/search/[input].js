import { query } from 'db';
import { searchProductsText } from 'db/queries/searchProductsText';
import formatProducts from 'db/lib/formatProducts';

export default async function search(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=1440');

  const { input } = req.query;
  const products = await query(searchProductsText, [input]);

  products.forEach(formatProducts);

  res.send(products);
}
