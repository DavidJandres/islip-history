"use client";

import { useId, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface AskLabels {
  nameLabel: string;
  emailLabel: string;
  questionLabel: string;
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

export function AskForm({ labels }: { labels: AskLabels }) {
  const base = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", question: "", website: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
        role="status"
        className="flex items-start gap-3 rounded-sm border-l-4 border-blue bg-gray p-5"
      >
        <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
        <div>
          <p className="font-heading font-bold text-ink">{labels.successTitle}</p>
          <p className="mt-1 text-sm text-muted">{labels.successBody}</p>
        </div>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded-sm border border-line bg-white px-3 py-2 text-base text-ink outline-none transition-colors focus:border-blue";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden" >
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
          className={field}
        />
      </div>

      <div>
        <label htmlFor={`${base}-email`} className="text-sm font-semibold text-ink">
          {labels.emailLabel}
        </label>
        <input
          id={`${base}-email`}
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          className={field}
        />
      </div>

      <div>
        <label htmlFor={`${base}-question`} className="text-sm font-semibold text-ink">
          {labels.questionLabel}
        </label>
        <textarea
          id={`${base}-question`}
          required
          rows={5}
          value={form.question}
          onChange={set("question")}
          className={`${field} resize-y`}
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

      <p aria-live="polite" className="min-h-[1.25rem] text-sm text-gold-dark">
        {status === "error" ? errorMsg : ""}
      </p>
    </form>
  );
}
