export default async function saveSession(req, id) {
  const user = { id };

  req.session.user = user;
  await req.session.save();
}
