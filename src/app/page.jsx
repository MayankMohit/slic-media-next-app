"use client";

import ContactSection from "./_components/ContactSection";
import BrandLogos from "./_components/home/BrandLogos";
import LandingPage from "./_components/home/LandingPage";
import ServicesSection from "./_components/home/ServicesSection";
import NoiseBG from "./_components/NoiseBG";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full overflow-hidden">
        <LandingPage />
      </section>

      <section className="h-[75vh] flex justify-center items-center text-4xl relative w-full">
        <BrandLogos />
      </section>

      

        <ServicesSection />
        <section className="h-screen flex justify-center items-center text-3xl font-bold uppercase">Case Studies Section</section>
      <ContactSection />
    </>
  );
}