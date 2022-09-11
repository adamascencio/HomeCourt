import Map from '../../components/Map/Map';

export default function GoogleLocationSelectForm({ user, nearbyLocations, setNearbyLocations, handleDropdownChange, handleAddLocation, setOptionTagId }) {
  let nearbyCourtOptions = nearbyLocations.map(place => {
    return <option onClick={() => setOptionTagId(place)} key={place.place_id} value={place.place_id}>{place.name} - {place.formatted_address}</option>
  });

  return (
    <form onSubmit={handleAddLocation} className='form-grid'>
      <h2 className="s2">Pick a Location</h2>
      <Map user={user} nearbyLocations={nearbyLocations} setNearbyLocations={setNearbyLocations}  />
      <select className="s2" name="googleId" onChange={handleDropdownChange} required>
        <option value="">-- Select a Location --</option>
        {nearbyCourtOptions}
      </select>
      <button type='submit'>Submit</button>
    </form>
  );
}