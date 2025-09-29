"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CasesSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let ctx = gsap.context(() => {
      // Calculate total scroll distance
      const totalScroll = track.scrollWidth - window.innerWidth;

      // Main horizontal scroll animation
      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const cardData = [
    {
      title: "E-commerce Growth",
      subtitle: "Fashion Brand",
      metric: "300% ROI Increase",
      description: "Transformed social media strategy leading to unprecedented growth"
    },
    {
      title: "App Launch Campaign", 
      subtitle: "Tech Startup",
      metric: "1M+ Downloads",
      description: "Creative campaign that drove massive user acquisition"
    },
    {
      title: "Brand Awareness",
      subtitle: "Healthcare Company", 
      metric: "150% Reach Growth",
      description: "Strategic content approach that expanded market presence"
    },
    {
      title: "Product Launch",
      subtitle: "Consumer Goods",
      metric: "500% Sales Boost", 
      description: "Innovative creative strategy that exceeded all expectations"
    },
    {
      title: "Digital Transformation",
      subtitle: "B2B Services",
      metric: "200% Lead Generation",
      description: "Complete digital overhaul resulting in significant growth"
    },
    {
      title: "Social Commerce",
      subtitle: "Lifestyle Brand",
      metric: "400% Engagement",
      description: "Revolutionary approach to social selling and community building"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex h-screen items-center"
        style={{ width: "max-content", paddingLeft: "18vw", paddingRight: "0vw" }}
      >
        {cardData.map((card, i) => (
          <div
            key={i}
            className="h-card flex-shrink-0 w-[63vw] h-[60vh] mr-8 rounded-3xl bg-gradient-to-bl from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800/50 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-2xl"></div>

            {/* Content */}
            <div>
              <div className="text-amber-400/80 text-sm font-semibold mb-2 uppercase tracking-wider">
                {card.subtitle}
              </div>
              <h3 className="text-white/90 text-2xl font-bold mb-4 leading-tight">
                {card.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Metric */}
            <div className="mt-8">
              <div className="text-3xl font-bold text-amber-400/80 mb-2">
                {card.metric}
              </div>
              <div className="w-full h-px bg-gradient-to-r from-amber-400/50 to-transparent"></div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80 font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105">
                View Case Study
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CasesSection;