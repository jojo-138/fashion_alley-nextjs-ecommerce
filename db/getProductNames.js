import { query } from '.';

export default async function getProductNames() {
  const names = await query(
    `select replace(name, ' ', '-') as slugs from products order by created_at desc limit 100`
  );

  return names.map((item) => item.slugs);
}
