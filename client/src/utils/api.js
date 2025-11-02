const ENV_BASE = (import.meta.env.VITE_BACKEND_URL || '').trim().replace(/\/+$/, '');
const DEV_FALLBACK = import.meta.env.DEV ? 'http://localhost:5000' : '';
export const API_BASE = ENV_BASE || DEV_FALLBACK;

export async function getJson(pathOrUrl, init) {
    const url = pathOrUrl.startsWith('http')
        ? pathOrUrl
        : `${API_BASE}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;

    const res = await fetch(url, init);
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 160)}`);
    try { return JSON.parse(text); }
    catch { throw new Error(`Expected JSON but got: ${text.slice(0, 160)}`); }
}