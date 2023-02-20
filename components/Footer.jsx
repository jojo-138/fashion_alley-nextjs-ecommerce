import Link from 'next/link';
import { footerLinks } from '/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import styles from 'styles/Footer.module.css';

const socials = [
  {
    name: 'Facebook',
    style: styles.facebook,
    icon: faFacebookF,
  },
  {
    name: 'Instagram',
    style: styles.instagram,
    icon: faInstagram,
  },
  {
    name: 'Pinterest',

    style: styles.pinterest,
    icon: faPinterestP,
  },
  {
    name: 'Tiktok',
    style: styles.tiktok,
    icon: faTiktok,
  },
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.policies}>
        <b>Fashion Alley</b>
        <ul>
          {footerLinks.map((link, i) => (
            <li key={i}>
              <Link href='#!'>{link}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.contacts}>
        <b>Contact Us</b>
        <ul>
          <li className={styles.email}>
            <Link href='#!'>{'f_alley@gmail.com'}</Link>
          </li>
          <li>{'(697) 709-2494'}</li>
          <li>{'1519 Oliver Street'}</li>
          <li>{'Roanoke, TX 76262'}</li>
        </ul>
      </div>
      <div>
        <b>Socials</b>
        <div className={styles.socialIcons}>
          {socials.map(({ name, style, icon }, i) => (
            <button
              key={i}
              aria-label={name}>
              <FontAwesomeIcon
                icon={icon}
                className={style}
              />
            </button>
          ))}
        </div>
      </div>
      <p className={styles.madeBy}>
        Made by{' '}
        <Link href='https://github.com/jojo-138'>
          <b>
            <u>Jojo</u>
          </b>
        </Link>
        .
      </p>
    </div>
  );
};

export default Footer;
