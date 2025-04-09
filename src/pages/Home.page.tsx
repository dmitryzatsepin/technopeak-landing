import React from 'react';
import { Box } from '@mantine/core';

// --- Импорты компонентов ---
import { HeroSection } from '../components/HeroSection/HeroSection';
import { AnimatedNumbers } from '../components/AnimatedNumbers/AnimatedNumbers';
import { TimelineSlider } from '../components/TimelineSlider/TimelineSlider';
import { Services } from '../components/Services/Services';
import { CallToAction } from '../components/CallToAction/CallToAction'; // <-- Импорт CTA
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Testimonials } from '../components/Testimonials/Testimonials';
import { Faq } from '../components/Faq/Faq';
import { Footer } from '../components/Footer/Footer';

export function HomePage() {
  return (
    <Box>
      {/* 1. Welcome page */}
      <HeroSection />

      {/* 2. Our Company In numbers */}
      <Box component="section" id="numbers">
        <AnimatedNumbers />
      </Box>

      {/* 3. Our History */}
      <Box component="section" id="history">
        <TimelineSlider />
      </Box>

      {/* 4. Our Solutions (Services) */}
      <Box component="section" id="services">
        <Services />
      </Box>

      {/* === CTA 1 === */}
      <CallToAction
        title={<>Ready to Boost <br/> Your Business?</>}
        description="Let's discuss how our tailored CRM solutions can drive growth and efficiency for your company."
        buttonText="Get a Free Consultation"
        scrollToId="contact-form" // <-- ID формы, которую мы добавим в футер
      />

      {/* 5. Our Latest Cases (Portfolio) */}
      <Box component="section" id="portfolio">
        <Portfolio />
      </Box>

      {/* 6. What Our Clients Say */}
      <Box component="section" id="testimonials">
        <Testimonials />
      </Box>

      {/* 7. FAQ */}
      <Box component="section" id="faq">
        <Faq />
      </Box>

      {/* === CTA 2 (опционально, можно убрать или изменить) === */}
       <CallToAction
        title="Have Questions?"
        description="Our team is ready to answer all your questions and help you get started."
        buttonText="Contact Us Now"
        scrollToId="contact-form" // <-- Тот же ID формы
      />

      {/* 8. Contacts (Footer) */}
      {/* Мы добавим ID 'contact-form' внутри футера */}
      <Box component="section" id="contacts">
        <Footer />
      </Box>
    </Box>
  );
}