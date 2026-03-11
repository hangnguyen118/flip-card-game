import { useState } from "react";
import "./App.css";
import generateIcons from "./utils/generateIcons";
import shuffleDeck from "./utils/shuffleDeck";
import Setting from "./components/Setting";
import ResetButton from "./components/ResetButton";
import Scoreboard from "./components/Scoreboard";
import Graffiti from "./components/Graffiti";
import GameBoard from "./components/GameBoard";
import { playFlipSoundOnce } from "./utils/playFlipSoundOnce";

function App() {
  const [gridSize, setGridSize] = useState(4);
  const createNewDeck = (size: number) => {
    const iconCount = (size * size) / 2;
    const icons = generateIcons(iconCount);
    const newDeck = [...icons, ...icons];
    return shuffleDeck(newDeck);
  };
  const [deck, setDeck] = useState(() => createNewDeck(4));
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  const reInitializeGame = (size: number) => {
    setGridSize(size);
    setDeck(createNewDeck(size));
    setMoves(0);
    setMatches(0);
    setResetCounter((prev) => prev + 1);
  };
  return (
    <>
      <div className="mx-auto h-screen flex flex-col p-4 max-w-3xl bg-linear-to-bl from-cyan-100 via-blue-50 to-white">
        <h2 className="text-center font-bold text-4xl">Card Flip Game</h2>
        <button onClick={() => playFlipSoundOnce("match")}>play</button>
        <Setting onGridChange={reInitializeGame} />
        <Scoreboard moves={moves} matches={matches} total={deck.length / 2} />
        <ResetButton onReset={() => reInitializeGame(gridSize)} />
        <div className="grow">
          <GameBoard
            gridSize={gridSize}
            deck={deck}
            setMoves={setMoves}
            setMatches={setMatches}
            key={resetCounter}
          />
        </div>
        {matches === deck.length / 2 && <Graffiti />}
      </div>
    </>
  );
}

export default App;
