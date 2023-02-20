import Stripe from 'stripe';
import { getClient, query } from 'db';

export default async function postPayment(sessionId, userId) {
  const sessionExists = await query(`select id from session_archive where session_id = $1`, [
    sessionId,
  ]);

  if (!sessionExists[0]) {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const client = await getClient();

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const itemIdQuantityPairs = JSON.parse(session.metadata.item_ids_quantity);

      await client.query('BEGIN');

      for (let pair of itemIdQuantityPairs) {
        await client.query(`update product_items set inventory = inventory - $1 where id = $2`, [
          pair[1],
          pair[0],
        ]);
      }

      await client.query(`delete from carts where user_id = $1`, [userId]);
      await client.query(`insert into carts (user_id) values ($1)`, [userId]);
      await client.query(`insert into session_archive (session_id) values ($1)`, [sessionId]);
      await client.query('COMMIT');

      return 'Thanks for your order!/nCheck your email inbox for the receipt.';
    } catch (err) {
      await client.query('ROLLBACK');

      console.log(err.message);

      return err.message.includes('No such checkout.session')
        ? 'Invalid session ID./nYou will be redirected to the home page in 5 seconds.'
        : 'Error resetting cart. Refresh and try again./nRest assured; your recent transaction will not be reprocessed.';
    } finally {
      client.release();
    }
  } else {
    return 'Transaction / session has already been processed./nYou will be redirected to the home page in 5 seconds.';
  }
}
