import { tradeMax } from "./api/market";

const main = async () => {
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
        buyMaxButton.onclick = async function () {
            await tradeMax(true);
        };

        sellMaxButton.onclick = async function () {
            await tradeMax(false);
        }
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
};

(main());