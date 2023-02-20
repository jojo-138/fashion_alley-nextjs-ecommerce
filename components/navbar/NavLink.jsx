import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from 'styles/navbar/NavLink.module.css';

const NavLink = ({ path, pgName, handleClick, sideBar }) => {
  const { query, pathname } = useRouter();

  return (
    <Link
      href={path}
      className={`${sideBar ? styles.sideNavLink : styles.navLink} ${
        `/${query.cat ? query.cat : pathname === '/' && ''}` === path && styles.active
      }`}>
      <div onClick={handleClick}>{pgName}</div>
    </Link>
  );
};

export default NavLink;
