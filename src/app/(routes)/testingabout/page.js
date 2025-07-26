import AchievementsSection from "@/components/TestingAbout/Achievements";
import Hero from "@/components/TestingAbout/Hero";
import OurBranch from "@/components/TestingAbout/Locations";
import SAPCompassDial from "@/components/TestingAbout/Placement";
import SAPAdoptionRings from "@/components/TestingAbout/SapComp";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <SAPAdoptionRings />
      <SAPCompassDial />
      <AchievementsSection />
      <OurBranch />
    </div>
  );
};

export default page;
