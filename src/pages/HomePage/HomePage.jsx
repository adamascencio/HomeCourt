import { useRef, useState, useEffect } from 'react';
import * as runsAPI from '../../utilities/runs-api';
import RunCard from '../../components/RunCard/RunCard';

export default function HomePage({ user }) {
  const runData = useRef([]);
  const [localRuns, setLocalRuns] = useState([]);
  const [searchRadius, setSearchRadius] = useState(1000);
  const runCards = localRuns.map(run => {
    return <RunCard key={run._id} run={run} user={user} />
  });

  useEffect(function() {
    async function getNonUserRuns() {
      const runs = await runsAPI.getLocalRuns();
      runData.current = runs;
    }
    getNonUserRuns();
  }, [runData]);

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
    console.log('runData: ', runData.current);
    if (runData.current.length > 0) {
      runData.current.forEach(run => {
        let runDistance = calcDistance(user.lat, user.long, run.lat, run.long);
        if (runDistance <= searchRadius) {
          runs.push(run);
          console.log('find runs: ', runs);
        }
      });
    }
    setLocalRuns(runs); 
  }

  return (
    <>
      <h1>HomePage</h1>
      <div className="MyRunsPage">
        {runCards}
      </div>
      <button onClick={() => findRunsInSearchRadius(searchRadius)}>Find Local Runs</button> 
    </>
  );
}