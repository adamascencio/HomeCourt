export default function GameCard({ game }) {
  const gameDate = new Date(game.date).toLocaleDateString();
  const playerCount = game.players.length > 1 ? `${game.players.length} players` : `${game.players.length} player`;
  
  return (
    <div>
      <p>{gameDate}</p>
      <p>{game.time}</p>
      <p>{playerCount}</p>
    </div>
  );
}