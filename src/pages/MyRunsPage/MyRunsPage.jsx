import RunCard from "../../components/RunCard/RunCard";
import './MyRunsPage.css';

export default function MyRunsPage({ user, runData, setRunData, userRuns, setUserRuns }) {
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