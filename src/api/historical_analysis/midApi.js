import { apiFetch } from './config';

/**
 * Get MID (Militarized Interstate Disputes) frequency by year
 * @returns {Promise} MID frequency data
 */
export const getMIDFrequency = async () => {
  return apiFetch('/api/v1/analysis/mid/frequency');
};

/**
 * Get countries most involved in MIDs
 * @param {number} top - Number of countries to return
 * @returns {Promise} MID recurrence data
 */
export const getMIDRecurrence = async (top = 10) => {
  return apiFetch(`/api/v1/analysis/mid/recurrence?top=${top}`);
};

/**
 * Get dispute outcome distribution
 * @returns {Promise} Dispute outcome data
 */
export const getDisputeTypes = async () => {
  return apiFetch('/api/v1/analysis/mid/dispute-outcomes');
};
