import { useNavigate } from 'react-router-dom';
import * as runsAPI from '../../utilities/runs-api';

export default function GameButtons({ game, user, setPlayerCount }) {
  const navigate = useNavigate();

  async function joinGame() {
    await runsAPI.joinRun(game._id);
    setPlayerCount(game.players.length + 1);
    navigate('/runs');
  }

  async function deleteRun() {
    await runsAPI.deleteRun(game._id);
  }

  async function leaveGame() {
    await runsAPI.leaveRun(game._id);
    setPlayerCount(game.players.length - 1);
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

  return (renderButtons());
}