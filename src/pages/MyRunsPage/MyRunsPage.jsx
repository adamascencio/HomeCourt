import { useEffect } from "react";
import * as runsAPI from '../../utilities/runs-api';
import RunCard from "../../components/RunCard/RunCard";
import './MyRunsPage.css';

export default function MyRunsPage({ user, runData, setRunData, userRuns, setUserRuns }) {
  useEffect(function() {
    async function getUserRuns() {
      const getRuns = await runsAPI.getUserRuns();
      setUserRuns(getRuns);
    }
    getUserRuns();
  }, []);

  const runCards = userRuns.map(run => {
   return <RunCard key={run._id} run={run} user={user} runData={runData} setRunData={setRunData} userRuns={userRuns} setUserRuns={setUserRuns} />
  });

  return (
    <div className="image-bg-container">
      <h1>My Runs</h1>
      <div className="MyRunsPage">
        {runCards}
      </div>
    </div>
  );
}