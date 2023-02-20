export default function filtersFromQuery(query) {
  const queryFilters = {};

  for (let filter in query)
    if (filter !== 'name' && filter !== 'cat' && filter !== 'input')
      queryFilters[filter] = typeof query[filter] !== 'object' ? [query[filter]] : query[filter];

  return queryFilters;
}
