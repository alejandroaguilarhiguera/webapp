import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { InputPassword, ButtonSubmit } from '../../../components';
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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const session = await authService.renewPassword(hash, password);
    if (session?.token) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login?callback=/dashboard');
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputPassword
          onChange={setPassword}
          value={password}
        />

        <InputPassword
          label="Confirmación de contraseña"
          onChange={setConfirmPassword}
          value={confirmPassword}
        />

        <ButtonSubmit
          label="Guardar contraseña"
          loading={loading}
        />

      </form>
    </div>
  );
};

export default RecoverForm;
