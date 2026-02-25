"use client";

import { NavBar } from "@/app/components/sections/NavBar";
import { Hero } from "@/app/components/sections/Hero";
import { TrustedBy } from "@/app/components/sections/TrustedBy";
import { ProblemSection } from "@/app/components/sections/ProblemSection";
import { HowItWorks } from "@/app/components/sections/HowItWorks";
import { FeatureBento } from "@/app/components/sections/FeatureBento";
import { Metrics } from "@/app/components/sections/Metrics";
import { BeforeAfter } from "@/app/components/sections/BeforeAfter";
import { FinalCTA } from "@/app/components/sections/FinalCTA";
import { Footer } from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-deep text-white font-body selection:bg-brand-orange/30 selection:text-white">
      <NavBar />
      <main>
        <Hero />
        <TrustedBy />
        <ProblemSection />
        <HowItWorks />
        <FeatureBento />
        <Metrics />
        <BeforeAfter />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
