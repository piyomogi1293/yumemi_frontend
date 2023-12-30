"use client"
import React, { useEffect, useState } from "react";
import CheckField from "./CheckField";
import Graph from "./Charts";
import axios from "axios";
import RadioButtonGroup from "./RadioButtonGroup";

// 環境変数を格納する(環境変数には命名規則があることに注意)
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Styles: { [key: string]: React.CSSProperties } = {
    label: {
        backgroundColor: "rgb(240,240,240)",
        color: "black",
        fontSize: "20px",
        padding: "0.5rem 2rem",
        borderLeft: "4px solid #000",
        borderBottom: "4px solid",
        marginLeft: "5pt",
        marginRight: "5pt"
    },
};

const Main: React.FC = () => {
    const [prefectures, setPrefectures] = useState<{
        message: null;
        result: {
            prefCode: number;
            prefName: string;
        }[];
    } | null>(null);
    const [prefPopulation, setPrefPopulation] = useState<
        { prefName: string; data: { year: number; value: number }[] }[]
    >([]);

    // RESAS API　 にアクセスする
    useEffect(() => {
        // 都道府県一覧 
        // 入手データについて "https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html"
        axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures",
            { headers: { "X-API-KEY": API_KEY }, }
        )
            .then((results) => {
                setPrefectures(results.data);
            })
            .catch((error) => { });
    }, []);

    const handleClickCheck = (
        prefName: string,
        prefCode: number,
        check: boolean
    ) => {
        let c_prefPopulation = prefPopulation.slice(); // チェックされた都道府県のデータを格納する変数

        // チェックされた時に表示するデータを用意
        if (check) {
            if (c_prefPopulation.findIndex((value) => value.prefName === prefName) !== -1)
                return;

            // 都道府県の人口構成 
            // 入手データについて: "https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html"
            if (selectedValue === options[0].value) { // 総人口
                axios.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(prefCode),
                    { headers: { "X-API-KEY": API_KEY }, }
                )
                    .then((results) => {
                        c_prefPopulation.push({
                            prefName: prefName,
                            data: results.data.result.data[0].data,
                        });

                        setPrefPopulation(c_prefPopulation);
                    })
                    .catch((error) => { return; });
            }
            else if (selectedValue === options[1].value) { // 年少人口
                axios.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(prefCode),
                    { headers: { "X-API-KEY": API_KEY }, }
                )
                    .then((results) => {
                        c_prefPopulation.push({
                            prefName: prefName,
                            data: results.data.result.data[1].data,
                        });

                        setPrefPopulation(c_prefPopulation);
                    })
                    .catch((error) => { return; });
            }
            else if (selectedValue === options[2].value) { // 生産年齢人口
                axios.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(prefCode),
                    { headers: { "X-API-KEY": API_KEY }, }
                )
                    .then((results) => {
                        c_prefPopulation.push({
                            prefName: prefName,
                            data: results.data.result.data[2].data,
                        });

                        setPrefPopulation(c_prefPopulation);
                    })
                    .catch((error) => { return; });
            }
            else { // 老年人口
                axios.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(prefCode),
                    { headers: { "X-API-KEY": API_KEY }, }
                )
                    .then((results) => {
                        c_prefPopulation.push({
                            prefName: prefName,
                            data: results.data.result.data[3].data,
                        });

                        setPrefPopulation(c_prefPopulation);
                    })
                    .catch((error) => { return; });
            }


        }
        // チェックを消した時の処理
        else {
            const deleteIndex = c_prefPopulation.findIndex(
                (value) => value.prefName === prefName
            );
            if (deleteIndex === -1) return;
            c_prefPopulation.splice(deleteIndex, 1);
            setPrefPopulation(c_prefPopulation);
        }
        //console.log(c_prefPopulation)
    };

    /* ラジオボタンの選択肢 */
    const options = [
        { label: '総人口', value: 'all' },
        { label: '年少人口', value: 'child' },
        { label: '生産年齢人口', value: 'adult' },
        { label: '老年人口', value: 'elderly people' },
    ];
    //console.log(options[0].label)
    const [selectedValue, setSelectedValue] = useState<string>(options[0].value);
    const handleRadioButtonChange = (value: string) => {
        setSelectedValue(value);
    };
    console.log(selectedValue)
    return (
        <main>
            {/* radio button */}
            <h2 style={Styles.label}>データ種別</h2>
            <RadioButtonGroup
                options={options}
                value={selectedValue}
                onChange={handleRadioButtonChange} />
            
            {/* 都道府県ごとのチェックボックスのリスト */}
            <h2 style={Styles.label}>都道府県</h2>
            {prefectures && (
                <CheckField
                    prefectures={prefectures.result}
                    onChange={handleClickCheck}
                />
            )}

            <h2 style={Styles.label}>人口推移グラフ</h2>
            {/* グラフのタイトルをradio buttonの選択によって変更 */}
            { selectedValue === options[0].value ? (
                <Graph 
                radioLabel={options[0].label}
                populationdata={prefPopulation}
                />
            ) : ( selectedValue === options[1].value ? (
                <Graph 
                radioLabel={options[1].label}
                populationdata={prefPopulation}
                />
            ) : ( selectedValue === options[2].value ? (
                <Graph 
                radioLabel={options[2].label}
                populationdata={prefPopulation}
                />
            ) : (
                <Graph 
                radioLabel={options[3].label}
                populationdata={prefPopulation}
                />
            )))
            }

            {/* <Graph
            radioLabel={options.label}
            populationdata={prefPopulation}
            /> */}
        </main>
    )
}

export default Main;