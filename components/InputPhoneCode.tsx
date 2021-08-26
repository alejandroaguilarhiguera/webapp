import { useState } from 'react';

interface Prop {
  size: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const InputPhoneCode = (prop: Prop): JSX.Element => {
  const { size, value = '', onChange } = prop;
  const [code, setCode] = useState(value);

  function onPhoneChanged(element: string) {
    setCode(element);
    onChange && onChange(element);
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
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      theEvent.preventDefault && theEvent.preventDefault();
    }
  }

  return (
    <div className="flex">
      <input
        className="w-80 h-10 pl-3 bg-transparent border-none absolute outline-none"
        style={{ letterSpacing: '2.1em' }}
        type="text"
        maxLength={size}
        value={code}
        onKeyPress={(e) => validate(e)}
        onChange={(e) => onPhoneChanged(e.target.value)}
      />

      { (new Array(size)).fill().map((_, index) => (
        <div style={{ 'padding-right': '0.1em' }}>

          <div className={`w-10 h-10 rounded border-2 border-${index < code.length ? 'gray' : 'blue'}-900`} />
        </div>
      ))}
    </div>
  );
};

export default InputPhoneCode;
