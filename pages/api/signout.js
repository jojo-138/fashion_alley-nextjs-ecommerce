import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(function signout(req, res) {
  req.session.destroy();
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
  res.json({ status: 'success', msg: 'Signed out successfully.' });
});
