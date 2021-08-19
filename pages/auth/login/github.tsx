import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AuthService } from '../../../services/API';

export interface Prop {
  code?: string;
}

const authService = new AuthService();

const GithubForm = (): JSX.Element => {
  const router = useRouter();
  const {
    code,
  }: Prop = router.query;

  useEffect(() => {
    async function init() {
      const session = await authService.oauth('github', code);
      if (session?.token) {
        router.push('/dashboard');
      }
    }
    if (code) {
      init();
    }
  }, [code, router]);

  return <p>Redirecting...</p>;
};

export default GithubForm;
