import Script from 'next/script';
import Head from 'next/head';
import { useState } from 'react';
import { getDefaultAddress, getOtherAddresses } from 'db/getUserAddresses';
import { withSessionSsr } from 'lib/withSession';
import Addresses from 'components/address/Addresses';
import AddressForm from 'components/address/AddressForm';

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (!user) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        userId: null,
        addresses: {
          default: {},
          others: [],
        },
      },
    };
  }

  const defaultAddress = await getDefaultAddress(user.id);
  const otherAddresses = await getOtherAddresses(user.id);

  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  return {
    props: {
      addresses: {
        default: defaultAddress[0] || {},
        others: otherAddresses,
      },
    },
  };
});

const ChangeDefaultAddress = ({ addresses }) => {
  const [isAutocompleteReady, setAutocompleteReady] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState(false);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API_KEY}&libraries=places`}
        onReady={() => setAutocompleteReady(true)}
        onError={() => setAutocompleteError(true)}
      />
      <Head>
        <title>Fashion Alley | Add / Change Default Address</title>
      </Head>
      <h1>Add / Change Default Address</h1>
      <div>
        <Addresses addresses={addresses} />
        {isAutocompleteReady && <AddressForm />}
        {autocompleteError && <h3>Error loading Google API. Refresh page.</h3>}
      </div>
      <style jsx>{`
        div {
          position: relative;
          margin: 0 4rem 3rem;
          display: flex;
        }
        h1 {
          text-align: center;
          margin-block: 3rem;
        }
        @media (max-width: 800px) {
          div {
            margin: 0 2rem 1.5rem;
          }
          h1 {
            margin-block: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          div {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default ChangeDefaultAddress;
