import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioButton from './RadioButton';

describe('RadioButton Component', () => {
  const mockOnChange = jest.fn();

  it('ラジオボタンが正しくレンダリングされるか', () => {
    const { getByLabelText } = render(
      <RadioButton label="Option 1" value="option1" checked={true} onChange={mockOnChange} />
    );

    // RadioButtonコンポーネントが正しくレンダリングされるか
    expect(getByLabelText('Option 1')).toBeInTheDocument();
  });

  it('ラジオボタンが正しく機能しているか', () => {
    const { getByLabelText } = render(
      <RadioButton label="Option 2" value="option2" checked={false} onChange={mockOnChange} />
    );

    // 最初はチェックされていない
    expect(getByLabelText('Option 2')).not.toBeChecked();

    // チェックされることのシミュレーション
    fireEvent.click(getByLabelText('Option 2'));

    // 値が変わるか
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });
});