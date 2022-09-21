import { useNavigate } from 'react-router-dom';
import * as runsAPI from '../../utilities/runs-api';

export default function GameButtons({ game, user, runData, setRunData, userRuns, setUserRuns }) {
  const navigate = useNavigate();

  async function joinGame() {
    const joinedRun = await runsAPI.joinRun(game._id);
    console.log('runData: ', runData)
    const removeUpdatedLocation = runData.filter(run => run._id !== joinedRun._id);
    const updatedRunData = [...removeUpdatedLocation, joinedRun];
    setRunData(updatedRunData);
    console.log(updatedRunData)
    // const newUserRunsData = [...userRuns, joinedRun];
    // setUserRuns(newUserRunsData);
  }

  async function deleteRun() {
    const updatedRun = await runsAPI.deleteRun(game._id);
    const removeUpdatedLocation = runData.filter(run => run._id !== updatedRun._id);
    const removeUpdatedUserRun = userRuns.filter(run => run._id !== updatedRun._id);
    setRunData([...removeUpdatedLocation, updatedRun]);
    setUserRuns([...removeUpdatedUserRun, updatedRun]);
  }

  async function leaveGame() {
    const leftRun = await runsAPI.leaveRun(game._id);
    runData.current = runData.current.map(run => {
      if (run._id === leftRun._id) return leftRun;
      return run;
    });
    const newUserRunsData = userRuns.filter(run => run._id !== leftRun._id);
    setUserRuns(newUserRunsData);
  }

  function renderButtons() {
    if (game.creator === user._id) {
      return (
        <button className="btn btn-sm btn-danger red-bg" onClick={deleteRun}>Delete</button>
      );
    } else {
      if (game.players.includes(user._id)) {
        return (
          <button className="btn btn-sm btn-info" onClick={leaveGame}>Leave</button>
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