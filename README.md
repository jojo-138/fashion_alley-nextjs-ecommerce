# Fashion Alley - Fullstack Next.js E-commerce Site

## About The Project :thought_balloon:

---

<br />

This project is an e-commerce site built using Next.js for both front-end and back-end. Please check out [Technologies](#technologies-🔧) and [Features](#features-⚡) for more information.
<br>
The purpose of this project is to not only learn Next.js but also deepen my understanding about PostgreSQL, Server-side rendering, SEO, Service Workers / PWA, and Caching.
<br>
The design is made by me after surveying the UI of many different e-commerce sites.
<br>
Visit [Future Plans](#future-plans) section to see what I plan to add to this repo in the near future.

_Note: The products shown on this website is not my own creation. They are from another e-commerce site._

## Technologies :wrench:

---

<br />

- Next.js (React)
- Javascript
- Iron-session
- Stripe
- Google Places API
- PostgreSQL
- Bcrypt
- ESLint / Prettier
- Lighthouse

## Features :zap:

---

<br />

- Authentication using Iron-session
- PostgreSQL Full-text Search with weight and rank utilizing Materialized View
- Stripe Checkout, Invoice, and Customer API for checkout, payment, and order history
- Progressive Web Application using next-pwa
- Front-end and Back-end form validations for register and sign in
- Incremental Static Site Generation for product pages
- Static-site Generation for category and catalog pages
- Server-side Rendering for user-related pages
- Client-side Rendering for form submissions

## Stripe Checkout Test Card Information :credit_card:

---

<br />

```
Stripe Checkout Test Card Information:
- Card number: 4242 4242 4242 4242
- Expiration: Any future MM/YY
- CVC: Any 3-digit combo
```

## Screenshots :camera:

---

<br />

### Home Page

![Home Page](https://user-images.githubusercontent.com/101021415/220101112-9a52654b-1174-4a74-b287-0807e202ab66.PNG)

### Category Page

![Category Page](https://user-images.githubusercontent.com/101021415/220101120-877b6933-feeb-4451-afcc-bdd722a048f9.PNG)

### Search Page / Search Panel

![Search Page / Search Panel](https://user-images.githubusercontent.com/101021415/220101118-0cb4a25e-850a-47d0-90d6-83a6b2efef52.PNG)

### Side Navigation Panel

![Side Navigation Panel](https://user-images.githubusercontent.com/101021415/220101106-db402cf2-0b1b-43e3-ac88-664513ab2e22.PNG)

### Cart Panel

![Cart Panel](https://user-images.githubusercontent.com/101021415/220101108-c473b175-3b73-478e-9401-75e409c54527.PNG)

### Product Page

![Product Page](https://user-images.githubusercontent.com/101021415/220101110-ea287bb3-25d7-4fa2-a12c-8b20f836f7e9.PNG)

### Profile Page

![Profile Page](https://user-images.githubusercontent.com/101021415/220101102-83ede644-b0bb-4f84-833f-2daa631a550e.PNG)

### Address Page

![Address Page](https://user-images.githubusercontent.com/101021415/220101104-2395c645-2257-48c0-8e43-0b7dd996af83.PNG)

### Log In Page

![Log In Page](https://user-images.githubusercontent.com/101021415/220101116-0835a72e-8caa-4434-822d-0533773c76a4.PNG)

## Database Design :floppy_disk:

---

<br />

![Database Design](https://user-images.githubusercontent.com/101021415/220101115-b96e2561-71ac-411b-ba43-713be0b13c84.PNG)

## Issues

---

<br />

- Customer default address cannot be forwarded to Stripe Checkout as they do not offer pre-filled address on the first checkout.
- Address used during checkout process is currently not saved to the database under the user's account.
- Most links in the footer are dead-ended, as well as the 'Forgot Password?' link.
- Product descriptions an details are sample texts except for T-shirts and Blouses categories.

## Future Plans

---

<br />

- Change user default address based on latest invoice shipping address and move the previous default address to 'Other Addresses'
- Enable customer to create one or more wishlist collections
- Add comment / review section and rating for products
- Paginate catalog, category, and search pages
- Enable customer to change name and other credentials
- Add functionality to the 'Forgot Password?' link
- Testing using Jest
- Docker
