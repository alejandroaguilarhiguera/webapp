import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import FooterModal from '../../../components/Footer';
import { InputEmail, InputPassword } from '../../../components';
import {
// URL_BITBUCKET,
  URL_GITHUB,
  URL_GITLAB,
} from '../../../config';
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

            <Link
              href="/auth/recover"
              passHref
            >
              <span
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >

                ¿Olvidaste tu contraseña?
              </span>
            </Link>
          </div>

          <ul className="grid py-10 sm:grid-cols-2 gap-6 xl:gap-8">

            <li>
              <Link
                href="/auth/sign-up"
                passHref
              >

                <div className="flex items-start space-x-4">

                  <svg fill="currentColor" className="flex-none text-indigo-400 w-12 h-12">
                    <rect width="48" height="48" rx="12" />
                  </svg>
                  <div className="flex-auto">
                    <h3 className="font-bold text-gray-900">Registra un nuevo usuario</h3>
                  </div>
                </div>
              </Link>
            </li>

            <li>
              {

              URL_GITHUB && (
              <Link href={URL_GITHUB} passHref>
                <div className="flex items-start space-x-4">

                  <svg fill="currentColor" className="flex-none text-gray-900 w-12 h-12">
                    <rect width="48" height="48" rx="12" />
                    <path d="M23.997 12a12 12 0 00-3.792 23.388c.6.12.816-.264.816-.576l-.012-2.04c-3.336.72-4.044-1.608-4.044-1.608-.552-1.392-1.332-1.764-1.332-1.764-1.08-.744.084-.72.084-.72 1.2.084 1.836 1.236 1.836 1.236 1.08 1.824 2.808 1.296 3.492.996.12-.78.42-1.308.756-1.608-2.664-.3-5.46-1.332-5.46-5.928 0-1.32.468-2.388 1.236-3.228a4.32 4.32 0 01.12-3.168s1.008-.324 3.3 1.224a11.496 11.496 0 016 0c2.292-1.56 3.3-1.224 3.3-1.224.66 1.644.24 2.88.12 3.168.768.84 1.236 1.92 1.236 3.228 0 4.608-2.808 5.616-5.484 5.916.432.372.816 1.104.816 2.22l-.012 3.3c0 .312.216.696.828.576A12 12 0 0023.997 12z" fill="currentColor" className="text-gray-50" />
                  </svg>
                  <div className="flex-center">
                    <h3 className="font-bold text-gray-900">Ingresa con GitHub</h3>
                  </div>
                </div>
              </Link>
              )
              }
            </li>

            <li>
              {
                URL_GITLAB && (
                  <Link href={URL_GITLAB} passHref>
                    <div className="flex items-start space-x-4">

                      <svg fill="currentColor" className="flex-none text-red-500 w-12 h-12">
                        <rect width="48" height="48" rx="12" />
                      </svg>
                      <div className="flex-auto">
                        <h3 className="font-bold text-gray-900">Ingresa con Gitlab</h3>
                      </div>
                    </div>
                  </Link>
                )
              }
            </li>
          </ul>

          {/* <Link
            href={URL_BITBUCKET}
          >
            Ingresar con bitbucket
          </Link> */}
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
