株式会社ゆめみ様 [フロントエンドエンジニア試験](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)

# 都道府県別人口推移のグラフを表示する
## 使用環境
* Next.js 14 (node 20.10.4)
* TypeScript 5.3.3
* React 18.2.0
* Highchart 11.2.0
* Highchart-React-Official 3.2.1
* Axios 1.6.2
* eslint 8.56.0
* prettier 3.1.1
* jest 29.7

データは**RESAS API**から得たものを使用

## 機能
各都道府県の「総人口」「年少人口」「生産年齢人口」「老年人口」の5年毎の推移を1980年から2045年まで表示する(2020年までが実績値)

### データ種別
表示するデータ(総人口など)を4種類から選択できる. 
データ種別を変更した場合、都道府県のチェックボタンを選択し直してグラフを再表示する必要がある.

### 都道府県
都道府県毎にチェックボックスがあり、選択するとその都道府県の人口推移を表示する. 複数の都道府県を同時に表示することも可能.

### 人口推移グラフ
上の二項目にて設定された都道府県とデータの種類の人口推移のグラフを表示する.