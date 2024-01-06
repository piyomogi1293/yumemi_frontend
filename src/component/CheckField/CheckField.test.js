import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckField from './CheckField';

describe('CheckField Component', () => {
  const mockPrefectures = [
    { prefCode: 13, prefName: 'Tokyo' },
    { prefCode: 27, prefName: 'Osaka' },
  ];

  it('CheckFieldが正しくレンダリングされ、正しい挙動をしているか', () => {
    const mockOnChange = jest.fn();

    const { getByText, getByLabelText } = render(
      <CheckField prefectures={mockPrefectures} onChange={mockOnChange} />
    );

    // チェックフィールドが正しくレンダリングされるか
    expect(getByText('Tokyo')).toBeInTheDocument();
    expect(getByText('Osaka')).toBeInTheDocument();

    // チェックされた際に、チェックボックスが正しい値となるか
    fireEvent.click(getByLabelText('Tokyo'));
    expect(mockOnChange).toHaveBeenCalledWith('Tokyo', 13, true);

    fireEvent.click(getByLabelText('Osaka'));
    expect(mockOnChange).toHaveBeenCalledWith('Osaka', 27, true);
  });
});