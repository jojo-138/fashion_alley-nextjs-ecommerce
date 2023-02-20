import Head from 'next/head';
import useUser from 'hooks/useUser';
import Signin from 'components/login/Signin';
import Register from 'components/login/Register';
import styles from 'styles/login/Login.module.css';

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true });

  return (
    <>
      <Head>
        <title>Fashion Alley | Log In</title>
      </Head>
      <div className={styles.container}>
        <Signin />
        <div className={styles.verticalLine} />
        <Register />
      </div>
    </>
  );
};

export default Login;
