export default function Setting({ onGridChange }: { onGridChange: (size: number) => void }) {
  return (
    <div className="text-center mt-6">
      <label className="font-bold">Grid Size: </label>
      <select
        onChange={(e) => onGridChange(parseInt(e.target.value))}
        className="p-2 border rounded"
      >
        <option value={4}>4x4</option>
        <option value={6}>6x6</option>
        <option value={8}>8x8</option>
        <option value={10}>10x10</option>
      </select>
    </div>
  );
}
