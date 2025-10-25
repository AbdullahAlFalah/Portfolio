import { apiFetch } from './config';

/**
 * Get wars grouped by year
 * @returns {Promise} Wars by year data
 */
export const getWarsByYear = async () => {
  return apiFetch('/api/v1/analysis/wars/by-year');
};

/**
 * Get wars grouped by region
 * @param {number} limit - Maximum number of regions to return
 * @returns {Promise} Wars by region data
 */
export const getWarsByRegion = async (limit = 50) => {
  return apiFetch(`/api/v1/analysis/wars/by-region?limit=${limit}`);
};

/**
 * Get deadliest wars
 * @param {number} top - Number of wars to return
 * @returns {Promise} Deadliest wars data
 */
export const getDeadliestWars = async (top = 10) => {
  return apiFetch(`/api/v1/analysis/wars/deadliest?top=${top}`);
};

/**
 * Get average war duration
 * @returns {Promise} Average duration data
 */
export const getAvgWarDuration = async () => {
  return apiFetch('/api/v1/analysis/wars/avg-duration');
};

/**
 * Get longest wars
 * @param {number} top - Number of wars to return
 * @returns {Promise} Longest wars data
 */
export const getLongestWars = async (top = 10) => {
  return apiFetch(`/api/v1/analysis/wars/longest?top=${top}`);
};

/**
 * Search wars by name
 * @param {string} query - Search query
 * @param {number} limit - Maximum results
 * @returns {Promise} Search results
 */
export const searchWars = async (query, limit = 50) => {
  return apiFetch(`/api/v1/analysis/search/wars?q=${encodeURIComponent(query)}&limit=${limit}`);
};
