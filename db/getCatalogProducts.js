import { query } from '.';
import catalogProductsText from './queries/catalogProductsText';
import formatProducts from './lib/formatProducts';

export default async function getCatalogProducts(catalog, limit) {
  const products = await query(
    catalogProductsText(
      catalog === 'New-Arrivals' ? 'created_at' : 'inventory',
      catalog === 'New-Arrivals' ? 'desc' : 'asc',
      catalog === 'Sale' ? 'inner' : 'left'
    ),
    [limit]
  );

  products.forEach(formatProducts);

  return products;
}
