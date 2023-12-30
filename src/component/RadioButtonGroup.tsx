import React from 'react';
import RadioButton from './RadioButton';

interface RadioButtonGroupProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (v: string) => void;
}

const Styles: { [key: string]: React.CSSProperties } = {
    text: { margin: "10px" },
    radioList_b: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        justifySelf: "auto",
        marginLeft: "10px"
    },
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, value, onChange }) => {

    return (
        <>
            <p style={Styles.text}> 表示するデータを選んでください。 なお、選択を変更した後はもう一度都道府県を選び直してください。</p>
            <div style={Styles.radioList}>
                {options.map((option) => (
                    <div key={option.value} style={Styles.radioList}>
                        <RadioButton
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                        />
                    </div>
                ))}
                {/* <p>Selected Value: {value}</p> */}
            </div>
        </>
    );
    
};

export default RadioButtonGroup;