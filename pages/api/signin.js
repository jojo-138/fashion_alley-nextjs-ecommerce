import bcrypt from 'bcrypt';
import { query } from 'db';
import { withSessionRoute } from 'lib/withSession';
import resMsg from 'lib/resMsg';
import saveSession from 'lib/saveSession';
import { emailRegEx, passwordInvalidMsg, passwordRegEx } from '/constants';

export default withSessionRoute(async function register(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send(resMsg('error', 'Missing credentials.'));

    if (!emailRegEx.test(email))
      return res.status(400).send(resMsg('error', 'Invalid email address.'));

    if (!passwordRegEx.test(password))
      return res.status(400).send(resMsg('error', passwordInvalidMsg));

    try {
      const [{ id, hash }] = await query('select id, hash from users where email = $1', [
        email.toLowerCase(),
      ]);

      const isMatched = await bcrypt.compare(password, hash);

      if (isMatched) {
        await saveSession(req, id);
        return res.send(resMsg('success', 'Signin successful.'));
      } else {
        // incorrect password
        return res.status(400).send(resMsg('error', 'Incorrect credentials. Try again.'));
      }
    } catch (err) {
      console.log(err.message);

      return err.message.includes("Cannot read properties of undefined (reading 'hash')")
        ? // incorrect email
          res.status(400).send(resMsg('error', 'Incorrect credentials. Try again.'))
        : res.status(500).send(resMsg('error', 'Server error occurred.'));
    }
  } else {
    res.status(405).end();
  }
});
