import { useEffect, useState } from "react";
import * as runsAPI from "../../utilities/runs-api";
import RunCard from "../../components/RunCard/RunCard";
import './MyRunsPage.css';

export default function MyRunsPage({ user }) {
  const [runs, setRuns] = useState([]);
  const runCards = runs.map((run, idx) => {
   return <RunCard key={run._id} run={run} user={user} />
  });

  useEffect(function() {
    async function getRuns() {
      const userRuns = await runsAPI.getUserRuns();
      setRuns(userRuns);
    }
    getRuns();
  }, []);

  return (
    <div className="main-container">
      <h1>My Runs</h1>
      <div className="MyRunsPage">
        {runCards}
      </div>
    </div>
  );
}