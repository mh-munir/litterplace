"use client";
import { useState } from "react";

export default function EmailGate({ onSubmit, error }: any) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
  const isEmailValid = isValidEmail(email);
  const isDisabled = isSubmitting || !isEmailValid;

  const handleSend = async () => {
    if (isSubmitting) return;
    setTouched(true);
    if (!isEmailValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto p-0">
      <h2 className="text-2xl font-bold mb-2">
        Where should we send your match?
      </h2>
      <p className="text-gray-600 mb-6">
        We'll email your personalised recommendation right now.
      </p>

      <input
        type="email"
        placeholder="Your email address"
        className="w-full p-2 px-4 bg-white border-0 outline-0 rounded-lg mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
      />

      {touched && !isEmailValid ? (
        <p className="text-sm text-red-600 mb-4">Please enter a valid email address.</p>
      ) : null}

      <button
        onClick={handleSend}
        disabled={isDisabled}
        className="cursor-pointer block w-full p-2 text-base border border-red-500 rounded-3xl mb-2 text-center hover:bg-red-500 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Send my match →
      </button>

      <p className="text-xs text-gray-500 mb-4">Free. No spam. Unsubscribe anytime.</p>

      {error ? (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      ) : null}

    </div>
  );
}