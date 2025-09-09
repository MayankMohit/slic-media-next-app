"use client";
import ContactSection from "./_components/ContactSection";
import LandingPage from "./_components/LandingPage";
import NoiseBG from "./_components/NoiseBG";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full overflow-hidden">
        <LandingPage />
      </section>

      <section className="min-h-screen flex justify-center items-center text-4xl relative">
        <NoiseBG />
        <div className="relative z-10 text-white">Noise Background</div>
      </section>

      <ContactSection />
    </>
  );
}
