import { useState, useEffect } from 'react';
import * as runsAPI from '../../utilities/runs-api';
import RunCard from '../../components/RunCard/RunCard';
import './HomePage.css';

export default function HomePage({ user, runData, setRunData, localRuns, setLocalRuns, userRuns, setUserRuns }) {
  const [searchRadius, setSearchRadius] = useState(15);

  useEffect(function() {
    async function getRuns() {
      const runs = await runsAPI.getAllRuns();
      setRunData(runs);
    }
    getRuns();
  }, []);

  const runCards = localRuns.map(run => {
    return <RunCard key={run._id} run={run} user={user} runData={runData} setRunData={setRunData} setLocalRuns={setLocalRuns} userRuns={userRuns} setUserRuns={setUserRuns} />
  });

  function calcDistance(userLat, userLong, placeLat, placeLong) {
      const R = 3958.8; // Radius of the Earth in miles
      const rlat1 = userLat * (Math.PI/180); // Convert degrees to radians
      const rlat2 = placeLat * (Math.PI/180); // Convert degrees to radians
      const difflat = rlat2-rlat1; // Radian difference (latitudes)
      const difflon = (placeLong - userLong) * (Math.PI/180); // Radian difference (longitudes)

      const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }

  function findRunsInSearchRadius(searchRadius) {
    const runs = [];
    if (runData.length > 0) {
      runData.forEach(run => {
        let runDistance = calcDistance(user.lat, user.long, run.lat, run.long);
        if (runDistance <= searchRadius && run.runs.length > 0) {
          runs.push(run);
        }
      });
    }
    setLocalRuns(runs); 
  }

  function handleSearchRadiusChange(evt) {
    setSearchRadius(evt.target.value);
  }

  return (
    <div className='image-bg-container'>
      <h1>Find Runs</h1>
      <div className='flex-col'>
        <input type="number" value={searchRadius} onChange={handleSearchRadiusChange} />
        <button onClick={() => findRunsInSearchRadius(searchRadius)}>Find Runs (miles)</button> 
      </div>
      <div className='MyRunsPage'>
        {runCards}
      </div>
    </div>
  );
}