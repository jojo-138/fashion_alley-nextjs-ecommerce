import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/Dropdown.module.css';

const Dropdown = ({ name, parent, active, empty, handleClick, children }) => {
  const [showContent, setShowContent] = useState(false);
  const { push } = useRouter();

  const handleDropdownClick = () => {
    if (parent === 'navbar' || parent === 'invoice') return;
    setShowContent(!showContent);
  };

  const handleProfileClick = () => push('/login');

  return (
    <div
      className={`${
        parent === 'navbar'
          ? styles.containerNav
          : parent === 'sidePanel'
          ? styles.containerSidePanel
          : parent === 'productView'
          ? styles.containerProduct
          : parent === 'productCatalog'
          ? styles.containerCatalog
          : parent === 'invoice'
          ? styles.containerInvoice
          : undefined
      } ${name === 'profile' ? styles.profileIcon : undefined}`}>
      <button
        type='button'
        aria-label={`${name} dropdown`}
        className={styles.btn}
        onClick={empty ? handleProfileClick : handleClick ? handleClick : handleDropdownClick}>
        {name === 'profile' ? <FontAwesomeIcon icon={faUser} /> : name}
        {parent !== 'navbar' && (
          <FontAwesomeIcon
            icon={!showContent ? faPlus : faMinus}
            className={styles.icon}
          />
        )}
      </button>
      {!empty && (
        <div
          className={`${styles.content} ${
            name === 'clothing' && parent === 'navbar'
              ? styles.long
              : name === 'profile'
              ? styles.short
              : undefined
          } ${showContent || active ? styles.active : undefined}`}>
          <div
            className={name === 'clothing' && parent === 'navbar' ? styles.contentWrap : undefined}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
