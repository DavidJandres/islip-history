"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface AskLabels {
  nameLabel: string;
  emailLabel: string;
  questionLabel: string;
  requiredHint: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorInvalid: string;
  errorGeneric: string;
  errorNotConfigured: string;
  privacyNote: string;
}

type Status = "idle" | "sending" | "sent" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function AskForm({ labels }: { labels: AskLabels }) {
  const base = useId();
  const errorId = `${base}-error`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [invalid, setInvalid] = useState({ email: false, question: false });
  const [form, setForm] = useState({ name: "", email: "", question: "", website: "" });

  const emailRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // On success the form is replaced; move focus to the confirmation so keyboard
  // and screen-reader users are not dropped to the top of the document, and so
  // the status message is reliably announced.
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate on the client so each error is tied to its own field (native
    // validation is disabled via noValidate to keep messaging consistent).
    const badEmail = !isEmail(form.email.trim());
    const badQuestion = form.question.trim().length < 5;
    if (badEmail || badQuestion) {
      setInvalid({ email: badEmail, question: badQuestion });
      setStatus("error");
      setErrorMsg(labels.errorInvalid);
      (badEmail ? emailRef : questionRef).current?.focus();
      return;
    }
    setInvalid({ email: false, question: false });
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      setStatus("error");
      setErrorMsg(
        data.error === "not_configured"
          ? labels.errorNotConfigured
          : data.error === "invalid"
            ? labels.errorInvalid
            : labels.errorGeneric,
      );
    } catch {
      setStatus("error");
      setErrorMsg(labels.errorGeneric);
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex items-start gap-3 rounded-sm border-l-4 border-blue bg-gray p-5 outline-none"
      >
        <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
        <div>
          <p className="font-heading font-bold text-ink">{labels.successTitle}</p>
          <p className="mt-1 text-sm text-muted">{labels.successBody}</p>
        </div>
      </div>
    );
  }

  const fieldBase =
    "mt-1 w-full rounded-sm border bg-white px-3 py-2 text-base text-ink outline-none transition-colors focus:border-blue";
  const cls = (bad: boolean) => `${fieldBase} ${bad ? "border-gold-dark" : "border-line"}`;

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${base}-website`}>Website</label>
        <input
          id={`${base}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set("website")}
        />
      </div>

      <div>
        <label htmlFor={`${base}-name`} className="text-sm font-semibold text-ink">
          {labels.nameLabel}
        </label>
        <input
          id={`${base}-name`}
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          className={cls(false)}
        />
      </div>

      <div>
        <label htmlFor={`${base}-email`} className="text-sm font-semibold text-ink">
          {labels.emailLabel}{" "}
          <span className="font-normal text-muted">{labels.requiredHint}</span>
        </label>
        <input
          ref={emailRef}
          id={`${base}-email`}
          type="email"
          required
          aria-required="true"
          aria-invalid={invalid.email || undefined}
          aria-describedby={invalid.email ? errorId : undefined}
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          className={cls(invalid.email)}
        />
      </div>

      <div>
        <label htmlFor={`${base}-question`} className="text-sm font-semibold text-ink">
          {labels.questionLabel}{" "}
          <span className="font-normal text-muted">{labels.requiredHint}</span>
        </label>
        <textarea
          ref={questionRef}
          id={`${base}-question`}
          required
          aria-required="true"
          aria-invalid={invalid.question || undefined}
          aria-describedby={invalid.question ? errorId : undefined}
          rows={5}
          value={form.question}
          onChange={set("question")}
          className={`${cls(invalid.question)} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-sm bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-dark disabled:opacity-60"
        >
          <Send aria-hidden className="h-4 w-4" />
          {status === "sending" ? labels.sending : labels.submit}
        </button>
        <p className="text-xs text-muted">{labels.privacyNote}</p>
      </div>

      <p
        id={errorId}
        aria-live="polite"
        className="min-h-[1.25rem] text-sm font-semibold text-gold-dark"
      >
        {status === "error" ? errorMsg : ""}
      </p>
    </form>
  );
}
