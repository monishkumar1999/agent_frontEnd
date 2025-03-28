import React, { useRef } from "react";
import AgentBenefits from "../components/AgentBenefits";
import HowItWorks from "../components/HowItWorks";
import TopRatedAgents from "../components/TopRatedAgents";
import Vetting from "../components/Vetting";

import Footer from "../components/Footer";
import HeaderComponent from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import SwipperCard from "../swippertest/SwipperCard";

const LandingPage = () => {
  const agentsRef = useRef(null);

  const scrollToAgents = () => {
    if (agentsRef.current) {
      agentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Header */}
      <HeaderComponent />

   

      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8">
        <HeroBanner scrollToAgents={scrollToAgents} />
      </div>

      {/* Agent Benefits Section */}
      <div className="py-12 sm:py-16 lg:py-20">
        <AgentBenefits />
      </div>

      {/* How It Works Section */}
      <div className="p-8 sm:p-12 lg:p-16 mt-[-100px]">
        <HowItWorks
          image="/images/work.png"
          vector3="/vector-3.svg"
          empty="/empty.svg"
          empty1="/frame-1618873333.svg"
          empty2="/frame-1618873334.svg"
        />
      </div>

      {/* Top Rated Agents Section */}
      <div className="py-12 sm:py-16 lg:py-20">
        <SwipperCard />
        {/* <TopRatedAgents /> */}
      </div>

      {/* Vetting Section */}
      <div className="p-6 sm:p-8 lg:p-16">
        <Vetting
          image="/images/house2.png"
          fIndMyAgent="/images/findmyagent.svg"
          image1="/images/house3.png"
          image2="/images/house1.png"
        />
      </div>

      {/* Agents Section */}
      {/* <div ref={agentsRef} className="py-12 sm:py-16 lg:py-20">
        <Agents />
      </div> */}

      {/* Footer */}
      <Footer
        fIndMyAgent="/images/findmyagent.svg"
        copyrightIcon="/vector-4.svg"
      />
    </>
  );
};

export default LandingPage;
