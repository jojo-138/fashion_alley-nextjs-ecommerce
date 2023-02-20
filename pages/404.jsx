import Head from 'next/head';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Fashion Alley | Page Not Found</title>
      </Head>
      <h1>
        404 <i>Page Not Found</i>
      </h1>
      <style jsx>
        {`
          h1 {
            text-align: center;
            margin-top: 20vh;
            letter-spacing: 0.4rem;
          }
          i {
            font-weight: 400;
          }
        `}
      </style>
    </>
  );
};

export default Custom404;
