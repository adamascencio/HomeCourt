import { useNavigate } from 'react-router-dom';
import * as runsAPI from '../../utilities/runs-api';
import './GameDetails.css';

export default function GameCard({ game, locationId, user }) {
  const navigate = useNavigate();
  const gameDate = new Date(game.date).toLocaleDateString();

  async function joinGame() {
    await runsAPI.joinRun(game._id);
    navigate('/runs');
  }

  async function deleteRun() {
    await runsAPI.deleteRun(game._id);
  }

  async function leaveGame() {
    await runsAPI.leaveRun(game._id);
    navigate('/runs');
  }

  function renderButtons() {
    if (game.creator === user._id) {
      return (
        <button className="btn btn-sm btn-danger red-bg" onClick={deleteRun}>Delete</button>
      );
    } else {
      if (game.players.includes(user._id)) {
        return (
          <button className="btn btn-sm btn-danger red-bg" onClick={leaveGame}>Leave</button>
        );
      } else {
        return (
          <button className="btn btn-sm btn-success blue-bg" onClick={joinGame}>Join</button>
        );
      }
    }
  }
  
  return (
    <tbody>
      <tr>
        <td>{gameDate}</td>
        <td>{game.time}</td>
        <td>{game.amPm}</td>
        <td>{game.players.length}</td>
        {renderButtons()}
      </tr>
    </tbody>
  );
}