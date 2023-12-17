//import React, { useRef } from "react";
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { Imprima } from 'next/font/google';

type Props = {
    populationdata: {
        prefName: string;
        data: { year: number; value: number }[];
    }[];
};

const Graph: React.FC<Props> = ({ populationdata }) => {
    let series: Highcharts.SeriesOptionsType[] = [];
    let categories = [];

    for (let p of populationdata) {
        let data = [];

        for (let pd of p.data) {
            data.push(pd.value);
            categories.push(String(pd.year));
        }

        series.push({
            type: "line",
            name: p.prefName,
            data: data,
        })
    }

    const options: Highcharts.Options = {
        title: {
            text: "総人口推移",
        },
        xAxis: {
            title: {
                text: "年度",
            },
            categories: categories,
        },
        yAxis: {
            title: {
                text: "人口数",
            },
        },

        series:
            series.length === 0
            ? [{ type: "line", name: "都道府県名", data: []}]
            : series,
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )

}

export default Graph;

/* function App(props: HighchartsReact.Props) {
    const options: Highcharts.Options = {
        title: {
            text: 'My chart'
        },
        series: [{
            type: 'line',
            data: [[1,1], [1,2], [3,3], [5,4]]
        }]
    }
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            {...props} />
    )
}

export default App; */