"use client";
import { useState } from "react";

type EmailFormProps = {
  source?: string;
};

export default function EmailForm({ source = "odor" }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [mailchimpError, setMailchimpError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleEmailSubmit = async () => {
    setMailchimpError(null);
    setSuccessMessage(null);

    if (!isValidEmail(email)) {
      setMailchimpError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers: { source } }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Mailchimp request failed");
      }

      setSuccessMessage("You are in. Check your inbox soon.");
      setEmail("");
    } catch (err) {
      setMailchimpError((err as Error).message || "Failed to send email to Mailchimp. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Get tips and deals</h2>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 bg-white rounded-lg focus:outline-none disabled:cursor-not-allowed"
          placeholder="Enter your email"
          disabled={isSubmitting}
        />

        <button
          onClick={handleEmailSubmit}
          disabled={isSubmitting || !isValidEmail(email)}
           className="cursor-pointer block w-full p-2 text-base border border-red-500 rounded-3xl mb-2 text-center hover:bg-red-500 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Send..." : "Send me tips"}
        </button>

        {mailchimpError ? (
          <p className="text-sm text-red-600">{mailchimpError}</p>
        ) : null}

        {successMessage ? (
          <p className="text-sm text-green-600">{successMessage}</p>
        ) : null}
      </div>
    </div>
  );
}