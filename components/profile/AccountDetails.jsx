import Link from 'next/link';
import styles from 'styles/profile/AccountDetails.module.css';

const AccountDetails = ({ name, address }) => {
  const { street, unit, city, state, country, zipCode } = address;

  return (
    <div className={styles.container}>
      <h2>Account Details</h2>
      <h3>{name}</h3>
      <div className={styles.address}>
        {street ? (
          <>
            <p>{`${street} ${unit === 'none' ? '' : unit}`}</p>
            <p>{`${city}, ${state} ${zipCode}`}</p>
            <p>{country}</p>
          </>
        ) : (
          <p>No default address saved. Click link below to add a default address.</p>
        )}
      </div>
      <Link href='add-change-address'>Add / Change Default Address</Link>
    </div>
  );
};

export default AccountDetails;
