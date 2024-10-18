const DEFAULT_LOCALE = { code: 'en-US', currency: 'USD' };

function processInput( inputValue ) {
    if (inputValue == null || Number.isNaN(inputValue)) return null;
    return Number(inputValue);
}

export function fCurrency( inputValue, options ) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return '';

    const fm = new Intl.NumberFormat(locale.code, {
        style: 'currency',
        currency: locale.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm;
}