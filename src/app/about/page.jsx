import ContactSection from "../_components/ContactSection";

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-25 h-screen">
        <h1 className="mb-2 text-2xl font-semibold">About</h1>
        <p className="opacity-80">Write a short bio and mission statement.</p>
      </section>
      <ContactSection />
    </main>
  );
}
