export default function UserCreateLocationForm({ handleAddLocation, showDropdown, setShowDropdown, handleChange, formData }) {
  return (
    <form onSubmit={handleAddLocation} className='form-grid'>
      <h2 className="s2">Create a Location</h2>
      <button className="s2" onClick={() => setShowDropdown(!showDropdown)}>{showDropdown ? 'Enter New Location' : 'Choose a Local Location'}</button>
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
  );
}