import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import filterToQuery from 'lib/filterToQuery';
import filtersFromQuery from 'lib/filterFromQuery';
import Dropdown from '../Dropdown';
import styles from 'styles/product/ProductFilters.module.css';

const ProductFilters = ({ filters, selectedFilters }) => {
  const [selected, setSelected] = useState({});
  const [filterIdx, setFilterIdx] = useState(0);

  const { push, query } = useRouter();

  useEffect(() => {
    const queryFilters = filtersFromQuery(query);
    setSelected(queryFilters);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedFilters = selected;

    for (let key in formattedFilters)
      if (!formattedFilters[key].length) delete formattedFilters[key];

    filterToQuery(formattedFilters, push, query, query.cat ? 'cat' : query.name ? 'name' : 'input');

    selectedFilters(formattedFilters);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!selected[name]) selected[name] = [];

    selected[name].includes(value)
      ? setSelected({
          ...selected,
          [name]: selected[name]?.filter((el) => el !== value),
        })
      : setSelected({
          ...selected,
          [name]: [...selected[name], value],
        });
  };

  const formatFilters = (str) => str.replaceAll(' ', '-').toLowerCase();

  return (
    <Dropdown
      name='filter'
      parent='productCatalog'>
      <form onSubmit={handleSubmit}>
        <button
          type='button'
          className={styles.filterBtns}
          onClick={() => setSelected({})}>
          Clear All
        </button>
        {filters.map((filter, i) => (
          <Dropdown
            name={filter.name}
            parent='filter'
            active={i === filterIdx}
            handleClick={() => (i === filterIdx ? setFilterIdx(null) : setFilterIdx(i))}
            key={i}>
            <div className={styles.checkboxes}>
              {filter.values.map((item, i) => (
                <label
                  className={styles.checkbox}
                  key={i}>
                  {item}
                  <input
                    type='checkbox'
                    id={`${formatFilters(filter.name)}_${formatFilters(item)}`}
                    name={filter.name}
                    checked={selected[filter.name]?.includes(item)}
                    value={item}
                    onChange={handleChange}
                  />
                  <span className={styles.checkMark} />
                </label>
              ))}
            </div>
          </Dropdown>
        ))}
        <button
          type='submit'
          className={`${styles.filterBtns} ${styles.submitBtn}`}>
          Filter
        </button>
      </form>
    </Dropdown>
  );
};

export default ProductFilters;
