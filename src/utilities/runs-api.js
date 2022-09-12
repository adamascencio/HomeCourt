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

export function getLocalRuns() {
  return sendRequest(`${BASE_URL}/local`);
}

export function joinRun(runId) {
  return sendRequest(`${BASE_URL}/join`, 'PUT', {runId});
}

export function deleteRun(runId) {
  return sendRequest(`${BASE_URL}/delete`, 'DELETE', {runId});
}