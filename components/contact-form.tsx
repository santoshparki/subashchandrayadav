"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactMethods, opportunityTypes } from "@/lib/validation";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      event.currentTarget.reset();
      setStatus("sent");
      setFeedback("Enquiry saved. Thank you, I will get back to you soon.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : `Unable to send. Please email ${email}.`);
    }
  }
  return <form onSubmit={submit} className="relative grid gap-5 rounded-sm border border-white/10 bg-white/[.04] p-5 sm:grid-cols-2 sm:p-8">
    <label className="form-label">Full Name<input name="fullName" required minLength={2} className="form-input" placeholder="Full name" /></label>
    <label className="form-label">Email Address<input name="email" type="email" required className="form-input" placeholder="you@company.com" /></label>
    <label className="form-label">Phone Number<input name="phone" className="form-input" placeholder="+977 ..." /></label>
    <label className="form-label">Location<input name="location" className="form-input" placeholder="City, country" /></label>
    <label className="form-label">Opportunity Type<select name="opportunityType" required className="form-input">
      <option value="" className="bg-ink">Select type</option>
      {opportunityTypes.map((type) => <option key={type} value={type} className="bg-ink">{type}</option>)}
    </select></label>
    <label className="form-label">Company Name optional<input name="companyName" className="form-input" placeholder="Company or organization" /></label>
    <label className="form-label sm:col-span-2">Preferred Contact Method<select name="preferredContactMethod" required defaultValue="Email" className="form-input">
      {contactMethods.map((method) => <option key={method} value={method} className="bg-ink">{method}</option>)}
    </select></label>
    <label className="form-label sm:col-span-2">Message<textarea name="message" required minLength={10} rows={5} className="form-input resize-y" placeholder="Tell me about the opportunity or project" /></label>
    <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    {feedback && <div role="status" className={`fixed bottom-5 left-5 right-5 z-50 border p-4 text-sm shadow-premium sm:left-auto sm:w-96 ${status === "sent" ? "border-emerald-300/30 bg-emerald-950 text-emerald-100" : "border-red-300/30 bg-red-950 text-red-100"}`}>{feedback}</div>}
    <button className="button-light justify-center disabled:cursor-wait disabled:opacity-60 sm:col-span-2" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : status === "sent" ? "Message saved" : "Send enquiry"}<ArrowUpRight size={17} /></button>
  </form>;
}
