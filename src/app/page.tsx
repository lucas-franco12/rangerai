"use client"
import '@fontsource/righteous';
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from '@/components/Footer';

import React from 'react';
// import Navbar from '@/components/sections/Navbar'

const Page: React.FC = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Footer/>
    </>
  );
};

export default Page;