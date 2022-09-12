import * as runsAPI from '../../utilities/runs-api';
import './GameDetails.css';

export default function GameCard({ game, locationId, user }) {
  const gameDate = new Date(game.date).toLocaleDateString();

  async function joinGame() {
    await runsAPI.joinRun(locationId, game._id);
  }
  
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">AM/PM</th>
          <th scope="col">Players Attending</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gameDate}</td>
          <td>{game.time}</td>
          <td>{game.amPm}</td>
          <td>{game.players.length}</td>
          {game.creator === user._id ? 
            <button className='blue-bg btn btn-primary'>Edit</button> 
            : 
            <button onClick={joinGame} className='blue-bg btn btn-primary'>Join</button>}
        </tr>
      </tbody>
    </table>
  );
}