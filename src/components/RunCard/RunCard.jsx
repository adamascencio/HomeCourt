import GameDetails from '../GameDetails/GameDetails';

export default function RunCard({ run, user }) {
  const gameDetails = run.runs.map(game => {
    return <GameDetails key={game._id} game={game} locationId={run._id} user={user} />
  });
  return (
    <div className='card'>
      <div className='card-body'>
        <h3>{run.name}</h3>
        <p>{run.address}</p>
        {gameDetails}
      </div>
    </div>
  );
}