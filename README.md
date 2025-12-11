# 交通事故視覺化

這個專案使用 D3、DC.js、Crossfilter 與 Google Maps JavaScript API，視覺化台灣的交通事故資料。整個介面完全在瀏覽器端運作，並從 `accidentXY_113.tsv`（113 年台北市 A1 / A2 事故資料）或較小的 `accidentXY_light.tsv` 讀取資料。

## 檔案說明
- `index.html`：網頁結構與第三方套件引用。
- `css/traffic.css`：地圖、導覽與篩選控制元件的樣式。
- `js/traffic.js`：地圖、圖表與導覽文字的前端邏輯。
- `accidentXY_113.tsv`：自 `113年-臺北市A1及A2類交通事故明細 (1).csv` 整理、去重後的 UTF-8 TSV 檔（每列 1 起事故）。
- `accidentXY_light.tsv`：示範用途的輕量資料集。

## 本機執行
不需要建置流程。將儲存庫根目錄作為靜態檔案啟動伺服器，直接在瀏覽器開啟 `index.html`：

```sh
python -m http.server 8000
# 然後前往 http://localhost:8000/
```

頁面會直接載入 TSV 檔案，外部套件與 Google Maps 需要網際網路連線。

## 部署到 GitHub Pages
網站可以直接從 `main` 分支的儲存庫根目錄發布。

1. 啟用 GitHub Pages，來源設定為「Deploy from a branch」，資料夾選擇 `main` 分支的 `/`。
2. 推送至 `main`；隨附的工作流程（`.github/workflows/pages.yml`）會上傳根目錄並發布至 GitHub Pages 環境。
3. 造訪 `https://<your-user>.github.io/traffic/`（如果儲存庫名稱不同，請替換 `traffic`）。

## 開發流程
LiveScript、Stylus 與 Jade 原始碼已移除，請直接修改排版後的 HTML、JS 與 CSS 檔案。如需自動化流程（例如格式化），建議新增 npm script，而非重新導入舊的 Gulp 工作。
