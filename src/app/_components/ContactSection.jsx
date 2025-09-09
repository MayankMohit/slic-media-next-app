import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="mx-auto mt-16 max-w-6xl rounded-lg border border-foreground/10 bg-background px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Have a project in mind?</h2>
          <p className="opacity-80">Let’s talk about how we can help.</p>
        </div>
        <Link
          href="/contact"
          className="inline-block rounded bg-foreground px-4 py-2 text-background"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}
