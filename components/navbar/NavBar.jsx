import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import useCart from 'hooks/useCart';
import useUser from 'hooks/useUser';
import fetchAPI from 'lib/fetchAPI';
import NavLink from './NavLink';
import DarkModeToggle from './DarkModeToggle';
import NavSidePanel from './panels/NavSidePanel';
import CartSidePanel from './panels/cart/CartSidePanel';
import SearchTopPanel from './panels/SearchTopPanel';
import ClothingDropdown from './ClothingDropdown';
import ProfileDropdown from './ProfileDropdown';
import { navLinks } from '/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/navbar/NavBar.module.css';

const NavBar = () => {
  const [showTopPanel, setShowTopPanel] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  const user = useUser({ redirectTo: '' });
  const { key, cartId, cartItemCount, setCartItemCount } = useBetween(useCart);

  useEffect(() => {
    if (user?.id && cartId) {
      fetchAPI('/api/cart/item-count', 'POST', { cartId })
        .then((count) => setCartItemCount(count))
        .catch(console.log);
    }
  }, [user, cartId, setCartItemCount]);

  const handleCartClick = () => setShowRightPanel(!showRightPanel);
  const handleSearchClick = () => setShowTopPanel(!showTopPanel);
  const handleBurgerClick = () => setShowLeftPanel(!showLeftPanel);

  return (
    <div className={styles.navbar}>
      <Link href='/'>
        <div className={styles.pgName}>
          Fashion<span>Alley</span>
        </div>
      </Link>
      <div className={styles.navLinks}>
        {navLinks.map((navLink, i) => (
          <NavLink
            path={navLink.path}
            pgName={navLink.name}
            key={i}
          />
        ))}
        <ClothingDropdown parent='navbar' />
      </div>
      <div className={styles.navIcons}>
        <DarkModeToggle />
        <button
          className={showLeftPanel ? `${styles.navBurger} ${styles.active}` : styles.navBurger}
          title='View Navigation Sidebar'
          onClick={handleBurgerClick}>
          <div className={styles.burgerBar} />
          <div className={styles.burgerBar} />
          <div className={styles.burgerBar} />
        </button>
        <ProfileDropdown user={user} />
        <button
          aria-label='Search Fashion Alley'
          title='Search Fashion Alley'
          onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <button
          className={styles.cartWrap}
          title='View Cart'
          aria-label='View Cart'
          onClick={handleCartClick}>
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItemCount > 0 && (
            <div
              className={styles.cartItemCount}
              title={`${cartItemCount} items in the cart`}>
              {cartItemCount}
            </div>
          )}
        </button>
      </div>
      <CartSidePanel
        user={user}
        handleCartClick={handleCartClick}
        active={showRightPanel}
        key={key}
      />
      <SearchTopPanel
        handleSearchClick={handleSearchClick}
        active={showTopPanel}
      />
      <NavSidePanel
        handleBurgerClick={handleBurgerClick}
        active={showLeftPanel}
      />
    </div>
  );
};

export default NavBar;
