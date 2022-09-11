// API modules are used to perform the AJAX
// communications between client (browser)
// and the server
import sendRequest from './send-request';
const BASE_URL = '/api/locations';

export function addLocation(location) {
  return sendRequest(BASE_URL, 'POST', location);
}

export function addRun(runData, placeId) {
  return sendRequest(`${BASE_URL}/runs`, 'POST', {runData, placeId});
}