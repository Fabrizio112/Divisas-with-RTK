export function verifyCurrency(currencies, currency) {
    let currencyExistOrNot = currencies.find(el => el === currency.toUpperCase())
    if (currencyExistOrNot === undefined) {
        return true
    }
    return currency
}