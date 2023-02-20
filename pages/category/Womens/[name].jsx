import Head from 'next/head';
import getCategories from 'db/getCategories';
import getFilters from 'db/getFilters';
import getCategoryProducts from 'db/getCategoryProducts';
import ProductCatalog from 'components/product/ProductCatalog';

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.map((item) => ({ params: { name: item } }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params: { name } }) {
  const categoryName = name.includes('+') ? name.replace('+', ' ') : name;
  const products = await getCategoryProducts(categoryName);
  const filters = await getFilters(categoryName);

  return {
    props: { category: categoryName, products, filters },
    revalidate: 10,
  };
}

const WomensCategory = ({ category, products, filters }) => {
  return (
    <>
      <Head>
        <title>{`Fashion Alley | ${category}`}</title>
      </Head>
      <ProductCatalog
        title={category}
        products={products}
        filters={filters}
      />
    </>
  );
};

export default WomensCategory;
