// ==UserScript==
// @name sillymarket helpers!
// @description helpers for sillymarket!
// @version 0.0.1-2025-05-11T04:21:37.207Z
// @author nepeat
// @match https://sillypost.net/games/sillyexchange
// @downloadURL https://raw.githubusercontent.com/nepeat/sillypost-userscripts/refs/heads/main/build/market-helpers.user.js
// @grant none
// @icon https://www.google.com/s2/favicons?sz=64&domain=sillypost.net
// @namespace https://owo.me/
// @updateURL https://raw.githubusercontent.com/nepeat/sillypost-userscripts/refs/heads/main/build/market-helpers.user.js
// ==/UserScript==

(() => { // webpackBootstrap
var __webpack_modules__ = ({});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = () => ("1.3.9")
})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.3.9";

})();
/************************************************************************/
const getBalance = async ()=>{
    const res = await fetch("https://sillypost.net/games/sillyexchange/owned", {
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const owned = await res.text();
    return Number.parseInt(owned);
};
const updateBalance = async ()=>{
    const balanceElement = document.getElementById("sillies-owned");
    if (balanceElement) {
        const balance = await getBalance();
        balanceElement.textContent = balance.toString();
    }
};
const tradeMax = async (buy)=>{
    const balance = await getBalance();
    const action = buy ? "buy" : "sell";
    console.log("tradeMax clicked, buying", buy, "balance", balance);
    let stonks = 0;
    if (buy) {
        stonks = 1000 - balance;
    } else {
        stonks = balance;
    }
    // construct endpoint and add amount
    let endpoint = `https://sillypost.net/games/sillyexchange/${action}/${stonks}`;
    // make the request
    const res = await fetch(endpoint, {
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    // update the balance if successful
    if (res.ok) {
        await updateBalance();
    }
};
(async function() {
    'use strict';
    // Your code here...
    const actionsDiv = document.getElementById("actions");
    if (actionsDiv) {
        // Append the buy / sell max buttons
        const buyMaxButton = document.createElement("button");
        buyMaxButton.textContent = "Buy Max";
        actionsDiv.appendChild(buyMaxButton);
        const sellMaxButton = document.createElement("button");
        sellMaxButton.textContent = "Sell Max";
        actionsDiv.appendChild(sellMaxButton);
        // Add action handlers for the new buttons
        buyMaxButton.onclick = async function() {
            await tradeMax(true);
        };
        sellMaxButton.onclick = async function() {
            await tradeMax(false);
        };
    }
    // Prepend the grafana iframe to the description
    const descriptionDiv = document.getElementById("description");
    if (descriptionDiv) {
        const grafanaIframe = document.createElement("iframe");
        grafanaIframe.src = "https://grafana.generalprogramming.org/public-dashboards/3d1432bcda424694b133409c3f80d69d?refresh=auto";
        grafanaIframe.width = "1024";
        grafanaIframe.height = "400";
        grafanaIframe.frameBorder = "0";
        descriptionDiv.prepend(grafanaIframe);
    }
})();

})()
;
//# sourceMappingURL=market-helpers.js.map