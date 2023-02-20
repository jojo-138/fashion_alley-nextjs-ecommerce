import Head from 'next/head';
import { query } from 'db';
import getFilters from 'db/getFilters';
import { searchProductsText } from 'db/queries/searchProductsText';
import formatProducts from 'db/lib/formatProducts';
import ProductCatalog from 'components/product/ProductCatalog';

export const getStaticPaths = async () => {
  const inputs = ['mini dress', 'black shirt', 'bodycon'];

  const paths = inputs.map((input) => ({ params: { input } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { input } = params;
  const filters = await getFilters('Womens');
  const products = await query(searchProductsText, [input]);

  products.forEach(formatProducts);

  return {
    props: { products, input, filters },
    revalidate: 10,
  };
};

const Search = ({ products, input, filters }) => {
  return (
    <>
      <Head>
        <title>Fashion Alley | Search</title>
      </Head>
      <ProductCatalog
        title={`Results for ${input || '[none]'}`}
        products={products}
        filters={filters}
      />
    </>
  );
};

export default Search;
