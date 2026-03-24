// // /app/api/mailchimp/route.ts

import { NextResponse } from "next/server";
import crypto from "crypto";
import { mapTags } from "@/lib/mailchimp";

const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  const email = payload?.email;
  const answers = payload?.answers;

  if (!email || typeof email !== "string") {
    return jsonError("Missing or invalid email", 400);
  }
  if (!answers || typeof answers !== "object") {
    return jsonError("Missing or invalid answers", 400);
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const SERVER = process.env.MAILCHIMP_SERVER;

  const isPlaceholder = (value?: string) =>
    !value || value.includes("<YOUR_") || value.includes("<YOUR") || value.includes("YOUR_");

  if (!API_KEY || !LIST_ID || !SERVER || isPlaceholder(API_KEY) || isPlaceholder(LIST_ID) || isPlaceholder(SERVER)) {
    return jsonError(
      "Missing or invalid Mailchimp configuration. Ensure MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, and MAILCHIMP_SERVER are set in your environment (not placeholders).",
      500
    );
  }

  const tags = mapTags(answers);

  const hash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const baseUrl = `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${hash}`;
  const authHeader = `apikey ${API_KEY}`;

  try {
    const res = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        status_if_new: "subscribed",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return jsonError(
        `Mailchimp upsert failed: ${res.status} ${res.statusText} - ${body}`,
        502
      );
    }

    // Ensure we explicitly clear any unselected tags first, then activate selected tags.
    // Some Mailchimp tag updates behave inconsistently when mixing active/inactive in a single call.
    const inactiveTags = tags.filter((t) => t.status === "inactive");
    const activeTags = tags.filter((t) => t.status === "active");

    if (inactiveTags.length) {
      const clearRes = await fetch(`${baseUrl}/tags`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: inactiveTags }),
      });

      if (!clearRes.ok) {
        const body = await clearRes.text();
        return jsonError(
          `Mailchimp tag clear failed: ${clearRes.status} ${clearRes.statusText} - ${body}`,
          502
        );
      }
    }

    if (activeTags.length) {
      const setRes = await fetch(`${baseUrl}/tags`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: activeTags }),
      });

      if (!setRes.ok) {
        const body = await setRes.text();
        return jsonError(
          `Mailchimp tag update failed: ${setRes.status} ${setRes.statusText} - ${body}`,
          502
        );
      }
    }

    return NextResponse.json({ success: true, tags, email, answers });
  } catch (error) {
    return jsonError(`Unexpected error: ${String(error)}`, 500);
  }
}

export async function GET() {
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const SERVER = process.env.MAILCHIMP_SERVER;

  return NextResponse.json({
    ok: Boolean(API_KEY && LIST_ID && SERVER),
    env: {
      MAILCHIMP_API_KEY: API_KEY ? "***" : null,
      MAILCHIMP_LIST_ID: LIST_ID ?? null,
      MAILCHIMP_SERVER: SERVER ?? null,
    },
    exampleTags: mapTags({
      q1: "1",
      q2: "smell",
      q3: "apartment",
      q4: "under50",
      q5: "normal",
    }),
  });
}

