import { useRef, useState, useEffect } from 'react';
import * as runsAPI from '../../utilities/runs-api';
import RunCard from '../../components/RunCard/RunCard';

export default function HomePage({ user }) {
  const runData = useRef();
  const [searchRadius, setSearchRadius] = useState(15);

  useEffect(function() {
    async function getNonUserRuns() {
      const runs = await runsAPI.getLocalRuns();
      runData.current = runs;
      console.log('runData: ', runs);
    }
    getNonUserRuns();
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

  function showRunsInSearchRadius(searchRadius) {
    const runs = [];
    if (runs.length > 0) {
      runData.current.forEach(run => {
        const runDistance = calcDistance(user.lat, user.long, run.lat, run.long);
        if (runDistance <= searchRadius) {
          runs.push(run);
        }
      });
      runs.map(run => {
        return <RunCard key={run._id} run={run} />
      });
    } else {
      return <p>No runs in your area</p>
    }
  }

  return (
    <>
      <h1>HomePage</h1>
      {showRunsInSearchRadius(searchRadius)}
    </>
  );
}