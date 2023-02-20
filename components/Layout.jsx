import { useEffect, useState } from 'react';
import NavBar from './navbar/NavBar';
import Network from './Network';
import Footer from './Footer';
import styles from 'styles/Layout.module.css';

const Layout = ({ children }) => {
  const [network, setNetwork] = useState(true);

  useEffect(() => {
    const changeNetwork = () => setNetwork(navigator.onLine);

    changeNetwork();

    window.addEventListener('offline', changeNetwork);
    window.addEventListener('online', changeNetwork);

    return () => {
      window.removeEventListener('offline', changeNetwork);
      window.removeEventListener('online', changeNetwork);
    };
  }, []);

  return (
    <div className={styles.body}>
      <nav>
        <div className={styles.container}>
          <NavBar />
        </div>
        {!network && <Network />}
      </nav>
      <main>
        <div className={styles.container}>{children}</div>
      </main>
      <footer>
        <div className={styles.container}>
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Layout;
