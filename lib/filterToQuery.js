export default function filterToQuery(obj, push, query, catOrName) {
  const filterEntriesArr = Object.entries(obj);

  let filterQuery = {};

  filterEntriesArr.forEach((filter) => {
    filter[1].forEach((value) => {
      if (!filterQuery[filter[0]]) {
        filterQuery[filter[0]] = [value];
      } else {
        filterQuery[filter[0]].push(value);
      }
    });
  });

  let slug = {};

  if (catOrName === 'cat') {
    slug = { cat: query.cat };
  } else if (catOrName === 'name') {
    slug = { name: query.name };
  } else {
    slug = { input: query.input };
  }

  push({ query: { ...filterQuery, ...slug } }, null, {
    shallow: true,
  });
}
