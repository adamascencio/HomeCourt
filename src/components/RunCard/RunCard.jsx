import GameDetails from '../GameDetails/GameDetails';

export default function RunCard({ run, user, runData, setRunData, userRuns, setUserRuns}) {
  const gameDetails = run.runs.map(game => {
    return <GameDetails key={game._id} game={game} user={user} runData={runData} setRunData={setRunData} userRuns={userRuns} setUserRuns={setUserRuns} />
  });
  const index = run.address.indexOf('United') - 2;
  const formattedAddress = run.address.substring(0, index);

  return (
    <div className='card'>
      <div className='card-body'>
        <h4>{run.name}</h4>
        <p>{formattedAddress}</p>
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">AM/PM</th>
              <th scope="col">Players</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {gameDetails}
        </table>
      </div>
    </div>
  );
}