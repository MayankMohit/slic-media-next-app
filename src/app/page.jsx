"use client";

import FAQSection from "./_components/FAQs";
import BrandLogos from "./_components/home/BrandLogos";
import CasesSection from "./_components/home/CasesSection";
import LandingPage from "./_components/home/LandingPage";
import ServicesSection from "./_components/home/ServicesSection";
import TestimonialsBento from "./_components/home/TestimonialsBento";
import WorkSection from "./_components/home/WorkSection";
import NoiseBG from "./_components/NoiseBG";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full overflow-hidden">
        <LandingPage />
      </section>

      <section className="h-[25vh] w-full">
        <BrandLogos />
      </section>

      <section>
        <WorkSection />
      </section>

      <section className="-mt-140">
        <ServicesSection />
      </section>

      <section>
        <CasesSection />
      </section>

      <section className="flex justify-center items-center w-full">
        <TestimonialsBento />
      </section>

      <section className="flex items-center justify-center">
        <FAQSection />
      </section>
    </>
  );
}
