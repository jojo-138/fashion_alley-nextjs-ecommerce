import Head from 'next/head';

const fallback = () => (
  <>
    <Head>
      <title>Fashion Alley | Offline</title>
    </Head>
    <header>
      <div>
        <h1>
          You are accessing <u>Fashion Alley</u> offline.
        </h1>
        <p>This page will be loaded correctly when a network is available.</p>
      </div>
    </header>
    <style jsx>
      {`
        header {
          min-height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}
    </style>
  </>
);

export default fallback;
