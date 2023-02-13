# Gmail HTML 填寫工具

A simple Gmail HTML inserter

## 安裝流程

1. 安裝 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 擴充功能（Chrome/Edge）。
  ![image](https://user-images.githubusercontent.com/22278312/218531361-94cf8e49-1ece-4c9e-a252-a01277fca749.png)

2. 點擊[此連結](https://github.com/gandolfreddy/GmailHTMLInserter/raw/main/src/GmailHTMLInserter.user.js)，即可啟動 Tampermonkey 擴充功能頁面，按下「安裝」後即可自動安裝完畢。
  ![image](https://user-images.githubusercontent.com/22278312/218531414-9bd09939-94b7-4f4a-ac26-d9496aadf637.png)

## 更新流程

1. 點擊[此連結](https://github.com/gandolfreddy/GmailHTMLInserter/raw/main/src/GmailHTMLInserter.user.js)，即可啟動 Tampermonkey 擴充功能頁面，按下「更新」後即可自動更新完畢。
  ![image](https://user-images.githubusercontent.com/22278312/218531884-085ea33e-db99-4692-be6d-84c8c022a6b8.png)

## 操作畫面示範

1. 當 UserScript 載入時，會出現相關提示視窗。
  ![image](https://user-images.githubusercontent.com/22278312/218553502-8161d7a8-68cc-4069-9e99-af26a9b3b6f8.png)

2. 基礎操作如下所示，需將信件撰寫視窗放大至最大，才能首次載入 HTML 填寫工具按鈕。
  ![GmailHTMLInserter](https://user-images.githubusercontent.com/22278312/218556871-6b910310-0857-4102-ab80-ad41d8615510.gif)
---

## 實驗記錄

- 需要將程式碼檔案，命名為 `*.user.js`，才能觸發 Tampermonkey 的自動安裝與更新機制。

## 參考資料

- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Tampermonkey - documentation](https://www.tampermonkey.net/documentation.php#meta:downloadURL)
- [Will 保哥 - doggy8088/TampermonkeyUserscripts](https://github.com/doggy8088/TampermonkeyUserscripts/)
