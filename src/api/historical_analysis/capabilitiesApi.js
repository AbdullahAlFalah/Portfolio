import { apiFetch } from './config';

/**
 * Get top stats countries for a specific year
 * @param {number} year - Year to query
 * @param {number} limit - Number of countries to return
 * @returns {Promise} Top stats countries data
 */
export const getTopStatsCountries = async (year, sort_by, limit = 20) => {
  return apiFetch(`/api/v1/analysis/capabilities/top-stats?year=${year}&sort_by=${sort_by}&limit=${limit}`);
};

/**
 * Get average military personnel per year
 * @returns {Promise} Military force average data
 */
export const getMilitaryForceAverage = async () => {
  return apiFetch('/api/v1/analysis/capabilities/military-force-avg');
};

/**
 * Get growth rate of composite index per country
 * @param {number} top - Number of countries to return
 * @returns {Promise} Growth rate data
 */
export const getCapabilitiesGrowthRate = async (top = 20) => {
  return apiFetch(`/api/v1/analysis/capabilities/growth-rate?top=${top}`);
};

/**
 * Get top countries by composite index for a specific year
 * @param {number} year - Year to query
 * @param {number} top - Number of countries to return
 * @returns {Promise} Top countries data
 */
export const getTopCountriesByIndex = async (year, top = 10) => {
  return apiFetch(`/api/v1/analysis/capabilities/top-countries?year=${year}&top=${top}`);
};
