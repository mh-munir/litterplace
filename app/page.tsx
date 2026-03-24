"use client";
import { useState } from "react";
import { questions } from "@/data/questions";
import { getResult } from "@/lib/quizEngine";
import EmailGate from "./components/EmailGate";
import Result from "./components/Result";
import ProgressBar from "./components/ProgressBar";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [showEmail, setShowEmail] = useState(false);
  const [mailchimpError, setMailchimpError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const progressStep = showEmail ? questions.length : step;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    const isLastStep = step === questions.length - 1;
    if (isLastStep) {
      setShowEmail(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleEmail = async (email: string) => {
    setMailchimpError(null);

    // Immediately show the recommendation while we send email in the background.
    setResult(getResult(answers));

    // Send to Mailchimp silently in background.
    (async () => {
      try {
        await fetch("/api/mailchimp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, answers }),
        });
      } catch (err) {
        console.error("/api/mailchimp fetch failed", err);
      }
    })();
  };

  const q = questions[step] ?? null;

  return (
    <main>
        <section className=" min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center gap-4 bg-[#E8CFB3]">
              <div className="w-full min-h-86">
                <div className="max-w-xl mx-auto p-5">
                  {!result && <ProgressBar step={progressStep} />}

                  {result ? (
                    <Result result={result} />
                  ) : showEmail ? (
                    <EmailGate onSubmit={handleEmail} error={mailchimpError} />
                  ) : q ? (
                    <div className="w-full mx-auto">
                      <h2 className="text-xl font-bold mb-4">
                        {step + 1}. {q.question}
                      </h2>
                      {q.options.map((opt, idx) => (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(opt.value)}
                          className="cursor-pointer block w-full p-2 text-base border border-red-500 rounded-3xl mb-3 text-left hover:bg-red-500 hover:text-white transition"
                        >
                          <span className="text-[12px] text-red-500 uppercase w-5 h-5 text-center mr-2 leading-5 inline-block rounded-full bg-amber-100">
                            {String.fromCharCode(97 + idx)}
                          </span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div style={{ backgroundImage: "var(--bg-main)" }} className="bg-main-bg bg-cover bg-center bg-no-repeat min-h-screen">
              </div>
          </div>
        </section>
    </main>
  );
}
