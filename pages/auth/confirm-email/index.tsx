import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import FooterModal from '../../../components/Footer';
import { AuthService } from '../../../services/API';

const authService = new AuthService();

export interface Prop {
  hash?: string;
}

const ConfirmEmailForm = (): JSX.Element => {
  const router = useRouter();
  const {
    hash,
  }: Prop = router.query;

  useEffect(() => {
    hash && authService.confirmEmail(hash).then((session) => {
      if (session?.token) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    });
  }, [hash, router]);

  return (
    <div className="container">
      <span>... redirect</span>
      <FooterModal />
    </div>
  );
};

export default ConfirmEmailForm;
