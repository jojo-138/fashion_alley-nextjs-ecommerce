import { useState } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import fetchAPI from 'lib/fetchAPI';
import AddressFormat from './AddressFormat';
import EditDeleteIcons from './EditDeleteIcons';
import AddressModal from './AddressModal';

const Addresses = ({ addresses }) => {
  const [defaultAddress, setDefaultAddress] = useState(addresses.default);
  const [otherAddresses, setOtherAddresses] = useState(addresses.others);
  const [errors, setErrors] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editAddress, setEditAddress] = useState({});

  const mediaQ = useMediaQuery('600');

  const handleDelete = (id, isDefault = false) => {
    isDefault
      ? setDefaultAddress({})
      : setOtherAddresses(otherAddresses.filter((address) => address.id !== id));
    fetchAPI('/api/address/delete', 'DELETE', { addressId: id })
      .then(({ status, msg }) => {
        status === 'error' && setErrors(msg);
      })
      .catch(() => {
        setErrors('An unexpected error occurred. Refresh page.');
      });
  };

  const handleModal = (id, isDefault) => {
    setOpenModal(!openModal);
    isDefault
      ? setEditAddress(defaultAddress)
      : setEditAddress(otherAddresses.filter((address) => address.id === id)[0]);
  };

  return (
    <div style={{ width: mediaQ ? '100%' : '50%' }}>
      <h2>Addresses:</h2>
      {errors.length ? (
        <h4>{errors}</h4>
      ) : (
        <div>
          <div>
            <h3>Default:</h3>
            {JSON.stringify(defaultAddress) === '{}' ? (
              <h4>No default address saved.</h4>
            ) : (
              <div>
                <AddressFormat address={defaultAddress} />
                <EditDeleteIcons
                  id={defaultAddress.id}
                  isDefault
                  handleDelete={handleDelete}
                  handleModal={handleModal}
                />
              </div>
            )}
          </div>
          <div>
            {otherAddresses.length && (
              <>
                <h3>Other Addresses:</h3>
                {otherAddresses.map((address, i) => (
                  <div key={i}>
                    <div>
                      <AddressFormat address={address} />
                    </div>
                    <EditDeleteIcons
                      id={address.id}
                      handleDelete={handleDelete}
                      handleModal={handleModal}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <AddressModal
            editAddress={editAddress}
            active={openModal}
            handleModal={handleModal}
          />
        </div>
      )}
    </div>
  );
};

export default Addresses;
