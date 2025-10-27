/**
 * API Configuration
 * Base URL is set via environment variable
 */

const API_BASE_URL = process.env.REACT_APP_FastAPI_BASE;

/**
 * Fetch wrapper with optional headers/options that handles JSON responses and errors.
 * @param {string} endpoint - API endpoint (e.g. '/wars/by-year')
 * @param {Object} [options] - Fetch options (optional)
 * @returns {Promise<any>} - Parsed JSON response
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export default API_BASE_URL;
