import { useState } from 'react';
import { useRouter } from 'next/router';
import PanelLayout from 'components/PanelLayout';
import CloseIcon from 'components/CloseIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/navbar/panels/SearchTopPanel.module.css';

const SearchTopPanel = ({ handleSearchClick, active }) => {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch('');
    handleSearchClick();
    push(`/search/${search}`);
  };

  return (
    <PanelLayout
      height='4rem'
      width='100%'
      boxShadow='6px 6px 10px var(--panel-shadow-color)'
      position='top'
      active={active}
      handleClick={handleSearchClick}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <button
            type='submit'
            aria-label='search'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type='text'
            placeholder='Search Fashion Alley...'
            id='search'
            name='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <CloseIcon handleClick={handleSearchClick} />
      </div>
    </PanelLayout>
  );
};

export default SearchTopPanel;
