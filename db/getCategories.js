import { query } from '.';

export default async function getCategories() {
  const categories = await query(
    `select name from categories where name <> 'Tops/Dresses' order by id`
  );

  return categories.map((item) => item.name);
}
