import Head from 'next/head';
import { useRouter } from 'next/router';
import getProduct from 'db/getProduct';
import getProductNames from 'db/getProductNames';
import ProductView from 'components/product/ProductView';

export const getStaticPaths = async () => {
  const productNames = await getProductNames();

  const paths = productNames.map((name) => ({ params: { slug: name } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.slug);

  return {
    props: {
      product: product,
    },
    revalidate: 10,
  };
};

const Product = ({ product }) => {
  // added redundant slug query to all links directed to this page for cached .json files to work offline with SW.

  const { isFallback } = useRouter();

  return isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Head>
        <title>{`Fashion Alley | ${product.name}`}</title>
      </Head>
      <ProductView product={product} />
    </>
  );
};

export default Product;
