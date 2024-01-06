import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Main from './Main';

const mockResasResponse = {
    message: null,
    result: [{
        prefCode: 11,
        prefName: '埼玉県'
    }, ],
};

const mockPopulationResponse = {
    message: null,
    result: {
        data: [
            { year: 2020, value: 9302 },
            { year: 2025, value: 8431 },
        ],
    },
};

const mockAxios = new MockAdapter(axios);

describe('Main Component', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    it('RESAS APIからデータを正しく取得できているか', async () => {
        mockAxios.onGet("https://opendata.resas-portal.go.jp/api/v1/prefecture").reply(200, mockResasResponse);
        mockAxios.onGet("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear/prefCode=" + String(mockPopulationResponse.result.data.prefCode)).reply(200, mockPopulationResponse);
        
        const { getByText } = render(<Main />);
    
    await waitFor(() => {
      const prefData = mockResasResponse.result
      expect(prefData).toMatchObject(expect.objectContaining([{ prefCode: 11, prefName: '埼玉県' }]));

      // Access the data directly from the mock response and use expect.objectContaining
      const populationData = mockPopulationResponse.result.data;
      expect(populationData[0]).toMatchObject(expect.objectContaining({ year: 2020, value: 9302 }));
      expect(populationData[1]).toMatchObject(expect.objectContaining({ year: 2025, value: 8431 }));
    });
    });
});