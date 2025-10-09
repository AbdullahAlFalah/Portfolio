export function getApiBase(): string {
    // Bring environment variable
    const apiBase = process.env.REACT_APP_FLASK_API_BASE;
    console.log("🔍 REACT_APP_FLASK_API_BASE =", apiBase);

    if (apiBase) return apiBase;

    console.warn("⚠️ REACT_APP_FLASK_API_BASE not found. Using fallback URL...");
    return "https://my-flask-backend-oyy9.onrender.com"; // fallback
}
