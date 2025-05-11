// ==UserScript==
// @name         sillymarket helpers!
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author       You
// @match        https://sillypost.net/games/sillyexchange
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sillypost.net
// @grant        none
// @updateURL    https://raw.githubusercontent.com/nepeat/sillypost-userscripts/refs/heads/main/build/market-helpers.js
// @downloadURL  https://raw.githubusercontent.com/nepeat/sillypost-userscripts/refs/heads/main/build/market-helpers.js
// ==/UserScript==

const getBalance = async () => {
    const res = await fetch("https://sillypost.net/games/sillyexchange/owned", {
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const owned = await res.text();

    return Number.parseInt(owned);
}

const updateBalance = async () => {
    const balanceElement = document.getElementById("sillies-owned");
    balanceElement.textContent = await getBalance();
}

const tradeMax = async (buy) => {
    const balance = await getBalance();
    const action = buy ? "buy" : "sell";

    console.log("tradeMax clicked, buying", buy, "balance", balance);

    let stonks = 0

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
}

(async function () {
    'use strict';

    // Your code here...
    const actionsDiv = document.getElementById("actions");

    // Append the buy / sell max buttons
    const buyMaxButton = document.createElement("button");
    buyMaxButton.textContent = "Buy Max";
    actionsDiv.appendChild(buyMaxButton);

    const sellMaxButton = document.createElement("button");
    sellMaxButton.textContent = "Sell Max";
    actionsDiv.appendChild(sellMaxButton);

    // Add action handlers for the new buttons
    buyMaxButton.onclick = async function () {
        await tradeMax(true);
    };

    sellMaxButton.onclick = async function () {
        await tradeMax(false);
    }

    // Prepend the grafana iframe to the description
    const descriptionDiv = document.getElementById("description");
    const grafanaIframe = document.createElement("iframe");

    grafanaIframe.src = "https://grafana.generalprogramming.org/public-dashboards/3d1432bcda424694b133409c3f80d69d?refresh=auto";
    grafanaIframe.width = "1024";
    grafanaIframe.height = "400";
    grafanaIframe.frameborder = "0";
    descriptionDiv.prepend(grafanaIframe);
})();