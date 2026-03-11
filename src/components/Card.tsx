import { useState, forwardRef, useImperativeHandle } from "react";
import "./Card.css";
export type CardRef = {
  flip: () => void;
  unflip: () => void;
  flipped: boolean;
  icon: string;
};
type CardProps = {
  index: number;
  icon: string;
  gridSize: number;
  onClick: (index: number) => void;
};
export default forwardRef<CardRef, CardProps>(function Card(
  { index, icon, gridSize, onClick },
  ref,
) {
  let baseClass =
    gridSize === 4
      ? "text-4xl sm:text-5xl"
      : gridSize === 6
        ? "text-3xl sm:text-4xl"
        : gridSize === 8
          ? "text-2xl sm:text-3xl"
          : "text-xl sm:text-2xl";
  baseClass =
    baseClass +
    " flex items-center justify-center absolute inset-0 backface-hidden border rounded-lg";
  const [flipped, setFlipped] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      flip: () => setFlipped(true),
      unflip: () => setFlipped(false),
      get flipped() {
        return flipped;
      },
      get icon() {
        return icon;
      },
    }),
    [flipped, icon],
  );
  return (
    <div
      className="w-full h-full cursor-pointer select-none perspective"
      onClick={() => onClick(index)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
      >
        <div
          className={`${baseClass} bg-white/70 backdrop-blur-sm hover:bg-blue-500 border-blue-200`}
        >
          ?
        </div>

        <div
          className={`${baseClass} rotate-y-180 flex bg-blue-400 hover:bg-blue-500 border-blue-200`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
});
