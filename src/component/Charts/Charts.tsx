//import React, { useRef } from "react";
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

type Props = {
    radioLabel: string;
    populationdata: {
        prefName: string;
        data: { year: number; value: number }[];
    }[];
};

// 都道府県のグラフを表示
const Graph: React.FC<Props> = ({ radioLabel, populationdata }) => {
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
            text: radioLabel+"推移",
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
        accessibility: {
            enabled: false,
        }
    };

    return (
        <div style={{marginLeft: "5pt", marginRight: "5pt"}}>
            <HighchartsReact highcharts={Highcharts} options={options}/>
            <p style={{color:"black", textAlign:"right", marginRight:"5px"}}>※ 2020年までが実績値。それ以降は推計値。</p>
        </div>
    )

}

export default Graph;