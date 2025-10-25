import { apiFetch } from './config';

/**
 * Get territorial gains and losses by state
 * @param {number} limit - Maximum number of states to return
 * @returns {Promise} Territorial gains/losses data
 */
export const getTerritorialGainsLosses = async (limit = 50) => {
  return apiFetch(`/api/v1/analysis/territory/gains-losses?limit=${limit}`);
};

/**
 * Get territorial changes grouped by century
 * @returns {Promise} Territorial changes by century data
 */
export const getTerritoryByCentury = async () => {
  return apiFetch('/api/v1/analysis/territory/by-century');
};

/**
 * Get number of neighbors per state (contiguity)
 * @param {number} limit - Maximum number of states to return
 * @returns {Promise} Shared borders data
 */
export const getSharedBorders = async (limit = 50) => {
  return apiFetch(`/api/v1/analysis/contiguity/shared-borders?limit=${limit}`);
};

/**
 * Get conflict likelihood between contiguous pairs
 * @param {number} limit - Maximum number of pairs to return
 * @returns {Promise} Conflict likelihood data
 */
export const getConflictLikelihood = async (limit = 20) => {
  return apiFetch(`/api/v1/analysis/contiguity/conflict-likelihood?limit=${limit}`);
};
