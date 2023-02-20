import { getClient } from 'db';
import resMsg from 'lib/resMsg';
import { withSessionRoute } from 'lib/withSession';
import {
  insertAddressText,
  insertToUserAddressText,
  updateDefaultAddressText,
} from 'db/queries/addressText';

export default withSessionRoute(async function saveAddress(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const userId = req.session.user.id;
    const {
      address: { street, unit, city, state, country, zipCode },
      isDefault,
    } = req.body;

    if (!street || !city || !state || !country || !zipCode)
      return res.status(400).send(resMsg('error', 'Missing critical information.'));

    const client = await getClient();

    try {
      await client.query('BEGIN');

      const { rows } = await client.query(insertAddressText, [
        street,
        !unit.length ? 'none' : unit,
        city,
        state,
        country,
        zipCode,
      ]);

      await client.query(insertToUserAddressText, [userId, rows[0].id]);

      if (isDefault) {
        await client.query(updateDefaultAddressText, [rows[0].id, userId]);
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
