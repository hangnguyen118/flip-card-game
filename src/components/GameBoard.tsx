import { type SetStateAction, useRef } from "react";
import Card, { type CardRef } from "./Card";
import { playFlipSoundOnce } from "../utils/playFlipSoundOnce";

export default function GameBoard({
  gridSize,
  deck,
  setMoves,
  setMatches,
}: {
  gridSize: number;
  deck: string[];
  setMoves: React.Dispatch<SetStateAction<number>>;
  setMatches: React.Dispatch<SetStateAction<number>>;
}) {
  const cardRefs = useRef<(CardRef | null)[]>([]);
  const firstCard = useRef<CardRef | null>(null);
  const secondCard = useRef<CardRef | null>(null);
  const lockBoard = useRef(false);
  const handleCardClick = (index: number) => {
    const card = cardRefs.current[index];
    if (!card || card.flipped || lockBoard.current) return;
    card.flip();
    playFlipSoundOnce("flip");
    if (firstCard.current === null) {
      firstCard.current = card;
      return;
    }
    secondCard.current = card;
    lockBoard.current = true;
    setMoves((prev) => prev + 1);
    if (firstCard.current.icon === secondCard.current.icon) {
      playFlipSoundOnce("match");
      firstCard.current = null;
      secondCard.current = null;
      lockBoard.current = false;
      setMatches((prev) => {
        if (prev + 1 === deck.length / 2) {
          playFlipSoundOnce("win");
        }
        return prev + 1;
      });
    } else {
      setTimeout(() => {
        firstCard.current?.unflip();
        secondCard.current?.unflip();

        firstCard.current = null;
        secondCard.current = null;
        lockBoard.current = false;
      }, 800);
    }
  };
  return (
    <div
      className="grid gap-2 h-full"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {deck.map((icon, idx) => (
        <Card
          key={idx}
          index={idx}
          icon={icon}
          gridSize={gridSize}
          onClick={handleCardClick}
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
        />
      ))}
    </div>
  );
}
