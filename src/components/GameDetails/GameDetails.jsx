export default function GameCard({ game }) {
  const gameDate = new Date(game.date).toLocaleDateString();
  const playerCount = game.players.length > 1 ? `${game.players.length} players` : `${game.players.length} player`;
  
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Players Attending</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gameDate}</td>
          <td>{game.time}</td>
          <td>{playerCount}</td>
          <button className='btn btn-primary'>Edit</button>
        </tr>
      </tbody>
    </table>
  );
}