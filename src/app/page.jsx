'use client';
import ContactSection from './_components/ContactSection';
import LandingPage from './_components/LandingPage';

export default function Home() {
  return (
    <>
      <section className=" h-screen w-full overflow-hidden">
        <LandingPage />
      </section>
      <section className='min-h-screen flex justify-center items-center text-4xl'>
        LET'S GOOO
      </section>

      <ContactSection />
    </>
  );
}
