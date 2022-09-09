import { useState } from 'react';
import Map from '../../components/Map/Map';
import * as locationsAPI from '../../utilities/locations-api';
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
  let nearbyCourtOptions = nearbyLocations.map(place => {
    return <option onClick={() => setLocation(place)} key={place.place_id} value={place.place_id}>{place.name} - {place.formatted_address}</option>
  });

  // Event Handlers

  function handleChange(evt) {
    const newAppData = {...formData, [evt.target.name]: evt.target.value};
    setFormData(newAppData);
    console.log(formData);
  }

  function handleDropdownChange(evt) {
    setLocation(evt.target.value);
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
      console.log('location data: ', locationData);
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
      <button onClick={() => setShowDropdown(!showDropdown)}>{showDropdown ? 'Enter New Location' : 'Choose a Local Location'}</button>
      {showDropdown ? 
        <form onSubmit={handleAddLocation} className='form-grid'>
          <h2 className="s2">Pick a Location</h2>
          <Map user={user} nearbyLocations={nearbyLocations} setNearbyLocations={setNearbyLocations}  />
          <select className="s2" name="googleId" onChange={handleDropdownChange} required>
            <option value="">-- Select a Location --</option>
            {nearbyCourtOptions}
          </select>
          <button type='submit'>Submit</button>
        </form>
        : 
        <form onSubmit={handleAddLocation} className='form-grid'>
          <h2 className="s2">Create a Location</h2>
          <label>Court Name: </label>
          <input 
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Address: </label>
          <input 
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label>City: </label>
          <input 
            type='text'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
          />
          <label>State: </label>
          <input 
            type='text'
            name='state'
            value={formData.state}
            onChange={handleChange}
            required
          />
          <label>Zip Code: </label>
          <input 
            type='number'
            name='zipCode'
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      }
    </main>
  );
}







