"use client";

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

      <section>
        <ServicesSection />
      </section>
      
      <section className="flex justify-center items-center w-full">
        <TestimonialsBento />
      </section>

      <section>
        <CasesSection />
      </section>

      <section className="h-screen flex justify-center items-center text-3xl font-bold">
        ABOUT US
      </section>

      <section className="h-[50vh] flex justify-center items-center text-3xl font-bold">
        BLOGS
      </section>
    </>
  );
}
