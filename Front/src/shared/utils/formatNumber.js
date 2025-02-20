const DEFAULT_LOCALE = { code: 'es-AR', currency: 'ARS' };

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
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options,
    }).format(number);

    return fm;
}