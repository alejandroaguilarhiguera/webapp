import { useState } from 'react';

interface Prop {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  valid?: (value: boolean) => void;
}

export const InputPassword = (prop: Prop): JSX.Element => {
  const { value, onChange, label = 'Contraseña', valid } = prop;
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  function onPasswordChanged(password: string) {
    onChange(password);
    if (password.length < 6) {
      valid(false);
      setError(`La ${label.toLowerCase()} tiene que ser mayor a 5 caracteres`);
    } else {
      valid(true);
      setError('');
    }
  }

  return (

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        {label}
      </label>
      <input
        className={`shadow appearance-none border ${showError && error && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        id="password"
        type="password"
        placeholder="******************"
        value={value}
        onChange={(e) => onPasswordChanged(e.target.value)}
        onBlur={() => setShowError(true)}
      />
      <p className={`${showError && error ? '' : 'hidden'} text-red-500 text-xs italic`}>

        {error}
      </p>
    </div>

  );
};

export default InputPassword;
