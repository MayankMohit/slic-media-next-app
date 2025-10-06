'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
      question: 'What services does your GFX VFX agency offer?',
      answer: 'We specialize in 3D modeling, animation, motion graphics, visual effects for film and TV, and digital compositing. Our team handles everything from concept development to final rendering.'
    },
    {
      question: 'How long does a typical VFX project take?',
      answer: 'Project timelines vary based on complexity, but most range from 4-12 weeks. We provide detailed timelines during the initial consultation to ensure transparency.'
    },
    {
      question: 'What is your pricing structure for GFX projects?',
      answer: 'Pricing is project-based and customized to your needs. We offer competitive rates starting at $5,000 for smaller graphics jobs, with quotes provided after reviewing your brief.'
    },
    {
      question: 'What software and tools do you use for VFX work?',
      answer: 'Our pipeline includes industry-standard tools like Autodesk Maya, Houdini, Nuke, Adobe After Effects, and Unreal Engine. We stay updated with the latest versions for optimal results.'
    },
    {
      question: 'How do I get started with a project?',
      answer: 'Contact us via our website form or email with your project brief. We will schedule a free consultation to discuss your vision and provide a tailored proposal within 48 hours.'
    }
  ];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="w-[60vw] h-screen flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <motion.h1
        className="text-5xl font-bold text-white mb-12 z-10 relative text-center"
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
              className="w-full flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 text-left group"
            >
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
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
                  <p className="text-gray-200 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
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