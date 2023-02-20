import Image from 'next/image';
import Link from 'next/link';
import { slugSubstring } from 'lib/utils';
import Dropdown from 'components/Dropdown';
import styles from 'styles/profile/Invoice.module.css';

const Invoice = ({ invoice }) => {
  const { number, amount_paid, lines, invoice_pdf, name, address, paid_at } = invoice;
  const { line1, line2, city, state, country, postal_code } = address;
  const paidAt = new Date(paid_at * 1000).toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.desc}>
        <div>
          <p className={styles.label}>Order placed</p>
          <p>{paidAt}</p>
        </div>
        <div>
          <p className={styles.label}>Total</p>
          <p>&#36;{(amount_paid / 100).toFixed(2)}</p>
        </div>
        <div>
          <p className={styles.label}>Ship to</p>
          <div className={styles.nameShipping}>
            <p>{name}</p>
            <Dropdown parent='invoice'>
              <p>{`${line1} ${line2 ?? ''}`}</p>
              <p>{`${city}, ${state} ${postal_code}`}</p>
              <p>{country}</p>
            </Dropdown>
          </div>
        </div>
        <div>
          <p className={styles.label}>Invoice # {number}</p>
          <Link href={invoice_pdf}>View PDF</Link>
        </div>
      </div>
      <ul>
        {lines.map(({ name, image, slug, desc }, i) => (
          <li
            key={i}
            className={styles.lineItems}>
            <Link href={`/products/${slug}&slug=${slugSubstring(slug)}`}>
              <div className={styles.imgWrap}>
                <Image
                  src={image}
                  alt={`${name} - ${desc}`}
                  fill
                  sizes='(max-width: 460px) 70px, (max-width: 800px) 84px, 96px'
                />
              </div>
            </Link>
            <div>
              <Link href={`/products/${slug}&slug=${slugSubstring(slug)}`}>
                <p>{name}</p>
              </Link>
              <br />
              <p>{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoice;
