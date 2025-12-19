# 交通事故視覺化

這個專案使用 D3、DC.js 與 Crossfilter，從「本市 A1 及 A2 類道路交通事故－按肇事場所別 (113 年)」資料集呈現各轄區與肇事場所別的事故件數。所有運算都在瀏覽器端完成，直接讀取儲存庫內的 CSV 檔案。

## 檔案說明
- `index.html`：儀表板的 HTML 框架與第三方套件引用。
- `css/traffic.css`：配色、版型與圖表樣式。
- `js/traffic.js`：載入 CSV、建立 Crossfilter 維度與 DC.js 圖表。
- `本市A1及A2類道路交通事故-按肇事場所別(113年).csv`：113 年 A1/A2 事故依肇事場所別的 UTF-8 CSV 檔。

## 本機執行
無需建置流程，直接啟動靜態伺服器即可：

```sh
python -m http.server 8000
# 然後前往 http://localhost:8000/
```

開啟頁面後即可互動篩選轄區與肇事場所，表格會同步顯示符合條件的筆數。

## 部署到 GitHub Pages
網站可直接從 `main` 分支根目錄發布：

1. 啟用 GitHub Pages，來源設定為「Deploy from a branch」，資料夾選擇 `main` 分支的 `/`。
2. 推送至 `main`；如需自動化流程，可新增工作流程上傳根目錄並發布至 GitHub Pages 環境。
3. 造訪 `https://<your-user>.github.io/<repo>/`（將 `<repo>` 替換為實際儲存庫名稱）。
