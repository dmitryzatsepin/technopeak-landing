//src/pages/Home.page.tsx

import React from 'react';
import { Box } from '@mantine/core';

// --- Импорты компонентов ---
import { AppHeader } from '../components/Header/Header';
import { HeroSection } from '../components/HeroSection/HeroSection';
import { AnimatedNumbers } from '../components/AnimatedNumbers/AnimatedNumbers';
import { LocationsMap } from '../components/LocationsMap/LocationsMap';
import { TimelineSlider } from '../components/TimelineSlider/TimelineSlider';
import { Services } from '../components/Services/Services';
import { CallToAction } from '../components/CallToAction/CallToAction';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { LogoMarquee } from '../components/LogoMarquee/LogoMarquee';
import { Testimonials } from '../components/Testimonials/Testimonials';
import { Faq } from '../components/Faq/Faq';
import { Footer } from '../components/Footer/Footer';
import { ScrollTest } from '../components/ScrollTest';


export function HomePage() {
  return (
    <Box>
      <AppHeader />
      <HeroSection />
      <Box component="section" id="numbers">
        <AnimatedNumbers />
      </Box>
      <Box component="section" id="locations">
         <LocationsMap title="Find Us Across The Globe" /> {/* <-- Используем компонент */}
      </Box>
      {/* <Box component="section" id="history">
        <TimelineSlider />
      </Box> */}
      <Box component="section" id="services">
        <Services />
      </Box>
      <CallToAction
        title={<>Ready to Boost <br/> Your Business?</>}
        description="Let's discuss how our tailored CRM solutions can drive growth and efficiency for your company."
        buttonText="Get a Free Consultation"
        //scrollToId="contact-form"
      />
      <Box component="section" id="portfolio">
        <Portfolio />
      </Box>
      <LogoMarquee title="Our Valued Partners & Clients" />
      <Box component="section" id="testimonials">
        <Testimonials />
      </Box>
      <Box component="section" id="faq">
        <Faq />
      </Box>
      <CallToAction
        title="Have Questions?"
        description="Our team is ready to answer all your questions and help you get started."
        buttonText="Contact Us Now"
        //scrollToId="contact-form"
      />
      <ScrollTest />
      <Box component="section" id="contacts">
        <Footer />
      </Box>
    </Box>
  );
}