import useMediaQuery from 'hooks/useMediaQuery';
import PanelLayout from 'components/PanelLayout';
import NavLink from '../NavLink';
import CloseIcon from 'components/CloseIcon';
import ClothingDropdown from '../ClothingDropdown';
import { navLinks } from '/constants';

const NavSidePanel = ({ handleBurgerClick, active }) => {
  const mediaQ = useMediaQuery(312);

  return (
    <>
      <PanelLayout
        height='100%'
        width={mediaQ ? '92%' : '270px'}
        boxShadow='6px 6px 10px var(--panel-shadow-color)'
        position='left'
        active={active}
        handleClick={handleBurgerClick}>
        <div>
          <CloseIcon
            handleClick={handleBurgerClick}
            position='left'
          />
          {navLinks.map((navLink, i) => (
            <NavLink
              path={navLink.path}
              pgName={navLink.name}
              handleClick={handleBurgerClick}
              sideBar
              key={i}
            />
          ))}
          <ClothingDropdown
            parent='sidePanel'
            handleClick={handleBurgerClick}
          />
        </div>
      </PanelLayout>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          font-size: 1.4rem;
        }
      `}</style>
    </>
  );
};

export default NavSidePanel;
