'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
      question: 'What type of clients do you usually work with?',
      answer: 'We work with creators, entrepreneurs, and businesses who understand the power of consistent, high-quality content. Most of our clients are in the US & UK and want to scale their online presence through powerful storytelling and video marketing.'
    },
    {
      question: 'How do you ensure the content fits our brand style and tone?',
      answer: 'Before production starts, we go through a brand discovery phase—studying your visuals, tone, competitors, and messaging. We then build a content style guide to ensure everything we create feels consistent, on-brand, and true to your audience.'
    },
    {
      question: 'How long does it take to deliver the first batch of content?',
      answer: 'Typically, you can expect your first batch of deliverables within 7–10 business days after we receive all necessary inputs and approvals.'
    },
    {
      question: 'Do you handle strategy as well, or only the creative part?',
      answer: 'We handle both. Our team doesn’t just execute—we think strategically about what kind of content performs best for your goals, platforms, and audience.'
    },
    {
      question: 'What if I don’t have a content idea or script yet?',
      answer: 'No problem! We handle ideation and scripting for you. Based on your niche, product, and target audience, we’ll create hooks, angles, and stories that grab attention and convert.'
    },
    {
      question: 'Why should we choose your agency over others?',
      answer: 'Because we don’t just “make content”—we build growth systems. With proven results (like scaling SLIC Media from 0 to 300K+ followers in 6 months with over 100M views), a tight-knit team, and an obsession with quality, we focus on creating content that actually drives attention and results—not just views.'
    }
  ];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="w-[60vw] h-screen flex flex-col items-center justify-center p-[2vw] overflow-hidden relative mt-[10vh]">
      <motion.h1
        className="text-[3vw] font-bold text-white mb-[5vh] z-10 relative text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        FAQs
      </motion.h1>

      <div className="w-full z-10 relative">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial="closed"
            animate={activeIndex === index ? 'open' : 'closed'}
            variants={{
              open: { height: 'auto' },
              closed: { height: 'auto' }
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-[2vh] bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 text-left group"
            >
              <h3 className="text-[1.5vw] font-semibold text-gray-200 group-hover:text-purple-200 transition-colors">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/80 group-hover:text-white transition-colors"
              >
                {activeIndex === index ? <Minus size={24} /> : <Plus size={24} />}
              </motion.div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden w-full"
                >
                  <p className="text-gray-300 p-[1vw] text-[1vw] bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;