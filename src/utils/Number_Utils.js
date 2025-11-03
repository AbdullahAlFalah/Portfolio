// Helper 1: format military personnel
const formatMilper = (m) => {
    // - If missing -> "N/A"
    if (m === undefined || m === null) return 'N/A';

    // - If not a number -> return as-is
    const n = Number(m);
    if (Number.isNaN(n)) return String(m);

    // - If API returns a small integer (e.g. 155) that actually means 155k -> show "155k"
    if (n > 0 && n < 1000 && Number.isInteger(n)) return `${n}k`;

    // - If API returns a value >= 1000 -> treat per your note as millions (e.g. 1500 -> 1.5M)
    if (n >= 1000) {
        const millions = n / 1000;
        return Number.isInteger(millions) ? `${millions}M` : `${millions.toFixed(1)}M`;
    }

    return n.toLocaleString();
};

export { formatMilper };
