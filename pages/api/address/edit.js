import { getClient } from 'db';
import resMsg from 'lib/resMsg';
import { withSessionRoute } from 'lib/withSession';
import {
  deleteDefaultAddressText,
  deleteFromUserAddressText,
  insertAddressText,
  insertToUserAddressText,
  updateDefaultAddressText,
} from 'db/queries/addressText';

export default withSessionRoute(async function editAddress(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'PUT') {
    const userId = req.session.user.id;
    const {
      originalAddressId,
      address: { street, unit, city, state, country, zip_code },
      isDefault,
    } = req.body;

    if (!street || !city || !state || !country || !zip_code)
      return res.status(400).send(resMsg('error', 'Missing critical information.'));

    const client = await getClient();

    try {
      await client.query('BEGIN');

      const {
        rows: [{ id }],
      } = await client.query(insertAddressText, [
        street,
        !unit.length ? 'none' : unit,
        city,
        state,
        country,
        zip_code,
      ]);

      await client.query(deleteFromUserAddressText, [userId, originalAddressId]);

      const {
        rows: [{ default_address_id }],
      } = await client.query(`select default_address_id from users where id = $1`, [userId]);

      if (default_address_id === originalAddressId)
        await client.query(deleteDefaultAddressText, [userId, originalAddressId]);

      await client.query(insertToUserAddressText, [userId, id]);

      if (isDefault) {
        await client.query(updateDefaultAddressText, [id, userId]);
      }

      await client.query('COMMIT');

      return res.send(resMsg('success', 'Address successfully saved.'));
    } catch (err) {
      await client.query('ROLLBACK');

      console.log(err.message);

      return err.message.includes('user_address_pkey')
        ? res.status(400).send(resMsg('error', 'Address is currently registered to the user.'))
        : res.status(500).send(resMsg('error', 'Server error occurred.'));
    } finally {
      client.release();
    }
  } else {
    return res.status(405).end();
  }
});
