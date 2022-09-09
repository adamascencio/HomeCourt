import { useState } from 'react';
import * as locationsAPI from '../../utilities/locations-api';
import RunCreateForm from '../../components/RunCreateForm/RunCreateForm';
import GoogleLocationSelectForm from '../../components/GoogleLocationSelectForm/GoogleLocationSelectForm';
import UserCreateLocationForm from '../../components/UserCreateLocationForm/UserCreateLocationForm';
import "./CreateRunPage.css";

export default function CreateRunPage({ user }) {
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    googleId: undefined
  });

  // Event Handlers

  function handleDropdownChange(evt) {
    setLocation(evt.target.value);
  }

  function handleChange(evt) {
    const newAppData = {...formData, [evt.target.name]: evt.target.value};
    setFormData(newAppData);
  }

  function handleAddLocation(evt) {
    evt.preventDefault();
    if (showDropdown) {
      const selectedCourt = nearbyLocations.find(place => place.place_id === location);
      const locationData = {
        name: selectedCourt.name,
        address: selectedCourt.formatted_address,
        city: selectedCourt.formatted_address.split(',')[1],
        state: selectedCourt.formatted_address.split(',')[2].split(' ')[1],
        zipCode: selectedCourt.formatted_address.split(',')[2].split(' ')[2],
        googleId: selectedCourt.place_id
      };
      locationsAPI.addLocation(locationData);
    } else {
      locationsAPI.addLocation(formData);
    }
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      googleId: undefined
    });
  }

  return (
    <main>
      <h1>Create Run</h1>
      {location ? 
        <RunCreateForm />
        :
        <>
          {showDropdown ? 
            <GoogleLocationSelectForm user={user} nearbyLocations={nearbyLocations} setNearbyLocations={setNearbyLocations} showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleDropdownChange={handleDropdownChange} handleAddLocation={handleAddLocation} />
            : 
            <UserCreateLocationForm handleAddLocation={handleAddLocation} showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleChange={handleChange} formData={formData} />
          }
        </>
      }
    </main>
  );
}







