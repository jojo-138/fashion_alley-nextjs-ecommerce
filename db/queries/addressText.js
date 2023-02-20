export const otherAddressesText = `select a.id, a.street, a.unit, a.city, a.state, a.zip_code, a.country
from user_address ua
inner join address a on a.id = ua.address_id
left join (
  select default_address_id from users where id = $1
) as d on d.default_address_id = ua.address_id 
where ua.user_id  = $1 and d.default_address_id is null`;

export const defaultAddressText = `select a.id, a.street, a.unit, a.city, a.state, a.zip_code, a.country
from users u
inner join address a on a.id = u.default_address_id
where u.id = $1`;

export const insertAddressText = `with 
user_input as (
  select $1::text as street, $2::text as unit, $3:: text as city, $4:: text as state, $5:: text as country, $6:: text as zip_code
  ),
exists_in_address as (select id from address join user_input using (street, unit, city, state, country, zip_code)),
insert_into_address as (
   insert into address (street, unit, city, state, country, zip_code)
   select street, unit, city, state, country, zip_code
   from user_input
   where not exists (select id from exists_in_address)
   returning id
)

select id from insert_into_address
union all
select id from exists_in_address`;

export const insertToUserAddressText = `insert into user_address (user_id, address_id) 
values ($1, $2)`;

export const updateDefaultAddressText = `update users set default_address_id = $1 where id = $2`;

export const deleteFromUserAddressText = `delete from user_address
where user_id = $1 and address_id = $2`;

export const deleteDefaultAddressText = `update users set default_address_id = null where id = $1 and default_address_id = $2`;
