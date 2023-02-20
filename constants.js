//navbar
export const navLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'New Arrivals',
    path: '/New-Arrivals',
  },
  {
    name: 'Popular Items',
    path: '/Popular-Items',
  },
  {
    name: 'Sale',
    path: '/Sale',
  },
];

export const clothingCols = [
  {
    title1: {
      name: 'Tops',
      slug: '/category/Womens/Tops',
    },
    categories1: [
      { name: 'T-shirts', slug: '/category/Womens/T-shirts' },
      { name: 'Blouses', slug: '/category/Womens/Blouses' },
      { name: 'Crop Tops', slug: '/category/Womens/Crop+Tops' },
    ],
    title2: {
      name: 'Outerwears',
      slug: '/category/Womens/Outerwears',
    },
    categories2: [
      { name: 'Sweaters', slug: '/category/Womens/Sweaters' },
      { name: 'Jackets', slug: '/category/Womens/Jackets' },
      { name: 'Cardigans', slug: '/category/Womens/Cardigans' },
      { name: 'Coats', slug: '/category/Womens/Coats' },
    ],
  },
  {
    title1: {
      name: 'Dresses',
      slug: '/category/Womens/Dresses',
    },
    categories1: [
      { name: 'Mini', slug: '/category/Womens/Dresses?Dress+Length=Mini' },
      { name: 'Midi', slug: '/category/Womens/Dresses?Dress+Length=Midi' },
      { name: 'Maxi', slug: '/category/Womens/Dresses?Dress+Length=Maxi' },
    ],
    title2: {
      name: 'Bottoms',
      slug: '/category/Womens/Bottoms',
    },
    categories2: [
      { name: 'Skirts', slug: '/category/Womens/Skirts' },
      { name: 'Shorts', slug: '/category/Womens/Shorts' },
      { name: 'Sweatpants', slug: '/category/Womens/Sweatpants' },
    ],
  },
  {
    title1: {
      name: 'Jeans',
      slug: '/category/Womens/Jeans',
    },
    categories1: [
      { name: 'Straight', slug: '/category/Womens/Jeans?Jean+Type=Straight' },
      { name: 'Mom', slug: '/category/Womens/Jeans?Jean+Type=Mom' },
      { name: 'Boyfriend', slug: '/category/Womens/Jeans?Jean+Type=Boyfriend' },
      { name: 'Skinny', slug: '/category/Womens/Jeans?Jean+Type=Skinny' },
    ],
  },
];

export const clothing = [
  {
    title: {
      name: 'Tops',
      slug: '/category/Womens/Tops',
    },
    categories: [
      { name: 'T-shirts', slug: '/category/Womens/T-shirts' },
      { name: 'Blouses', slug: '/category/Womens/Blouses' },
      { name: 'Crop Tops', slug: '/category/Womens/Crop+Tops' },
      { name: 'Sweaters', slug: '/category/Womens/Sweaters' },
    ],
  },
  {
    title: {
      name: 'Outerwears',
      slug: '/category/Womens/Outerwears',
    },
    categories: [
      { name: 'Jackets', slug: '/category/Womens/Jackets' },
      { name: 'Cardigans', slug: '/category/Womens/Cardigans' },
      { name: 'Coats', slug: '/category/Womens/Coats' },
    ],
  },
  {
    title: {
      name: 'Dresses',
      slug: '/category/Womens/Dresses',
    },
    categories: [
      { name: 'Mini', slug: '/category/Womens/Dresses?Dress+Length=Mini' },
      { name: 'Midi', slug: '/category/Womens/Dresses?Dress+Length=Midi' },
      { name: 'Maxi', slug: '/category/Womens/Dresses?Dress+Length=Maxi' },
    ],
  },
  {
    title: {
      name: 'Bottoms',
      slug: '/category/Womens/Bottoms',
    },
    categories: [
      { name: 'Skirts', slug: '/category/Womens/Skirts' },
      { name: 'Sweatpants', slug: '/category/Womens/Sweatpants' },
    ],
  },
  {
    title: {
      name: 'Jeans',
      slug: '/category/Womens/Jeans',
    },
    categories: [
      { name: 'Straight', slug: '/category/Womens/Jeans?Jean+Type=Straight' },
      { name: 'Mom', slug: '/category/Womens/Jeans?Jean+Type=Mom' },
      { name: 'Boyfriend', slug: '/category/Womens/Jeans?Jean+Type=Boyfriend' },
      { name: 'Skinny', slug: '/category/Womens/Jeans?Jean+Type=Skinny' },
    ],
  },
];

// Product View
export const shippingPolicy = [
  'Please allow 7 - 10 business days for your order to be processed.',
  'Read our full shipping policy here.',
];

export const returnPolicy = [
  'All items purchased within the last 30 days are eligible for returns.',
  'Receipt must be included in the return package.',
];

export const filters = [
  {
    category: 'product type',
    list: ['tops', 'bottoms', 'dresses', 'sweaters & cardigans', 'outerwears'],
  },
  {
    category: 'size',
    list: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
  },
  {
    category: 'color',
    list: ['white', 'black', 'grey', 'beige', 'cream', 'camo', 'pink', 'red', 'blue'],
  },
];

//router
export const routerOptions = {
  scroll: false,
  shallow: true,
};

//regEx
export const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegEx = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//invalid msg
export const passwordInvalidMsg =
  'Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character (., !, @, #, $, %, ^, &, *).';

export const colorsHex = {
  Brown: '#967969',
  Black: '#000000',
  White: '#ffffff',
  'Millenial Pink': '#f3cfc6',
  'Coral Pink': '#a95c68',
  Burgundy: '#800020',
  Beige: '#e8dcca',
  Grey: '#808080',
  'Army Green': '#3c421a',
  'Rose Pink': '#c21e56',
  'Dusty Pink': '#b77b82',
  'Rusty Brown': '#9e3c0e',
  'Royal Blue': '#0504aa',
  Blue: '#4682b4',
  Red: '#ff2d00',
  'Dark Blue': '#192841',
  'Light Blue': '#a7d2f5',
};

// footer
export const footerLinks = ['Shipping', 'Return Policy', 'Privacy Policy', 'Terms of Service'];
