// API modules are used to perform the AJAX
// communications between client (browser)
// and the server
import sendRequest from './send-request';
const BASE_URL = '/api/runs';

export function addRun(runData, placeId) {
  return sendRequest(`${BASE_URL}/new`, 'POST', {runData, placeId});
}

export function getUserRuns() {
  return sendRequest(BASE_URL);
}

export function getLocalRuns(zipCode) {
  return sendRequest(`${BASE_URL}/local`);
}