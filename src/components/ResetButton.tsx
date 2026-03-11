import { useState } from "react";

export default function ResetButton({ onReset }: { onReset: () => void }) {
  const [spin, setSpin] = useState(false);
  return (
    <button
      onClick={() => {
        onReset();
        setSpin((prev) => !prev);
      }}
      className={`${spin && "rotate-z-360"} z-50 fixed bottom-4 right-4 w-14 h-14 text-sm font-medium rounded-full shadow
    bg-blue-200 hover:bg-blue-300 transition-transform duration-500 text-blue-900 flex items-center justify-center`}
    >
      <span role="img" aria-label="reset" className="text-xl font-bold text-blue-600">
        🔄
      </span>
    </button>
  );
}
