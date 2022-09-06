import fetch from 'node-fetch';

const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDYbTfV1c52W3gLMwxvOZQgEBBSb2aj4og&components=postal_code:`;

export async function getLatLong(zipCode) {
  const response = await fetch(`${BASE_URL}${zipCode}`);
  const data = await response.json();
  return data.results[0].geometry.location;
}
