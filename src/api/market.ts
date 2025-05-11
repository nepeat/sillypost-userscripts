import { updateBalance, updateBeans } from "../html/market";
import { getBeansBalance } from "./user";

export const getBalance = async (): Promise<number> => {
    const res = await fetch("https://sillypost.net/games/sillyexchange/owned", {
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const owned = await res.text();

    return Number.parseInt(owned);
}

export const tradeMax = async (buy: boolean) => {
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
        const newBeanBalance = await getBeansBalance();
        await updateBalance(balance + (buy ? stonks : -stonks));
        await updateBeans(newBeanBalance);
    }
}