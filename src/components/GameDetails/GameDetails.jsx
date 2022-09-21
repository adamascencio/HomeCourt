import GameButtons from '../GameButtons/GameButtons';
import './GameDetails.css';

export default function GameCard({ game, user, runData, setRunData, userRuns, setUserRuns }) {
  const gameDate = new Date(game.date).toLocaleDateString();
  const gameButton = <GameButtons game={game} user={user} runData={runData} setRunData={setRunData} userRuns={userRuns} setUserRuns={setUserRuns}/>
  
  return (
    <tbody>
      <tr>
        <td>{gameDate}</td>
        <td>{game.time}</td>
        <td>{game.amPm}</td>
        <td>{game.players.length}</td>
        <td>{gameButton}</td>
      </tr>
    </tbody>
  );
}