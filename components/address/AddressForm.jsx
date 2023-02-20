import { useRouter } from 'next/router';
import { createRef, useEffect, useRef, useState } from 'react';
import fetchAPI from 'lib/fetchAPI';
import CustomInput from 'components/CustomInput';
import CustomSubmit from 'components/CustomSubmit';
import styles from 'styles/address/AddressForm.module.css';

const initialState = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
};

const AddressForm = () => {
  const [autocomplete, setAutocomplete] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [address, setAddress] = useState({ ...initialState, unit: '' });
  const [errors, setErrors] = useState({ ...initialState, form: '' });

  const inputRef = createRef();
  const autocompleteRef = useRef();

  const { reload } = useRouter();

  useEffect(() => {
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'us' },
      fields: ['address_components'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();

      let streetNum;
      let street;
      let city;
      let state;
      let zipCode;
      let country;

      place.address_components.forEach((item) => {
        switch (item.types[0]) {
          case 'street_number':
            streetNum = item.long_name;
            break;
          case 'route':
            street = item.short_name;
            break;
          case 'locality':
            city = item.long_name;
            break;
          case 'administrative_area_level_1':
            state = item.short_name;
            break;
          case 'postal_code':
            zipCode = item.short_name;
            break;
          case 'country':
            country = item.long_name;
            break;
          default:
            break;
        }
      });

      setAddress({
        ...address,
        street: `${streetNum} ${street}`,
        city,
        state,
        zipCode,
        country,
      });

      setErrors({ street: '', city: '', state: '', zipCode: '', country: '', form: '' });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    name === 'autocomplete' ? setAutocomplete(value) : setAddress({ ...address, [name]: value });

  const handleEraseClick = (id) =>
    id === 'autocomplete' ? setAutocomplete('') : setAddress({ ...address, [id]: '' });

  const handleValidation = (name, value) => {
    switch (name) {
      case 'street':
      case 'city':
      case 'state':
      case 'zipCode':
      case 'country':
        setErrors({ ...errors, [name]: !value.length ? 'Please fill out the box above.' : '' });
        break;
      default:
        break;
    }
  };

  const handleInputFocus = (name) => setErrors({ ...errors, [name]: '', form: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { street, city, state, zipCode, country } = address;

    if (!street || !city || !state || !zipCode || !country) {
      for (let key in address) {
        if (!address[key].length && key !== 'unit') return handleValidation(key, address[key]);
      }
    }

    for (let key in errors) {
      if (errors[key].length) return;
    }

    setLoading(true);

    fetchAPI('/api/address/save', 'POST', { address, isDefault })
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

  const { street, unit, city, state, zipCode, country } = address;
  const {
    street: errStreet,
    city: errCity,
    state: errState,
    country: errCountry,
    zipCode: errZipCode,
    form: errForm,
  } = errors;

  return (
    <div className={styles.container}>
      <CustomInput
        inputFor='autocomplete'
        type='text'
        label='Enter Address'
        value={autocomplete}
        error=''
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleInputFocus={handleInputFocus}
        ref={inputRef}
      />
      <form onSubmit={handleSubmit}>
        <CustomInput
          inputFor='street'
          type='text'
          label='Street Address'
          value={street}
          error={errStreet}
          handleChange={handleChange}
          handleEraseClick={handleEraseClick}
          handleValidation={handleValidation}
          handleInputFocus={handleInputFocus}
        />
        <CustomInput
          inputFor='unit'
          type='text'
          label='Address #2 (unit, suite, etc.)'
          value={unit}
          error=''
          handleChange={handleChange}
          handleEraseClick={handleEraseClick}
          handleValidation={handleValidation}
          handleInputFocus={handleInputFocus}
        />
        <CustomInput
          inputFor='city'
          type='text'
          label='City'
          value={city}
          error={errCity}
          handleChange={handleChange}
          handleEraseClick={handleEraseClick}
          handleValidation={handleValidation}
          handleInputFocus={handleInputFocus}
        />
        <CustomInput
          inputFor='state'
          type='text'
          label='State'
          value={state}
          error={errState}
          handleChange={handleChange}
          handleEraseClick={handleEraseClick}
          handleValidation={handleValidation}
          handleInputFocus={handleInputFocus}
        />
        <CustomInput
          inputFor='zipCode'
          type='text'
          label='Zip Code'
          value={zipCode}
          error={errZipCode}
          handleChange={handleChange}
          handleEraseClick={handleEraseClick}
          handleValidation={handleValidation}
          handleInputFocus={handleInputFocus}
        />
        <CustomInput
          inputFor='country'
          type='text'
          label='Country'
          value={country}
          error={errCountry}
          handleChange={handleChange}
          handleEraseClick={handleEraseClick}
          handleValidation={handleValidation}
          handleInputFocus={handleInputFocus}
        />

        <div className={styles.checkbox}>
          <input
            type='checkbox'
            id='defaultAddress'
            name='default'
            value={isDefault}
            checked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
          />
          <label htmlFor='defaultAddress'>Set as default address</label>
        </div>
        <CustomSubmit
          isLoading={isLoading}
          value='Save Address'
          formError={errForm}
        />
      </form>
    </div>
  );
};

export default AddressForm;
