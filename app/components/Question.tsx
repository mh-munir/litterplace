// /components/Question.tsx

type Props = {
  question: string;
  options: { label: string; value: string }[];
  onAnswer: (value: string) => void;
};

export default function Question({ question, options, onAnswer }: Props) {
  return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{question}</h2>
        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onAnswer(opt.value)}
              className="w-full p-4 rounded-full border hover:bg-black hover:text-white transition"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
  );
}