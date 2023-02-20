import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import filtersFromQuery from 'lib/filterFromQuery';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import styles from 'styles/product/ProductCatalog.module.css';

const ProductCatalog = ({ title, products, filters }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState({});

  const { query, pathname } = useRouter();
  const isProductsEmpty = !products.length;

  useEffect(() => {
    setSelectedFilters({});
  }, [query.name, query.cat, query.input]);

  useEffect(() => {
    const queryFilters = filtersFromQuery(query);
    setSelectedFilters(queryFilters);
  }, [query]);

  useEffect(() => {
    if (JSON.stringify(selectedFilters) === '{}') {
      return setFilteredProducts(products);
    }

    const filtered = products.filter((item) => {
      const { filters } = item;
      let result;

      for (let key in selectedFilters) {
        result = selectedFilters[key].includes(filters[key]);
        if (!result) return result;
      }

      return result;
    });

    setFilteredProducts(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  return (
    <div
      className={styles.container}
      style={{
        marginBottom: !filteredProducts.length
          ? '43rem'
          : filteredProducts.length < 5
          ? '25rem'
          : '3rem',
      }}>
      <h2 className={styles.title}>{title}</h2>
      <ProductFilters
        filters={filters}
        selectedFilters={(filters) => setSelectedFilters(filters)}
      />
      <div className={styles.gridContainer}>
        {isProductsEmpty && pathname === '/search/[input]' ? (
          <h4>
            Your search &lsquo;{query.search}&rsquo; did not match any products.
            <br />
            Try a more general term or check spelling.
          </h4>
        ) : isProductsEmpty && pathname !== '/search/[input]' ? (
          <h4>
            No available products under this category or catalog.
            <br />
            Try another category or catalog.
          </h4>
        ) : !filteredProducts.length ? (
          <h4>No item matched! Please try other filter options.</h4>
        ) : (
          filteredProducts.map((product, i) => (
            <div
              key={i}
              className={styles.gridItem}>
              <ProductCard
                product={product}
                priority={i < 4}
                sizes='(max-width: 540px) 49vw,
                        (max-width: 940px) 32vw,
                        23.5vw'
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
