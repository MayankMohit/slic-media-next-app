"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Placeholder submit
      await new Promise((r) => setTimeout(r, 500));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <main>
      <section className="mx-auto max-w-2xl px-4 pt-25">
        <h1 className="mb-2 text-2xl font-semibold">Contact</h1>
        <p className="mb-6 opacity-80">
          Have a project in mind? Send a message.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm opacity-80">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="rounded border border-foreground/20 bg-transparent px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm opacity-80">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="rounded border border-foreground/20 bg-transparent px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm opacity-80">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              required
              className="min-h-32 rounded border border-foreground/20 bg-transparent px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 inline-flex w-fit items-center justify-center rounded bg-foreground px-4 py-2 text-background"
          >
            {status === "submitting" ? "Sending..." : "Send"}
          </button>
          {status === "success" && (
            <p className="text-green-600">Thanks! I will get back to you.</p>
          )}
          {status === "error" && (
            <p className="text-red-600">Something went wrong. Try again.</p>
          )}
        </form>
      </section>
    </main>
  );
}
