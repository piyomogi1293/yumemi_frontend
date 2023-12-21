import React, { ChangeEvent, FC } from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange(value);
    }
  };

  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;