import { useState } from 'react';
import GameButtons from '../GameButtons/GameButtons';
import './GameDetails.css';

export default function GameCard({ game, user }) {
  const gameDate = new Date(game.date).toLocaleDateString();
  const [playerCount, setPlayerCount] = useState(game.players.length);
  const gameButton = <GameButtons game={game} user={user} setPlayerCount={setPlayerCount} />
  
  return (
    <tbody>
      <tr>
        <td>{gameDate}</td>
        <td>{game.time}</td>
        <td>{game.amPm}</td>
        <td>{playerCount}</td>
        <td>{gameButton}</td>
      </tr>
    </tbody>
  );
}