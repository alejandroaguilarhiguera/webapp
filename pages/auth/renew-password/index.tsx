import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FooterModal from '../../../components/Footer';
import { InputPassword } from '../../../components';
import { AuthService } from '../../../services/API';

const authService = new AuthService();

export interface Prop {
  hash?: string;
}

const RecoverForm = (): JSX.Element => {
  const router = useRouter();
  const {
    hash,
  }: Prop = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const session = await authService.renewPassword(hash, password);
    if (session?.token) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login?callback=/dashboard');
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputPassword
          onChange={setPassword}
          value={password}
        />
        <InputPassword
          controlId="confirmPassword"
          label="Confirmación de contraseña"
          onChange={setConfirmPassword}
          value={confirmPassword}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Guardar contraseña
        </button>
      </form>
      <FooterModal />
    </div>
  );
};

export default RecoverForm;
