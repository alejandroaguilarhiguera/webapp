import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import errorStyles from '../styles/Error.module.css';

interface Prop {
  controlId?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputPassword = (prop: Prop): JSX.Element => {
  const { value, onChange, label = 'Contraseña', controlId = 'password' } = prop;
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  function onPasswordChanged(password: string) {
    onChange(password);
    if (password.length < 5) {
      setError(`La ${label.toLowerCase()} tiene que ser mayor a 5 caracteres`);
    } else {
      setError('');
    }
  }

  return (
    <Form.Group style={{ 'padding-top': '10px' }} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="password"
        value={value}
        onChange={(e) => onPasswordChanged(e.target.value)}
        onBlur={() => setShowError(true)}
      />
      {
        showError && error && (
        <Form.Label className={errorStyles.label}>
          {error}
        </Form.Label>
        )
      }

    </Form.Group>
  );
};

export default InputPassword;
