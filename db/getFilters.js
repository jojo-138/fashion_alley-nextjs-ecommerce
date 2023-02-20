import { query } from '.';
import { filterText } from './queries/filtersText';
import groupFilters from './lib/groupFilters';

export default async function getFilters(category) {
  const filterRaw = await query(filterText, [category]);

  const filters = groupFilters(filterRaw);

  return filters;
}
