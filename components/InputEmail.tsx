import validator from 'email-validator';
import React, { useState } from 'react';

interface Props {
  label?: string;
  controlId?: string;
  value: string;
  onChange: (value: string) => void;
  valid: (value: boolean) => void;
}

export const InputEmail = (prop: Props): JSX.Element => {
  const { value, onChange, label = 'Email', valid } = prop;
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  function onEmailChanged(email: string) {
    onChange(email);
    if (email.length > 0 && validator.validate(email)) {
      valid(true);
      setError(null);
    } else {
      valid(false);
      setError(`El ${label.toLowerCase()} no es válido`);
    }
  }
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        {label}
      </label>
      <input
        className={`shadow appearance-none border ${showError && error && 'border-red-500'} rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id="email"
        name="email"
        placeholder="example@domine.com"
        type="email"
        value={value}
        onChange={(e) => onEmailChanged(e.target.value)}
        onBlur={() => setShowError(true)}
      />
      <p className={`${showError && error ? '' : 'hidden'} text-red-500 text-xs italic`}>
        {error}
      </p>

    </div>

  );
};

export default InputEmail;
