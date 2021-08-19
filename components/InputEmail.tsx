import validator from 'email-validator';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import errorStyles from '../styles/Error.module.css';

interface Prop {
  label?: string;
  controlId?: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputEmail = (prop: Prop): JSX.Element => {
  const { value, onChange, label = 'Email', controlId = 'email' } = prop;
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  function onEmailChanged(email: string) {
    onChange(email);
    if (email.length > 0 && validator.validate(email)) {
      setError(null);
    } else {
      setError(`El ${label.toLowerCase()} no es válido`);
    }
  }
  return (
    <Form.Group style={{ 'padding-top': '10px' }} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        autoFocus
        type="email"
        value={value}
        onChange={(e) => onEmailChanged(e.target.value)}
        onBlur={() => setShowError(true)}
      />
      {
        showError && error
            && (
            <Form.Label className={errorStyles.label}>
              {error}
            </Form.Label>
            )

      }

    </Form.Group>
  );
};

export default InputEmail;
