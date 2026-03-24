// /components/ProgressBar.tsx

"use client";

export default function ProgressBar({ step }: { step: number }) {
  const total = 5;
  const percent = (step / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Progress</span>
        <span>{Math.round(percent)}%</span>
      </div>

      <div className="w-full bg-white h-2 rounded-full">
        <div
          className="bg-red-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}