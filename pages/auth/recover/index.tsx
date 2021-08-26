import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FooterModal from '../../../components/Footer';
import { InputEmail } from '../../../components';
import { AuthService } from '../../../services/API';

const authService = new AuthService();

export interface Prop {
  email?: string;
}

const RecoverForm = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState((router.query.email as string) || '');

  async function handleSubmit(event) {
    event.preventDefault();
    if (email) {
      await authService.recoveryPassword(email);
      router.push('/auth/login');
    }
  }

  return (

    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputEmail
          onChange={setEmail}
          value={email}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enviar email de confirmación
        </button>
      </form>
      <FooterModal />
    </div>
  );
};

export default RecoverForm;
