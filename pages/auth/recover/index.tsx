import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { InputEmail, ButtonSubmit } from '../../../components';
import { AuthService } from '../../../services/API';

const authService = new AuthService();

export interface Prop {
  email?: string;
}

const RecoverForm = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState((router.query.email as string) || '');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (email) {
      await authService.recoveryPassword(email);
      router.push('/auth/login');
    }
    setLoading(false);
  }

  return (

    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <InputEmail
          onChange={setEmail}
          value={email}
        />

        <ButtonSubmit loading={loading} label="Enviar email de confirmación" />

      </form>
    </div>
  );
};

export default RecoverForm;
