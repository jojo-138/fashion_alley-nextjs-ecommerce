import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import postPayment from 'db/postPayment';
import { withSessionSsr } from 'lib/withSession';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

export const getServerSideProps = withSessionSsr(async ({ req, res, params }) => {
  const user = req.session.user;

  if (!user) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        message: '',
      },
    };
  }

  const message = await postPayment(params.id, user.id);

  res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  return {
    props: {
      message,
    },
  };
});

const CheckoutSuccess = ({ message }) => {
  const { replace } = useRouter();

  useEffect(() => {
    if (message.includes('redirected to the home page')) {
      setTimeout(() => {
        replace('/');
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      <Head>
        <title>Fashion Alley</title>
      </Head>
      <section>
        <div>
          <span style={{ color: !message.includes('Thanks') && '#bf4123' }}>
            <FontAwesomeIcon icon={message.includes('Thanks') ? faCheck : faExclamation} />
          </span>
          <h2>{message.substring(0, message.indexOf('/n'))}</h2>
          <p>{message.substring(message.indexOf('/n') + 2)}</p>
        </div>
      </section>
      <style jsx>
        {`
          section {
            display: flex;
            justify-content: center;
          }
          div {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-top: 10vh;
            padding: 1rem 3rem;
            background-color: #d3d3d3;
            border-radius: 2rem;
          }
          span {
            font-size: 2rem;
            color: #008000;
            margin-bottom: 0.5rem;
          }
          h2 {
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default CheckoutSuccess;
