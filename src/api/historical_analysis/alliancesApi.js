import { apiFetch } from './config';

/**
 * Get alliances grouped by decade
 * @returns {Promise} Alliances by decade data
 */
export const getAlliancesByDecade = async () => {
  return apiFetch('/api/v1/analysis/alliances/by-decade');
};

/**
 * Get most active countries in alliances
 * @param {number} top - Number of countries to return
 * @returns {Promise} Most active countries data
 */
export const getMostActiveAlliances = async (top = 10) => {
  return apiFetch(`/api/v1/analysis/alliances/most-active?top=${top}`);
};

/**
 * Get alliance type distribution
 * @returns {Promise} Alliance types data
 */
export const getAllianceTypeDistribution = async () => {
  return apiFetch('/api/v1/analysis/alliances/type-distribution');
};
