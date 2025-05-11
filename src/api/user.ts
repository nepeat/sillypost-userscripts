export const getBeansBalance = async (): Promise<number> => {
    const res = await fetch("https://sillypost.net/beans", {
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    const owned = await res.text();

    return Number.parseInt(owned);
}