import { getClient } from 'db';
import resMsg from 'lib/resMsg';
import { withSessionRoute } from 'lib/withSession';
import { deleteDefaultAddressText, deleteFromUserAddressText } from 'db/queries/addressText';

export default withSessionRoute(async function deleteAddress(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'DELETE') {
    const userId = req.session.user.id;
    const { addressId } = req.body;

    const client = await getClient();

    try {
      await client.query('BEGIN');
      await client.query(deleteFromUserAddressText, [userId, addressId]);
      await client.query(deleteDefaultAddressText, [userId, addressId]);
      await client.query('COMMIT');

      return res.send(resMsg('success', 'Address deleted successfully.'));
    } catch (err) {
      await client.query('ROLLBACK');

      console.log(err.message);

      return res.status(500).send(resMsg('error', 'Server error occurred.'));
    } finally {
      client.release();
    }
  } else {
    return res.status(405).end();
  }
});
