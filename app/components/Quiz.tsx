"use client";
import { useState } from "react";
import { questions } from "@/data/questions";
import { getResult } from "@/lib/quizEngine";

import Question from "./Question";
import EmailGate from "./EmailGate";
import Result from "./Result";
import ProgressBar from "./ProgressBar";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [showEmail, setShowEmail] = useState(false);
  const [mailchimpError, setMailchimpError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step === questions.length - 1) {
      setShowEmail(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setMailchimpError(null);

    // Send to Mailchimp
    try {
      const res = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMailchimpError(data?.error ?? "Mailchimp request failed");
        return;
      }
    } catch (err) {
      console.error("Mailchimp fetch error:", err);
      setMailchimpError(String(err));
      return;
    }

    // Show result immediately
    const newResult = getResult(answers);
    setResult(newResult);
  };

  if (result) return <Result result={result} />;
  if (showEmail) return <EmailGate onSubmit={handleEmailSubmit} error={mailchimpError} />;

  const currentQuestion = questions[step];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressBar step={step + 0} />

      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        onAnswer={handleAnswer}
      />
    </div>
  );
}