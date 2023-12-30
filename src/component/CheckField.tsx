import React from "react";

type Props = {
    prefectures:
        | {
            prefCode: number;
            prefName: string;
        }[];
    
    onChange: (name: string, prefName: number, check: boolean) => void;
};

const Styles: { [key: string]: React.CSSProperties } = {
    checkcardList: { // 全てのカードのデザイン
        color: "black",
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
        justifyContent: "flex-start",
        justifySelf: "auto",//"center",
        //alignItems: "center",
    },
    text: { display: "contents", marginLeft: "1em", cursor: "pointer" },
    checkcard: { // カード本体のデザイン
        borderRadius: "5px",
        border: "solid 1px",
        borderColor: "gray",
        backgroundColor: "rgb(220, 220,220)",
        textAlign: "center",
        padding: "2px",
        margin: "0.1rem",
    },
};

// 都道府県の一覧のチェックボックスを表示する
const CheckField: React.FC<Props> = ({ prefectures, onChange }) => {
    return (
        <>
            <div style={Styles.checkcardList}>
                {prefectures.map((prefecture) => (
                    <div key={prefecture.prefName} style={Styles.checkcard} >
                        { /* チェックボックスと選択状態を記録 */ }
                        <input 
                            type="checkbox"
                            name="Prefecture name"
                            onChange={(event) =>
                                onChange(
                                    prefecture.prefName,
                                    prefecture.prefCode,
                                    event.target.checked
                                )
                            }
                            id = {"checkbox" + prefecture.prefCode}
                        />
                        { /* チェックボックスのラベルを表示(都道府県名) */ }
                        <label
                            htmlFor={"checkbox" + prefecture.prefCode}
                            //style={Styles.text}
                        >
                            {/* 都道府県名の長さが違うので表示を揃える */}
                            {prefecture.prefName.length === 3 
                                ? prefecture.prefName + "　"
                                : prefecture.prefName
                            }
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CheckField;