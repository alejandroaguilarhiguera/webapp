import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputEmail, InputPassword, InputPhone } from '../../../components';
import { AuthService } from '../../../services/API';

export interface Prop {
  callback?: string;
}

const authService = new AuthService();

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const {
    callback,
  }: Prop = router.query;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const session = await authService.signUp(email, password, displayName);

    if (session?.token) {
      router.push(callback || '/dashboard');
    }
  }

  return (
    <div className="container">

      <h1>Sign up </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="displayName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>

        <InputEmail
          onChange={setEmail}
          value={email}
        />
        <InputPhone
          onChange={setPhone}
          value={phone}
        />
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

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Registrar
        </Button>

      </Form>
    </div>
  );
}
