import Stripe from 'stripe';
import { query } from 'db';
import { defaultAddressText } from 'db/queries/addressText';
import formatStripeItems from 'lib/formatStripeItems';
import shippingRate from 'lib/shippingRate';
import { withSessionRoute } from 'lib/withSession';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default withSessionRoute(async function createSession(req, res) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  if (req.method === 'POST') {
    const { items } = req.body;
    const { id: userId } = req.session.user;

    try {
      const [{ first_name: firstName, last_name: lastName, customer_id: customerId }] = await query(
        `select first_name, last_name, customer_id from users where id = $1`,
        [userId]
      );

      let customer;

      if (!customerId) {
        const [defaultAddress] = await query(defaultAddressText, [userId]);
        const { street, unit, city, state, zip_code: zipCode, country } = defaultAddress ?? {};
        const nameAddress = {
          name: `${firstName} ${lastName}`,
          address: {
            line1: street ?? '',
            line2: unit === 'none' || !unit ? '' : unit,
            city: city ?? '',
            state: state ?? '',
            postal_code: zipCode ?? '',
            country: country ?? '',
          },
        };

        customer = await stripe.customers.create({
          ...nameAddress,
          shipping: {
            ...nameAddress,
          },
        });

        await query(`update users set customer_id = $1 where id = $2`, [customer.id, userId]);
      }

      const lineItems = formatStripeItems(items);

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout-success/{CHECKOUT_SESSION_ID}`,
        customer: customerId ? customerId : customer.id,
        customer_update: {
          address: 'auto',
          name: 'auto',
          shipping: 'auto',
        },
        shipping_address_collection: { allowed_countries: ['US'] },
        shipping_options: [
          { ...shippingRate(0, 'Free shipping', 7, 10) },
          { ...shippingRate(500, '3-5 business day shipping', 3, 5) },
          { ...shippingRate(1000, 'Next day shipping', 1, 1) },
        ],
        invoice_creation: {
          enabled: true,
          invoice_data: {
            metadata: {
              images: items.map((item) => item.img).join(', '),
              slugs: items.map((item) => item.slug).join(', '),
              desc: items.map((item) => item.desc).join(', '),
            },
          },
        },
        metadata: {
          item_ids_quantity: JSON.stringify(items.map((item) => [item.item_id, item.quantity])),
        },
      });

      return res.json({ url: session.url });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    return res.status(405).end();
  }
});
