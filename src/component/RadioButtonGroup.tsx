import React, { useState } from 'react';
import RadioButton from './RadioButton';

interface RadioButtonGroupProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (v: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, value, onChange }) => {
    /* const [selectedValue, setSelectedValue] = useState<string>('');

    const handleRadioButtonChange = (value: string) => {
        setSelectedValue(value);
    }; */

    return (
        <div>
            {options.map((option) => (
                <RadioButton
                key={option.value}
                label={option.label}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                />
            ))}
            <p>Selected Value: {value}</p>
        </div>
    );
};

export default RadioButtonGroup;