import Head from 'next/head';
import Stripe from 'stripe';
import getUserInfo from 'db/getUserInfo';
import { withSessionSsr } from 'lib/withSession';
import formatInvoices from 'lib/formatInvoices';
import AccountDetails from 'components/profile/AccountDetails';
import OrderHistory from 'components/profile/OrderHistory';

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (!user) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        name: '',
        address: {},
      },
    };
  }

  const userInfo = await getUserInfo(user.id);
  const { first_name, last_name, customer_id, street, unit, city, state, country, zip_code } =
    userInfo;

  let invoices = [];

  if (customer_id) {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const { data } = await stripe.invoices.list({
      customer: customer_id,
      status: 'paid',
    });

    invoices = formatInvoices(data);
  }

  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  return {
    props: {
      name: `${first_name} ${last_name}`,
      address: { street, unit, city, state, country, zipCode: zip_code },
      invoices: invoices,
    },
  };
});

const Profile = ({ name, address, invoices }) => {
  return (
    <>
      <Head>
        <title>Fashion Alley | Profile</title>
      </Head>
      <h1>My Account</h1>
      <div>
        <AccountDetails
          name={name}
          address={address}
        />
        <OrderHistory invoices={invoices} />
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
          margin-block: 4rem 3rem;
        }
        div {
          display: flex;
          gap: 1.5rem;
          justify-content: space-between;
        }
        @media (max-width: 1130px) {
          h1 {
            margin-block: 3rem 1rem;
          }
          div {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Profile;
