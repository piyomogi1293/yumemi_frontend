import React from 'react';
import {
  render,
  fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioButtonGroup from './RadioButtonGroup';

describe('RadioButtonGroup Component', () => {
  const mockOptions = [{
      label: 'Option 1',
      value: 'option1'
    },
    {
      label: 'Option 2',
      value: 'option2'
    },
  ];

  it('RadioButtonGroupが正しくレンダリングされているか', () => {
    const mockOnChange = jest.fn();

    const {
      getByText,
      getByLabelText
    } = render( <
      RadioButtonGroup options = {
        mockOptions
      }
      value = "option1"
      onChange = {
        mockOnChange
      }
      />
    );

    // RadioButtoGroupコンポーネントが正しくレンダリングされるか
    expect(getByLabelText('Option 1')).toBeChecked();
    expect(getByLabelText('Option 2')).not.toBeChecked();
  });

  it('RadioButtonGroupが正しい挙動をしているか', () => {
    const mockOnChange = jest.fn();

    const {
      getByLabelText
    } = render( <
      RadioButtonGroup options = {
        mockOptions
      }
      value = "option1"
      onChange = {
        mockOnChange
      }
      />
    );

    // ラジオボタンが正しい値を取るか
    expect(getByLabelText('Option 1')).toBeChecked();
    expect(getByLabelText('Option 2')).not.toBeChecked();

    // 変更のイベントをシミュレーション
    fireEvent.click(getByLabelText('Option 2'));

    // onChangeによって正しい値に変わるか
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });
});