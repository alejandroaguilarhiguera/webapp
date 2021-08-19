import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import errorStyles from '../styles/Error.module.css';

interface Prop {
  label?: string;
  controlId?: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputPhone = (prop: Prop): JSX.Element => {
  const { value, onChange, label = 'Teléfono', controlId = 'phone' } = prop;
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  function onPhoneChanged(phone: string) {
    onChange(phone);
    if (phone.length >= 10) {
      setError(null);
    } else {
      setError(`El ${label.toLowerCase()} no es válido`);
    }
  }
  function validate(e) {
    const theEvent = e || window.event;
    let key = '';
    // Handle paste
    if (theEvent.type === 'paste') {
      key = e.clipboardData.getData('text/plain');
    } else {
    // Handle key press
      key = String.fromCharCode(theEvent.keyCode || theEvent.which);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key) || theEvent.target.value.length > 13) {
      theEvent.returnValue = false;
      theEvent.preventDefault && theEvent.preventDefault();
    }
  }
  return (
    <Form.Group style={{ 'padding-top': '10px' }} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        autoFocus
        type="text"
        value={value}
        onKeyPress={(e) => validate(e)}
        onChange={(e) => onPhoneChanged(e.target.value)}
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

export default InputPhone;
