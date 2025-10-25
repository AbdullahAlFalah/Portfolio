import { apiFetch } from './config';

/**
 * Check disputes between alliance partners
 * @param {number} limit - Maximum number of pairs to return
 * @returns {Promise} Alliances vs conflicts data
 */
export const getAlliancesVsConflicts = async (limit = 50) => {
  return apiFetch(`/api/v1/analysis/alliances-vs-conflicts?limit=${limit}`);
};

/**
 * Correlate arms imports with conflict involvement
 * @param {number} limit - Maximum number of countries to return
 * @returns {Promise} Arms vs conflicts data
 */
export const getArmsVsConflicts = async (limit = 100) => {
  return apiFetch(`/api/v1/analysis/arms-vs-conflicts?limit=${limit}`);
};
