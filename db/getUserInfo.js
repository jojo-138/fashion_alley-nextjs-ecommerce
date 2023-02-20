import { query } from 'db';

export default async function getUserInfo(id) {
  const [userInfo] = await query(
    `select u.first_name, u.last_name, u.customer_id, a.street, a.unit, a.city, a.state, a.country, a.zip_code
    from users u
    left join address a on a.id = u.default_address_id
    where u.id = $1`,
    [id]
  );

  return userInfo;
}
