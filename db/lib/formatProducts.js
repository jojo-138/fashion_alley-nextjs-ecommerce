export default function formatProducts(item) {
  item.color_slugs = item.color_slugs.split(', ');
  item.thumbnails = item.thumbnails.split(', ');
  item.filters = item.filters.split(', ');

  item.colors = item.colors.split(', ').map((color) => ({
    color: color,
    slug: item.color_slugs
      .filter((slug) => slug.includes(color.includes(' ') ? color.replace(' ', '+') : color))
      .join(),
  }));

  item.thumbnails = {
    front: item.thumbnails[0],
    back: item.thumbnails[1],
  };

  const filterObj = {};

  item.filters.forEach((item) => {
    const key = item.substring(0, item.indexOf(':'));
    if (!filterObj[key]) {
      filterObj[key] = item.substring(item.indexOf(': ') + 2);
    }
  });

  item.filters = filterObj;

  if (!item.slug) item.slug = item.color_slugs[0];

  delete item.color_slugs;
}
