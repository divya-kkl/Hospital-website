import React from 'react';
import HeroSection from '../../Componenet/HeroSection/HeroSection';
import Category from '../../Componenet/Category/Category';
import TopSpecialties from '../../Componenet/TopSpecialties/TopSpecialties';
import FeaturedDoctors from '../../Componenet/FeaturedDoctors/FeaturedDoctors';
import ScrollBanner from '../../Componenet/Scroll-banner/Scroll-banner';
import ReasonSection from '../../Componenet/Reason-Section/Reason-Section';
import About from '../../Componenet/About/About';
import WorkProcess from '../../Componenet/WorkProcess/WorkProcess';
import Testimonials from '../../Componenet/Testimonials/Testimonials';
import Partners from '../../Componenet/Partners/Partners';
import Faq from '../../Componenet/Faq/Faq';
import AdsBanner from '../../Componenet/AdsBanner/AdsBanner';
import Articles from '../../Componenet/Articles/Articles';
import ContactBanner from '../../Componenet/ContactBanner/ContactBanner';

function Home() {
  return (
    <>
      <HeroSection />
      <Category />
      <TopSpecialties />
      <FeaturedDoctors />
      <ScrollBanner />
      <ReasonSection />
      <About />
      <WorkProcess />
      <Testimonials />
      <Partners />
      <Faq />
      <AdsBanner />
      <Articles />
      <ContactBanner />
    </>
  );
}

export default Home;
