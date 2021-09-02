import { useState } from 'react';

interface Prop {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export const ButtonSubmit = (prop: Prop): JSX.Element => {
  const { label, loading = false, disabled = false } = prop;
  const [showTooltip, setShowTooltip] = useState(false);
  if (loading) {
    return (
      <div
        className="w-16 h-16 border-4 border-blue-400 border-dotted rounded-full animate-spin"
      />
    );
  }
  return (
    <div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        // disabled={disabled} // No valida el tooltip
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label}
      </button>

      <div className={`${showTooltip && disabled ? '' : 'hidden'} opacity-95 text-sm mt-2 bg-gray-600 text-gray-100 px-1 absolute rounded bg-opacity-50 shadow-x1`}>
        Verifica la información
      </div>

    </div>
  );
};

export default ButtonSubmit;
