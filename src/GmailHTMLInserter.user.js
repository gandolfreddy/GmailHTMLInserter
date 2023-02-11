// ==UserScript==
// @name         Gmail HTML 填寫工具
// @version      0.2.0
// @description  A simple Gmail HTML inserter
// @license      GPL
// @source       https://github.com/gandolfreddy/GmailHTMLInserter/raw/main/src/GmailHTMLInserter.js
// @namespace    https://github.com/gandolfreddy/GmailHTMLInserter/raw/main/src/GmailHTMLInserter.js
// @match        https://mail.google.com/mail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hibbard.eu
// @author       Gandolfreddy
// @run-at       document-idle
// ==/UserScript==


(function () {
    'use strict';

    const VERSION = '0.2.1';

    const styleSheet = `
    /* 自定義 CSS */
    .html-inserter-btn {
        color: white;
        background-color: #219d85;
        border: 0px;
        border-radius: 5px;
        box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    }

    .html-inserter-btn:hover{
        background-color: #18bc9c;
        cursor:pointer;
    }

    .html-inserter-mask {
        visibility: hidden;

        background-color: rgba(0, 0, 0, 0.5);
        height: 100%;
        width: 100%;
        z-index: 7;

        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .html-inserter-editor {
        width: 800px;
        padding-buttom: 10px;

        background-color: #ffffff;
        position: absolute;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .html-inserter-editor-title {
        width: 100%;
        height: 35px;
        margin-bottom: 20px;

        background-color: #f2f6fc;
        border-radius: 5px 5px 0px 0px;

        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .close-btn {
        border: 0px;
        border-radius: 2px;
        margin-right: 10px;

        font-size: 20px;
        font-family: consolas;
        color: #878a8b;
        background-color: #f2f6fc;
    }

    .close-btn:hover{
        background-color: #c1c1c1;
        cursor:pointer;
    }

    .html-inserter-editor-container {
        width: 95%;
        height: 600px;
        margin-bottom: 25px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .html-content {
        width: 100%;
        height: 100%;
        resize: none;

        border: 2px #ececec solid;
        border-radius: 3px;
        padding: 10px;

        font-size: 16px;
        font-family: consolas;
    }

    .html-content:focus {
        outline: none !important;
        border-color: #c1c1c1;
    }

    .html-inserter-editor-footer {
        width: 95%;
        margin-bottom: 15px;

        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .send-btn {
        width: 100px;
        height: 30px;

        font-size: 15px;
        font-family: consolas;

        color: white;
        background-color: #219d85;
        border: 0px;
        border-radius: 3px;
        box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    }

    .send-btn:hover{
        background-color: #18bc9c;
        cursor:pointer;
    }
    `;

    const s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = styleSheet;
    (document.head || document.documentElement).appendChild(s);


    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Observer for gmail editor mask's change
    function gmailEditorMaskObserver(observingTarget, config) {
        // Observing the .aSs target
        const gmailEditorMaskObserver = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList' && mutation.target.classList.contains('aSt') && mutation.target.innerHTML) {
                    // console.log(mutation.target);
                    // console.log('A child node has been added or removed.');

                    // locate gmail editor frame
                    const gmailEditorToolBar = document.querySelector("tr.btC");
                    const tds = gmailEditorToolBar.querySelectorAll("td");

                    // insert btn fo inserting html next to delete btn
                    const HTMLInserterBtn = document.createElement('button');
                    HTMLInserterBtn.innerText = '</>';
                    HTMLInserterBtn.className = 'html-inserter-btn';
                    tds[tds.length - 1].insertBefore(HTMLInserterBtn, tds[tds.length - 1].querySelector('div'));

                    const gmailContent = document.querySelector('.gmail_default');

                    // create html inserter UI
                    const HTMLInserterMask = document.createElement('div');
                    HTMLInserterMask.className = 'html-inserter-mask';
                    const HTMLInserterEditor = document.createElement('div');
                    HTMLInserterEditor.className = 'html-inserter-editor';

                    const HTMLInserterEditorTitle = document.createElement('div');
                    HTMLInserterEditorTitle.className = 'html-inserter-editor-title';
                    const closeBtn = document.createElement("button");
                    closeBtn.innerHTML = `×`;
                    closeBtn.className = 'close-btn';

                    const HTMLInserterEditorContainer = document.createElement('div');
                    HTMLInserterEditorContainer.className = 'html-inserter-editor-container';
                    const HTMLContent = document.createElement('textarea');
                    HTMLContent.className = 'html-content';
                    HTMLContent.name = "HTMLContent";
                    HTMLContent.placeholder = '在此填入 HTML 內容';
                    HTMLContent.value = gmailContent.innerHTML;

                    const HTMLInserterEditorFooter = document.createElement('div');
                    HTMLInserterEditorFooter.className = 'html-inserter-editor-footer';
                    const sendBtn = document.createElement("button");
                    sendBtn.innerHTML = `插入 HTML`;
                    sendBtn.className = 'send-btn';

                    HTMLInserterEditorTitle.appendChild(closeBtn);
                    HTMLInserterEditor.appendChild(HTMLInserterEditorTitle);
                    HTMLInserterEditorContainer.appendChild(HTMLContent);
                    HTMLInserterEditor.appendChild(HTMLInserterEditorContainer);
                    HTMLInserterEditorFooter.appendChild(sendBtn);
                    HTMLInserterEditor.appendChild(HTMLInserterEditorFooter);
                    HTMLInserterMask.appendChild(HTMLInserterEditor);
                    body.appendChild(HTMLInserterMask);

                    HTMLInserterBtn.addEventListener('click', function () {
                        HTMLInserterMask.style.visibility = 'inherit';
                        HTMLContent.value = gmailContent.innerHTML;
                    });

                    closeBtn.addEventListener('click', function () {
                        HTMLInserterMask.style.visibility = 'hidden';
                        HTMLContent.value = '';
                    });

                    sendBtn.addEventListener('click', function () {
                        HTMLInserterMask.style.visibility = 'hidden';
                        gmailContent.innerHTML = HTMLContent.value + '';
                    });
                }
            }
        });


        gmailEditorMaskObserver.observe(observingTarget, config);
    }

    // Your code here...
    alert(`Gmail HTML 填寫工具 v${VERSION} 已載入`);

    const body = document.querySelector('body');
    // 郵件撰寫視窗遮罩
    const gmailEditorMask = document.querySelector("body > div.aSs");

    if (gmailEditorMask) {
        // Observing the .aSs target
        gmailEditorMaskObserver(gmailEditorMask, config);
    } else {
        // Create an observer instance linked to the callback function
        const bodyObserver = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList' && mutation.target.classList.contains('aSs')) {
                    // console.log(mutation.target);
                    // console.log('A child node has been added or removed.');

                    // Observing the .aSs target
                    gmailEditorMaskObserver(mutation.target, config);
                }
            }
        });

        // Start observing the target node for configured mutations
        bodyObserver.observe(body, config);
    }
})();