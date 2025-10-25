/**
 * Central export file for all API functions
 * Import API functions from here for better maintainability
 */

// Configuration
export { 
  getAuthToken, 
  setAuthToken, 
  removeAuthToken,
  getAuthHeaders,
  apiFetch 
} from './config';

// Wars API
export {
  getWarsByYear,
  getWarsByRegion,
  getDeadliestWars,
  getAvgWarDuration,
  getLongestWars,
  searchWars
} from './warsApi';

// MID (Militarized Interstate Disputes) API
export {
  getMIDFrequency,
  getMIDRecurrence,
  getDisputeTypes
} from './midApi';

// Alliances API
export {
  getAlliancesByDecade,
  getMostActiveAlliances,
  getAllianceTypeDistribution
} from './alliancesApi';

// Global API
export {
  getGlobalPeaceIndex,
  getGlobalPowerDistribution,
  getGlobalTrends,
  getGlobalPowerShifts,
  getGlobalSummary
} from './globalApi';

// Country API
export {
  getCountrySummary,
  compareCountries,
  getCountryTimeline
} from './countryApi';

// Capabilities API
export {
  getTopGDPCountries,
  getMilitaryForceAverage,
  getCapabilitiesGrowthRate,
  getTopCountriesByIndex
} from './capabilitiesApi';

// Territory & Contiguity API
export {
  getTerritorialGainsLosses,
  getTerritoryByCentury,
  getSharedBorders,
  getConflictLikelihood
} from './territoryApi';

// Interconnected Analysis API
export {
  getAlliancesVsConflicts,
  getArmsVsConflicts
} from './interconnectedApi';

// AI API
export { askAI } from './aiApi';
