import Head from 'next/head';
import getFilters from 'db/getFilters';
import getCatalogProducts from 'db/getCatalogProducts';
import ProductCatalog from 'components/product/ProductCatalog';

export const getStaticPaths = async () => {
  const cat = ['New-Arrivals', 'Popular-Items', 'Sale'];

  const paths = cat.map((item) => ({ params: { cat: item } }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params: { cat } }) => {
  const products = await getCatalogProducts(cat, 24);
  const filters = await getFilters('Womens');

  return {
    props: { name: cat, products, filters },
    revalidate: 10,
  };
};

const Catalog = ({ name, products, filters }) => {
  const formattedCat = name.replaceAll('-', ' ');

  return (
    <>
      <Head>
        <title>{`Fashion Alley | ${formattedCat}`}</title>
      </Head>
      <ProductCatalog
        title={formattedCat}
        products={products}
        filters={filters}
      />
    </>
  );
};

export default Catalog;
