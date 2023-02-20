import Head from 'next/head';
import FeatureCarousel from 'components/carousel/FeatureCarousel';
import ProductHighlights from 'components/product/ProductHighlights';
import getCatalogProducts from 'db/getCatalogProducts';

export const getServerSideProps = async ({ res }) => {
  const newArrivals = await getCatalogProducts('New-Arrivals', 8);
  const popular = await getCatalogProducts('Popular-Items', 8);
  const sale = await getCatalogProducts('Sale', 8);

  const highlights = [
    {
      title: 'Newly Arrived',
      products: newArrivals,
      link: '/New-Arrivals',
    },
    {
      title: 'Best Sellers',
      products: popular,
      link: '/Popular-Items',
    },
    {
      title: 'Clearance Items',
      products: sale,
      link: '/Sale',
    },
  ];

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=1440');

  return { props: { highlights } };
};

const Home = ({ highlights }) => {
  return (
    <>
      <Head>
        <title>Fashion Alley</title>
      </Head>
      <div style={{ marginBottom: '3rem' }}>
        <FeatureCarousel />
        {highlights.map(({ title, products, link }, i) => (
          <ProductHighlights
            title={title}
            products={products}
            link={link}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
