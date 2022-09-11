import { useState } from 'react';
import * as locationsAPI from '../../utilities/locations-api';
import RunCreateForm from '../../components/RunCreateForm/RunCreateForm';
import GoogleLocationSelectForm from '../../components/GoogleLocationSelectForm/GoogleLocationSelectForm';
import "./CreateRunPage.css";

export default function CreateRunPage({ user, todayStr }) {
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [optionTagId, setOptionTagId] = useState(null);
  const [modelLocation, setModelLocation] = useState(null);

  // Event Handlers

  function handleDropdownChange(evt) {
    setOptionTagId(evt.target.value);
  }

  async function handleAddLocation(evt) {
    evt.preventDefault();
    const selectedCourt = nearbyLocations.find(place => place.place_id === optionTagId);
    const locationData = {
      name: selectedCourt.name,
      address: selectedCourt.formatted_address,
      city: selectedCourt.formatted_address.split(',')[1],
      state: selectedCourt.formatted_address.split(',')[2].split(' ')[1],
      zipCode: selectedCourt.formatted_address.split(',')[2].split(' ')[2],
      googleId: selectedCourt.place_id
    };
    const location = await locationsAPI.addLocation(locationData);
    setModelLocation(location);
  }

  return (
    <main>
      <h1>Create Run</h1>
      {modelLocation ? 
        <RunCreateForm modelLocation={modelLocation} nearbyLocations={nearbyLocations} todayStr={todayStr} />
        :
        <GoogleLocationSelectForm user={user} nearbyLocations={nearbyLocations} setNearbyLocations={setNearbyLocations} setOptionTagId={setOptionTagId} handleDropdownChange={handleDropdownChange} handleAddLocation={handleAddLocation} />
      }
    </main>
  );
}







