"use client";

import { useState } from "react";
import Name1 from "./Name1";
import AgentBannerImage from "./AgentBannerImage";
import AgencyInfoDescription from "./AgencyInfoDescription";
import BuyerAgentFrameComponent from "./BuyerAgentFrameComponent";
import Services from "./Services";
import AgentTestimonialItems from "./AgentTestimonialItems";

const Profile = ({agentDetails, details}) => {
  const [activeTab, setActiveTab] = useState("information");

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-7 max-w-full text-left text-lg text-black font-instrument-sans">
      <Name1 agentDetails={agentDetails}/>
      <div className="self-stretch flex flex-row items-start justify-center py-[191px] px-5 relative mq450:pt-[124px] mq450:pb-[124px] mq450:box-border">
        <AgentBannerImage />
        <img
          className="h-[72px] w-[80.2px] relative z-[1]"
          loading="lazy"
          alt=""
          src="/playcircle02.svg"
        />
      </div>
      <div className="self-stretch flex flex-row items-start justify-center max-w-full [row-gap:20px] mq825:flex-wrap">
        <div className="flex-1 flex flex-col items-start justify-start gap-[90px] min-w-[443px] max-w-full mq825:gap-[45px] mq825:min-w-full mq450:gap-[22px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[23.5px] max-w-full">
            <div className="w-[667px] flex flex-row items-start justify-start py-0 px-1 box-border max-w-full">
              <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[1.5px] box-border gap-4 max-w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-start justify-start gap-8 relative">
                    <button
                      className={`relative leading-[26px] font-medium min-w-[100px] ${
                        activeTab === "information"
                          ? "text-black"
                          : "text-dimgray-200"
                      }`}
                      onClick={() => setActiveTab("information")}
                    >
                      Information
                    </button>
                    <button
                      className={`relative leading-[26px] font-medium min-w-[69px] ${
                        activeTab === "reviews"
                          ? "text-black"
                          : "text-dimgray-200"
                      }`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                    </button>
                  </div>
                  <div className="relative h-[2px] w-full bg-gray-200">
                    <div
                      className="absolute h-full w-[100px] bg-black transition-all duration-300 ease-in-out"
                      style={{
                        transform: `translateX(${
                          activeTab === "reviews" ? "132px" : "0px"
                        })`,
                        width: activeTab === "reviews" ? "69px" : "100px",
                      }}
                    />
                  </div>
                </div>
                {/* Removed the underline image */}
              </div>
            </div>
            {activeTab === "information" ? (
              <>
                <AgencyInfoDescription
                  agencyDescriptionWidth="unset"
                  agencyDescriptionAlignSelf="stretch"
                  aboutGreenValley={agentDetails.firstName}
                  description = {agentDetails.proposals[0].aboutYou}
                  diveIntoTheWidth="630px"
                  
                />
                <AgencyInfoDescription aboutGreenValley={agentDetails.agencyName} description = {agentDetails.proposals[0].aboutAgency} agentDetails = {agentDetails} />
                <Services  agentDetails = {agentDetails}/>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-start justify-start gap-[27px] max-w-full z-[3]">
                <AgentTestimonialItems
                  image="/images/Agentpng.png"
                  agentName="About Bala"
                  
                  diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video's of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
                />
                <AgentTestimonialItems
                  image="/images/Agentpng.png"
                  agentName="About Bala"
                  diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video's of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
                />
                <AgentTestimonialItems
                  image="/images/Agentpng.png"
                  agentName="About Bala"
                  diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video's of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
                />
                <AgentTestimonialItems
                  image="/images/Agentpng.png"
                  agentName="About Bala"
                  diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video's of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
                />
              </div>
            )}
          </div>
        </div>
        <BuyerAgentFrameComponent
          counterItems="/vector-15.svg"
          counterItems1="/vector-15.svg"
          agentDetails = {agentDetails}
          details = {details}
        />
      </div>
    </div>
  );
};

export default Profile;
