const UNITS = {
    'Thousand': 1e3,
    'Million': 1e6,
    'Billion': 1e9,
    'Trillion': 1e12,
    'Quadrillion': 1e15,
    'Quintillion': 1e18,
    'Sextillion': 1e21,
    'Septillion': 1e24,
    'Octillion': 1e27,
    'Nonillion': 1e30,
    'Decillion': 1e33
};

function parsePowerLevel(value) {
    if (!value || typeof value !== 'string') return NaN;

    // Quitar comas y espacios extra
    value = value.replace(/,/g, '').trim();

    // Caso 1: con unidad (ej: "41.25 Quintillion")
    const unitMatch = value.match(/^([\d.]+)\s+([A-Za-z]+)$/);
    if (unitMatch) {
        const num = parseFloat(unitMatch[1]);
        const unit = unitMatch[2];
        return num * (UNITS[unit] || 1);
    }

    // Caso 2: solo número grande con puntos (ej: "2.000.000")
    if (/^\d{1,3}(\.\d{3})+$/.test(value)) {
        // Quitar puntos (ej: "2.000.000" → "2000000")
        return parseInt(value.replace(/\./g, ''), 10);
    }

    // Caso 3: número crudo (ej: "12345678")
    const num = Number(value);
    return isNaN(num) ? NaN : num;
}

export default parsePowerLevel;
