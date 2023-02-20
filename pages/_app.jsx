import Head from 'next/head';
import Layout from 'components/Layout';
import ErrorBoundary from 'components/ErrorBoundary';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles/globals.css';

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
        <meta
          name='application-name'
          content='Fashion Alley'
        />
        <meta
          name='description'
          content='Fashion Alley is the authority on fashion & the go-to retailer for the latest trends, styles & the hottest deals. Shop dresses, tops, tees, leggings & more!'
        />
        <meta
          name='theme-color'
          content='#000000'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='shortcut icon'
          href='/favicon.ico'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='/manifest.json'
        />
        <link
          rel='mask-icon'
          href='/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <meta
          name='msapplication-TileColor'
          content='#00aba9'
        />
      </Head>
      <Layout>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </>
  );
};

export default MyApp;
