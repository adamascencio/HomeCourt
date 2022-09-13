import GameDetails from '../GameDetails/GameDetails';

export default function RunCard({ run, user }) {
  const gameDetails = run.runs.map(game => {
    return <GameDetails key={game._id} game={game} user={user} />
  });
  return (
    <div className='card'>
      <div className='card-body'>
        <h4>{run.name}</h4>
        <p>{run.address}</p>
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