import React, { ChangeEvent, FC } from 'react';

interface RadioButtonProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

const Styles: { [key: string]: React.CSSProperties } = {
    radio: {
        //border: "solid 1px",
        justifySelf: "center",
        //marginLeft: "10px"
    }
};

const RadioButton: FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            onChange(value);
        }
    };

    return (
        <label style={Styles.radio}>
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