import Head from 'next/head';
import Error from 'components/Error';

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>Fashion Alley | Error</title>
      </Head>
      <Error message='Check your internet connection before trying again.' />
    </>
  );
};

export default ErrorPage;
