import { useState } from 'react';
import * as locationsAPI from '../../utilities/locations-api';
import './RunCreateForm.css';

export default function RunCreateForm({ modelLocation, nearbyLocations }) {
  const month = ('0' + (new Date().getMonth()+1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const year = new Date().getFullYear();
  const today = `${year}-${month}-${day}`;
  const selectedCourt = nearbyLocations.find(place => place.place_id === modelLocation.googleId);
  console.log(selectedCourt);
  const selectedCourtImage = getGooglePhotoSrc(selectedCourt);
  const filteredTimes = modelLocation.timeSlots.amTimeSlots
  const [formData, setFormData] = useState({
    date: today,
    time: '12', 
    amPm: 'AM'
  });
  console.log(formData);

  function getGooglePhotoSrc(court) {
    return court.photos ? court.photos[0].getUrl({maxWidth: 400, maxHeight: 400}) : '';
  }

  // Event Handlers

  function handleChange(evt) {
    const newRunData = {...formData, [evt.target.name]: evt.target.value};
    setFormData(newRunData);
  }
  
  function handleRadioBtnClick(evt) {
    console.log('evt: ', evt.target.value)
    const newRunData = {...formData, [evt.target.name]: evt.target.id};
    setFormData(newRunData);
  }

  async function handleSubmitRun(evt) {
    evt.preventDefault();
    await locationsAPI.addRun(formData, modelLocation._id);
    setFormData({
      date: today,
      time: '12',
      amPm: 'AM'
    })
  }

  return (
    <>
      <h2>Schedule Run</h2>
      <div className="RunCreateForm">
        {selectedCourtImage === '' ? 
          <span></span>
          : 
          <img className="s2" src={selectedCourtImage} alt={selectedCourt.name} /> 
        }
        <form onSubmit={handleSubmitRun}>
          <label>Date:</label>
          <input value={formData.date} onChange={handleChange} type="date" min={today} name="date" required />
          <label>Time:</label>
          <select value={formData.time} onChange={handleChange} name="time" required>
            <option value='12'>12:00-1:00</option>
            <option value='1'>1:00-2:00</option>
            <option value='2'>2:00-3:00</option>
            <option value='3'>3:00-4:00</option>
            <option value='4'>4:00-5:00</option>
            <option value='5'>5:00-6:00</option>
            <option value='6'>6:00-7:00</option>
            <option value='7'>7:00-8:00</option>
            <option value='8'>8:00-9:00</option>
            <option value='9'>9:00-10:00</option>
            <option value='10'>10:00-11:00</option>
            <option value='11'>11:00-12:00</option>
          </select>
          <div></div>
          <div className="flex">
            <label>
              <input value={formData.amPm} onClick={handleRadioBtnClick} type="radio" defaultChecked name="amPm" id="AM" required />AM
            </label>
            <label>
              <input value={formData.amPm} onClick={handleRadioBtnClick} type="radio" name="amPm" id="PM" required />PM 
            </label>
          </div>
          <button className='s2'>Submit</button>
        </form>
      </div>
    </>
  );
}