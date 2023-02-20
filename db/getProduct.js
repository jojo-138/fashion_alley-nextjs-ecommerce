import { query } from '.';
import { inventoryText } from './queries/inventoryText';
import { productText } from './queries/productText';
import formatProductDesc from './lib/formatProductDesc';

export default async function getProduct(name) {
  name = name.replaceAll('-', ' ');

  const product = await query(productText, [name]);
  const size_inventory = await query(inventoryText, [product[0].id]);

  return formatProductDesc(product[0], size_inventory);
}
