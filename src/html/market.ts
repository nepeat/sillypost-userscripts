export const updateBalance = async function (balance: number) {
    const balanceElement = document.getElementById("sillies-owned");

    if (balanceElement) {
        balanceElement.textContent = balance.toString();
    }
}

export const updateBeans = async function (beans: number) {
    const beansElement = document.getElementById("header-beans");
    if (beansElement) {
        // we're going to assume that the beans element is the third node
        beansElement.childNodes[2].textContent = ' ' + beans.toString() + ' beans';
    }
}