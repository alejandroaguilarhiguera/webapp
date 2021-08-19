import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FooterModal from '../../../components/Footer';
import { InputEmail, InputPassword } from '../../../components';
import {
  URL_BITBUCKET,
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
    <div className="Login container">
      <Form onSubmit={handleSubmit}>
        <InputEmail
          onChange={setEmail}
          value={email}
        />
        <InputPassword
          onChange={setPassword}
          value={password}
        />
        <br />

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <br />
        <br />
        <br />
        <br />

        <Button size="lg" className="btn" href="/auth/sign-up">
          Crear cuenta
        </Button>
        <br />

        <Button
          size="lg"
          className="btn"
          href={URL_GITHUB}
        >
          Ingresar con github
        </Button>
        <br />
        <Button
          size="lg"
          className="btn"
          href={URL_GITLAB}
        >
          Ingresar con gitlab
        </Button>
        <br />

        <Button
          size="lg"
          className="btn"
          href={URL_BITBUCKET}
        >
          Ingresar con bitbucket
        </Button>

      </Form>
      <FooterModal />
    </div>
  );
};

export default LoginForm;
