export default function Scoreboard({
  moves,
  matches,
  total,
}: {
  moves: number;
  matches: number;
  total: number;
}) {
  return (
    <div className="mb-4 flex justify-between text-lg">
      <span>Moves: {moves}</span>
      <span>
        Match: {matches}/{total}
      </span>
    </div>
  );
}
