import { useRouter } from 'next/router';
import { useState } from 'react';
import fetchAPI from 'lib/fetchAPI';
import CustomInput from '../CustomInput';
import CustomSubmit from '../CustomSubmit';
import { emailRegEx, passwordInvalidMsg, passwordRegEx } from '/constants';
import styles from 'styles/login/SigninRegister.module.css';

const initialState = {
  fName: '',
  lName: '',
  rEmail: '',
  rPassword: '',
  confirmPassword: '',
};

const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState({ ...initialState, form: '' });

  const { reload } = useRouter();

  const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

  const handleEraseClick = (id) => {
    setInputs({ ...inputs, [id]: '' });
    setErrors({ ...errors, [id]: '' });
  };

  const handleValidation = (name, value) => {
    switch (name) {
      case 'lName':
      case 'fName':
        setErrors({
          ...errors,
          [name]: value.length ? '' : `Enter ${name === 'fName' ? 'first' : 'last'} name.`,
        });
        break;
      case 'rEmail':
        setErrors({
          ...errors,
          rEmail: emailRegEx.test(value) ? '' : 'Invalid Email Address.',
        });
        break;
      case 'rPassword':
        setErrors({
          ...errors,
          rPassword: passwordRegEx.test(value) ? '' : passwordInvalidMsg,
        });
        break;
      case 'confirmPassword':
        setErrors({
          ...errors,
          confirmPassword: value === inputs.rPassword ? '' : 'Passwords do no match.',
        });
        break;
      default:
        break;
    }
  };

  const handleInputFocus = (name) => setErrors({ ...errors, [name]: '', form: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fName, lName, rEmail, rPassword } = inputs;

    if (!fName || !lName || !rEmail || !rPassword) {
      for (let key in inputs) {
        if (!inputs[key].length) return handleValidation(key, inputs[key]);
      }
    }

    for (let key in errors) {
      if (errors[key].length) return;
    }

    setLoading(true);

    fetchAPI('/api/register', 'POST', {
      firstName: fName,
      lastName: lName,
      email: rEmail,
      password: rPassword,
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

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}>
      <h1>Register</h1>
      <CustomInput
        inputFor='fName'
        type='text'
        label='First Name'
        value={inputs.fName}
        error={errors.fName}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomInput
        inputFor='lName'
        type='text'
        label='Last Name'
        value={inputs.lName}
        error={errors.lName}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomInput
        inputFor='rEmail'
        type='email'
        label='Email Address'
        value={inputs.rEmail}
        error={errors.rEmail}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomInput
        inputFor='rPassword'
        type='password'
        label='Password'
        value={inputs.rPassword}
        error={errors.rPassword}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomInput
        inputFor='confirmPassword'
        type='password'
        label='Confirm Password'
        value={inputs.confirmPassword}
        error={errors.confirmPassword}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomSubmit
        isLoading={isLoading}
        value='Register'
        formError={errors.form}
      />
    </form>
  );
};

export default Register;
