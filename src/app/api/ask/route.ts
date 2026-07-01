import { NextResponse } from "next/server";
import { Resend } from "resend";

// Receives a visitor's question and emails it to the project. Delivery goes to
// all three addresses (primary first) so nothing is missed; reply-to is set to
// the asker so a reply goes straight back to them.
//
// Setup: add a RESEND_API_KEY env var (free at resend.com). To send from your
// own domain, verify it in Resend and set CONTACT_FROM_EMAIL (e.g.
// "Islip History <questions@theislippromise.org>"); otherwise it falls back to
// Resend's shared onboarding sender, which in test mode only reaches the
// Resend account owner. Until a key is set, the form reports "not configured".

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = [
  "david.jandresceballo@stonybrook.edu",
  "davidjandres@icloud.com",
  "davidjandresceballo@gmail.com",
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    question?: string;
    website?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real users leave `website` empty; bots fill every field.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 320);
  const question = (body.question ?? "").trim().slice(0, 5000);

  if (!isEmail(email) || question.length < 5) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Require both the API key and a verified sender. Gating on the sender means
  // that if the domain isn't verified yet, the form shows a friendly "not set
  // up" message instead of attempting a send that Resend would reject.
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: TO,
      replyTo: email,
      subject: "New question from theislippromise.org",
      text:
        `A visitor submitted a question on theislippromise.org.\n\n` +
        `Name:  ${name || "(not given)"}\n` +
        `Email: ${email}\n\n` +
        `Question:\n${question}\n`,
    });
    if (error) {
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
