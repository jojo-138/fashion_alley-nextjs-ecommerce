import { query } from '.';
import { searchProductsText } from './queries/searchProductsText';
import formatProducts from './lib/formatProducts';

export default async function getSearchProducts(input) {
  const products = await query(searchProductsText, [input]);

  products.forEach(formatProducts);

  return products;
}
