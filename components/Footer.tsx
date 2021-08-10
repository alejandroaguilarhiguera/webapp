import React from 'react';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export const NavbarComponent = (): JSX.Element => {
  return (

    <ModalFooter className={styles.footer}>

      Powered by
      {' '}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </ModalFooter>
  );
};

export default NavbarComponent;
