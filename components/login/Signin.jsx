import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import fetchAPI from 'lib/fetchAPI';
import CustomInput from '../CustomInput';
import CustomSubmit from '../CustomSubmit';
import { emailRegEx, passwordInvalidMsg, passwordRegEx } from '/constants';
import styles from 'styles/login/SigninRegister.module.css';

const initialState = {
  sEmail: '',
  sPassword: '',
};

const Signin = () => {
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
      case 'sEmail':
        setErrors({
          ...errors,
          sEmail: emailRegEx.test(value) ? '' : 'Invalid Email Address.',
        });
        break;
      case 'sPassword':
        setErrors({
          ...errors,
          sPassword: passwordRegEx.test(value) ? '' : passwordInvalidMsg,
        });
        break;
      default:
        break;
    }
  };

  const handleInputFocus = (name) => setErrors({ ...errors, [name]: '', form: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { sEmail, sPassword } = inputs;

    if (!sEmail || !sPassword) {
      for (let key in inputs) {
        if (!inputs[key].length) return handleValidation(key, inputs[key]);
      }
    }

    for (let key in errors) {
      if (errors[key].length) return;
    }

    setLoading(true);

    fetchAPI('/api/signin', 'POST', {
      email: sEmail,
      password: sPassword,
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
      <h1>Sign In</h1>
      <CustomInput
        inputFor='sEmail'
        type='email'
        label='Email Address'
        value={inputs.sEmail}
        error={errors.sEmail}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomInput
        inputFor='sPassword'
        type='password'
        label='Password'
        value={inputs.sPassword}
        error={errors.sPassword}
        handleChange={handleChange}
        handleEraseClick={handleEraseClick}
        handleValidation={handleValidation}
        handleInputFocus={handleInputFocus}
      />
      <CustomSubmit
        isLoading={isLoading}
        value='Sign In'
        formError={errors.form}
      />
      <div className={styles.forgot}>
        <Link href='#!'>Forgot Password?</Link>
      </div>
    </form>
  );
};

export default Signin;
