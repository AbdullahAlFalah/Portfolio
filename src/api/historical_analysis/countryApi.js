import { apiFetch } from './config';

/**
 * Get country summary
 * @param {number} ccode - COW country code
 * @returns {Promise} Country summary data
 */
export const getCountrySummary = async (ccode) => {
  return apiFetch(`/api/v1/analysis/country-summary?ccode=${ccode}`);
};

/**
 * Compare two countries
 * @param {number} ccodeA - First country code
 * @param {number} ccodeB - Second country code
 * @returns {Promise} Comparison data
 */
export const compareCountries = async (ccodeA, ccodeB) => {
  return apiFetch(`/api/v1/analysis/compare/${ccodeA}/${ccodeB}`);
};

/**
 * Get country timeline
 * @param {number} ccode - COW country code
 * @returns {Promise} Timeline data
 */
export const getCountryTimeline = async (ccode) => {
  return apiFetch(`/api/v1/analysis/timeline/${ccode}`);
};
