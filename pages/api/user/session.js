import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(function userSession(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    return req.session.user ? res.json(req.session.user) : res.json({ id: null });
  } else {
    return res.status(405).end();
  }
});
