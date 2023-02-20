import bcrypt from 'bcrypt';
import { getClient } from 'db';
import { withSessionRoute } from 'lib/withSession';
import resMsg from 'lib/resMsg';
import saveSession from 'lib/saveSession';
import { emailRegEx, passwordInvalidMsg, passwordRegEx } from '/constants';

export default withSessionRoute(async function register(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).send(resMsg('error', 'Missing credentials.'));

    if (!emailRegEx.test(email))
      return res.status(400).send(resMsg('error', 'Invalid email address.'));

    if (!passwordRegEx.test(password))
      return res.status(400).send(resMsg('error', passwordInvalidMsg));

    // ~860ms to hash a password with length of 9
    const client = await getClient();

    try {
      const hash = await bcrypt.hash(password, 14);

      await client.query('BEGIN');

      const {
        rows: [{ id }],
      } = await client.query(
        'insert into users (first_name, last_name, email, hash) values ($1, $2, $3, $4) returning id',
        [firstName, lastName, email.toLowerCase(), hash]
      );

      await client.query('insert into carts (user_id) values ($1)', [id]);
      await client.query('insert into wishlists (user_id) values ($1)', [id]);
      await client.query('COMMIT');

      await saveSession(req, id);

      return res.send(resMsg('success', 'Registration complete.'));
    } catch (err) {
      await client.query('ROLLBACK');

      console.log(err.message);

      return err.message.includes('duplicate key')
        ? res.status(400).send(resMsg('error', 'Email address has been used. Try another.'))
        : res.status(500).send(resMsg('error', 'Server error occurred.'));
    } finally {
      client.release();
    }
  } else {
    res.status(405).end();
  }
});
