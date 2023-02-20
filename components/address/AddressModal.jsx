import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetchAPI from 'lib/fetchAPI';
import CloseIcon from 'components/CloseIcon';
import PanelLayout from 'components/PanelLayout';
import CustomInput from 'components/CustomInput';
import CustomSubmit from 'components/CustomSubmit';
import styles from 'styles/address/AddressModal.module.css';

const initialState = {
  editStreet: '',
  editCity: '',
  editState: '',
  editZipCode: '',
  editCountry: '',
};

const AddressModal = ({ editAddress, active, handleModal }) => {
  const [isLoading, setLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [address, setAddress] = useState({ ...initialState, editUnit: '' });
  const [errors, setErrors] = useState({ ...initialState, editForm: '' });

  const { reload } = useRouter();

  useEffect(() => {
    setAddress({
      editStreet: editAddress?.street,
      editUnit: editAddress?.unit,
      editCity: editAddress?.city,
      editState: editAddress?.state,
      editZipCode: editAddress?.zip_code,
      editCountry: editAddress?.country,
    });
    setErrors({ ...initialState, editForm: '' });
  }, [editAddress]);

  const handleChange = ({ target: { name, value } }) => setAddress({ ...address, [name]: value });

  const handleEraseClick = (id) => setAddress({ ...address, [id]: '' });

  const handleValidation = (name, value) => {
    switch (name) {
      case 'editStreet':
      case 'editCity':
      case 'editState':
      case 'editZipCode':
      case 'editCountry':
        setErrors({ ...errors, [name]: !value.length ? 'Please fill out the box above.' : '' });
        break;
      default:
        break;
    }
  };

  const handleInputFocus = (name) => setErrors({ ...errors, [name]: '', form: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { editStreet, editUnit, editCity, editState, editZipCode, editCountry } = address;

    if (!editStreet || !editCity || !editState || !editZipCode || !editCountry) {
      for (let key in address) {
        if (!address[key].length && key !== 'editUnit') return handleValidation(key, address[key]);
      }
    }

    for (let key in errors) {
      if (errors[key].length) return;
    }

    setLoading(true);

    fetchAPI('/api/address/edit', 'PUT', {
      originalAddressId: editAddress.id,
      address: {
        street: editStreet,
        unit: editUnit,
        city: editCity,
        state: editState,
        zip_code: editZipCode,
        country: editCountry,
      },
      isDefault,
    })
      .then(({ status, msg }) => {
        setLoading(false);
        if (status === 'success') reload();
        if (status === 'error') setErrors({ ...errors, form: msg });
      })
      .catch(() => {
        setLoading(false);
        setErrors({ ...errors, form: 'Unexpected error occurred. Try again.' });
      });
  };

  const { editStreet, editUnit, editCity, editState, editZipCode, editCountry } = address;
  const {
    editStreet: errStreet,
    editCity: errCity,
    editState: errState,
    editZipCode: errZipCode,
    editCountry: errCountry,
    editForm: errForm,
  } = errors;

  return (
    <PanelLayout
      height='auto'
      width='400px'
      boxShadow='-2rem 2rem 2rem var(--panel-shadow-color)'
      active={active}
      position='center'
      handleClick={handleModal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Edit Address</h2>
          <CloseIcon handleClick={handleModal} />
        </div>
        <form onSubmit={handleSubmit}>
          <CustomInput
            inputFor='editStreet'
            type='text'
            label='Street Address'
            value={editStreet ?? ''}
            error={errStreet}
            handleChange={handleChange}
            handleEraseClick={handleEraseClick}
            handleValidation={handleValidation}
            handleInputFocus={handleInputFocus}
          />
          <CustomInput
            inputFor='editUnit'
            type='text'
            label='Address #2 (unit, suite, etc.)'
            value={editUnit === 'none' || !editUnit ? '' : address?.editUnit}
            error=''
            handleChange={handleChange}
            handleEraseClick={handleEraseClick}
            handleValidation={handleValidation}
            handleInputFocus={handleInputFocus}
          />
          <CustomInput
            inputFor='editCity'
            type='text'
            label='City'
            value={editCity ?? ''}
            error={errCity}
            handleChange={handleChange}
            handleEraseClick={handleEraseClick}
            handleValidation={handleValidation}
            handleInputFocus={handleInputFocus}
          />
          <CustomInput
            inputFor='editState'
            type='text'
            label='State'
            value={editState ?? ''}
            error={errState}
            handleChange={handleChange}
            handleEraseClick={handleEraseClick}
            handleValidation={handleValidation}
            handleInputFocus={handleInputFocus}
          />
          <CustomInput
            inputFor='editZipCode'
            type='text'
            label='Zip Code'
            value={editZipCode ?? ''}
            error={errZipCode}
            handleChange={handleChange}
            handleEraseClick={handleEraseClick}
            handleValidation={handleValidation}
            handleInputFocus={handleInputFocus}
          />
          <CustomInput
            inputFor='editCountry'
            type='text'
            label='Country'
            value={editCountry ?? ''}
            error={errCountry}
            handleChange={handleChange}
            handleEraseClick={handleEraseClick}
            handleValidation={handleValidation}
            handleInputFocus={handleInputFocus}
          />

          <div className={styles.checkbox}>
            <input
              type='checkbox'
              id='default'
              name='default'
              value={isDefault}
              checked={isDefault}
              onChange={() => setIsDefault(!isDefault)}
            />
            Set as default address
          </div>
          <CustomSubmit
            isLoading={isLoading}
            value='Save Address'
            formError={errForm}
          />
        </form>
      </div>
    </PanelLayout>
  );
};

export default AddressModal;
