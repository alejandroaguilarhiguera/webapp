import { useRouter } from 'next/router';
// import Link from 'next/link';
import React, { useState } from 'react';
import FooterModal from '../../../components/Footer';
import { InputEmail, InputPassword } from '../../../components';
// import {
//   URL_BITBUCKET,
//   URL_GITHUB,
//   URL_GITLAB,
// } from '../../../config';
import { AuthService } from '../../../services/API';

const authService = new AuthService();
export interface Prop {
  callback?: string;
  username?: string;
}

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const {
    callback,
    username = '',
  }: Prop = router.query;
  const [email, setEmail] = useState(username);
  const [password, setPassword] = useState('');
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const session = await authService.login(email, password);

    if (session?.token) {
      router.push(callback || '/dashboard');
    }
  }
  return (
    <div className="">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <InputEmail
            onChange={setEmail}
            value={email}
          />
          <InputPassword
            onChange={setPassword}
            value={password}
          />
          <div className="flex items-center justify-between">

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!validateForm()}
            >
              Entrar
            </button>

          </div>

        </form>

        <br />
        <br />
        <br />
        <br />

      </div>
      <FooterModal />
    </div>
  );
};

export default LoginForm;
