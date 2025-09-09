"use client";
import ContactSection from "./_components/ContactSection";
import BrandLogos from "./_components/home/BrandLogos";
import BrandVideo from "./_components/home/BrandVideo";
import LandingPage from "./_components/home/LandingPage";
import NoiseBG from "./_components/NoiseBG";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full overflow-hidden">
        <LandingPage />
      </section>

      <section className="h-screen flex justify-center items-center text-4xl relative w-full">
        <NoiseBG />
        <div className="flex justify-center items-center w-full">
          <BrandVideo /> 
          <BrandLogos />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
