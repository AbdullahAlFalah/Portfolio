import { apiFetch } from './config';

/**
 * Get global peace index
 * @returns {Promise} Peace index data
 */
export const getGlobalPeaceIndex = async () => {
  return apiFetch('/api/v1/analysis/global/peace-index');
};

/**
 * Get global power distribution
 * @returns {Promise} Power distribution data
 */
export const getGlobalPowerDistribution = async () => {
  return apiFetch('/api/v1/analysis/global/power-distribution');
};

/**
 * Get global trends (wars vs alliances)
 * @returns {Promise} Global trends data
 */
export const getGlobalTrends = async () => {
  return apiFetch('/api/v1/analysis/global/trends');
};

/**
 * Get global power shifts
 * @returns {Promise} Power shifts data
 */
export const getGlobalPowerShifts = async () => {
  return apiFetch('/api/v1/analysis/global/power-shifts');
};

/**
 * Get global summary
 * @returns {Promise} Global summary data
 */
export const getGlobalSummary = async () => {
  return apiFetch('/api/v1/analysis/global-summary');
};
