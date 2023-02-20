import Link from 'next/link';
import Dropdown from '../Dropdown';
import { clothing } from '/constants';

const ClothingDropdown = ({ parent, handleClick }) => {
  return (
    <Dropdown
      name='clothing'
      parent={parent}>
      {clothing.map((col, i) => (
        <div key={i}>
          <Link
            href={col.title.slug}
            onClick={handleClick && handleClick}>
            <b>{col.title.name}</b>
          </Link>
          <ul aria-label={col.title.name}>
            {col.categories.map((category, i) => (
              <Link
                href={category.slug}
                onClick={handleClick && handleClick}
                key={i}>
                <li>{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </Dropdown>
  );
};

export default ClothingDropdown;
