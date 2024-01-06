import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Graph from './Charts';

// Jest Mock
jest.mock('highcharts-react-official', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Graph Component', () => {
  const mockPopulationData = [
    {
      prefName: 'Tokyo',
      data: [
        { year: 2020, value: 10000000 },
        { year: 2021, value: 11000000 },
      ],
    },
  ];

  it('グラフが正しく表示されているか', () => {
    HighchartsReact.mockImplementation(({ options }) => {
      //HighchartReactが正しい設定で呼び出されるか
      expect(options.title.text).toBe('総人口推移');
      expect(options.xAxis.title.text).toBe('年度');
      expect(options.yAxis.title.text).toBe('人口数');

      return <div data-testid="highcharts-mock"></div>;
    });

    render(
      <Graph
        radioLabel="総人口"
        populationdata={mockPopulationData}
      />
    );

    //Highchartsが正しくレンダリングされるか
    expect(document.querySelector('[data-testid="highcharts-mock"]')).toBeInTheDocument();
  });
});