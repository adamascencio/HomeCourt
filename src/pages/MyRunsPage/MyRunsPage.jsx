import { useEffect, useState } from "react";
import * as runsAPI from "../../utilities/runs-api";
import RunCard from "../../components/RunCard/RunCard";
import './MyRunsPage.css';

export default function MyRunsPage({ user }) {
  const [runs, setRuns] = useState([]);
  const runCards = runs.map((run, idx) => {
   return <RunCard key={run._id} run={run} />
  });

  useEffect(function() {
    async function getRuns() {
      const userRuns = await runsAPI.getUserRuns();
      setRuns(userRuns);
    }
    getRuns();
  }, []);

  return (
    <>
      <h1>My Runs</h1>
      <div className="MyRunsPage">
        {runCards}
      </div>
    </>
  );
}