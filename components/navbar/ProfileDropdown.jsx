import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchAPI from 'lib/fetchAPI';
import Dropdown from '../Dropdown';

const ProfileDropdown = ({ user }) => {
  const { reload } = useRouter();

  const handleSignOut = () => {
    fetchAPI('/api/signout')
      .then((data) => {
        if (data.status === 'success') reload();
      })
      .catch(console.log);
  };

  return (
    <Dropdown
      name='profile'
      parent='navbar'
      empty={!user?.id && true}>
      <ul aria-label='Profile Dropdown'>
        <li>
          <Link href='/profile'>View Profile</Link>
        </li>
        <li>
          <Link href={`/add-change-address`}>Add / Change Default Address</Link>
        </li>
        <li onClick={handleSignOut}>Sign Out</li>
      </ul>
    </Dropdown>
  );
};

export default ProfileDropdown;
