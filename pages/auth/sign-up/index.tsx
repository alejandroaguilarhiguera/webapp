import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputEmail, InputPassword, InputPhone } from '../../../components';
import { AuthService, NewUser, Session, ResponseVerificationPhone } from '../../../services/API';

export interface Prop {
  callback?: string;
}

const authService = new AuthService();

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const {
    callback,
  }: Prop = router.query;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user: NewUser = {
      displayName,
      email,
      phoneNumber,
      password,
      captcha: 'TODO:_agregar_captcha',
    };
    const result = await authService.signUp(user);
    const session = result as Session;
    if (session?.token) {
      router.push(callback || '/dashboard');
    }
    const responseVerificationPhone = result as ResponseVerificationPhone;
    if (responseVerificationPhone.verificationId) {
      router.push(`/auth/confirm-phone/${responseVerificationPhone.verificationId}`);
    }
  }

  return (
    <div className="container w-full max-w-xs">
      <form onSubmit={handleSubmit}>
        <div>
          <span
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre
          </span>
          <input
            type="text"
            id="displayName"
            name="displayName"
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <InputEmail
          onChange={setEmail}
          value={email}
        />
        <InputPhone
          onChange={setPhoneNumber}
          value={phoneNumber}
        />
        <InputPassword
          onChange={setPassword}
          value={password}
        />
        <InputPassword
          label="Confirmación de contraseña"
          onChange={setConfirmPassword}
          value={confirmPassword}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!validateForm()}
        >
          Registrar
        </button>

      </form>
    </div>
  );
}
