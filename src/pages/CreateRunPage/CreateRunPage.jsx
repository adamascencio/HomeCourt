import { useState } from 'react';
import "./CreateRunPage.css";

export default function CreateRunPage({ user }) {
  const [formData, setFormData] = useState({
    date: '',
    location: ''
  });

  function handleChange(evt) {
    const newAppData = {...formData, [evt.target.name]: evt.target.value};
    setFormData(newAppData);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
  }

  return (
    <main>
      <h1>Create Run</h1>
      <form onSubmit={handleSubmit} className='form-grid'>
        <h2 className="s2">Pick a Location</h2>
        <label htmlFor="date">Date</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          id="date" 
        />
        <label htmlFor="location">Add a Location</label>
        <input 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          id="location" 
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}