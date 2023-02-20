export default function groupFilters(filters) {
  const filterArr = [];
  let filterObj = {};

  filters.forEach((filter, i) => {
    if (!filterObj.name) {
      filterObj.name = filter.name;
      filterObj.values = [filter.value];
    } else if (filterObj.name === filter.name) {
      filterObj.values?.push(filter.value);
    } else {
      filterArr.push(filterObj);
      filterObj = { name: filter.name, values: [filter.value] };
    }

    if (i === filters.length - 1) filterArr.push(filterObj);
  });

  return filterArr;
}
