import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FooterModal from '../../../components/Footer';
import {
  GITHUB_CLIENT_ID,
  GITLAB_CLIENT_ID,
  BITBUCKET_CLIENT_ID,
  WEBAPP_URL,
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
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <br />
        <br />
        <br />
        <br />

        <Button size="lg" className="btn" href={`${WEBAPP_URL}/auth/sign-up`}>
          Crear cuenta
        </Button>
        <br />

        <Button size="lg" className="btn" href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`}>
          Ingresar con github
        </Button>
        <br />
        <Button size="lg" className="btn" href={`https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/login/gitlab&response_type=code&code_challenge_method=S256`}>
          Ingresar con gitlab
        </Button>
        <br />

        <Button size="lg" className="btn" href={`https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=token`}>
          Ingresar con bitbucket
        </Button>

      </Form>
      <FooterModal />
    </div>
  );
};

export default LoginForm;
