import { apiFetch } from './config';

/**
 * Ask AI a question about the dataset
 * The AI will automatically match your query to the appropriate analysis route
 * and provide intelligent insights based on the data.
 * 
 * @param {string} query - User's natural language question
 * @returns {Promise<Object>} AI analysis response with matched route and analysis
 * @example
 * const response = await askAI("What were the deadliest wars?");
 * console.log(response.matched_route); // "/api/v1/analysis/wars/deadliest"
 * console.log(response.analysis); // AI-generated analysis text
 */
export const askAI = async (query) => {
  return apiFetch('/api/v1/ai/ask', {
    method: 'POST',
    body: JSON.stringify({ query })
  });
};
