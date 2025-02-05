"use client";

import { useState, useEffect } from "react";
import FIndMyAgentLogo from "../components/FIndMyAgentLogo";
import NavLink from "../components/NavLink";
import ContentBlock from "../components/ContentBlock";
import FrameComponent1 from "../components/ExplainationFrameComponent1";
import PageNavigation from "../components/PageNavigation";
import Footer from "../components/Footer";
import RegisterAndLoginBtn from "../components/RegisterAndLoginBtn";
import { useNavigate } from "react-router-dom";

const ExplainingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="w-[93%] mx-auto flex flex-row items-start justify-start pt-4 px-[33px] pb-4 box-border max-w-full text-left text-base text-black font-instrument-sans">
          <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5">
            <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[7.9px]">
              <FIndMyAgentLogo />
            </div>
            <div className="flex flex-row items-center justify-start gap-2 text-base text-white">
              <RegisterAndLoginBtn
                frameDivBackgroundColor="#8046F1"
                register="Register"
                onClick={() => navigate("/register")} // Navigate to /login
              />
              <RegisterAndLoginBtn
                frameDivBackgroundColor="#fff"
                frameDivHeight="44px"
                frameDivBorder="1px solid #8046f1"
                register="Log In"
                registerColor="#8046f1"
                registerDisplay="inline-block"
                registerMinWidth="47px"
                onClick={() => navigate("/login")}
              />
            </div>

          </div>
        </div>
      </header>
      <div className="w-full min-h-screen relative bg-white overflow-hidden flex flex-col items-start justify-start pt-[130px] px-12 pb-[110px] box-border gap-[132px] leading-[normal] tracking-[normal] mq450:gap-[33px] mq750:gap-[66px] mq750:pl-6 mq750:pr-6 mq750:box-border mq1275:h-auto">
        <div className="w-[696px] flex flex-row items-start justify-start pt-0 px-8 pb-12 box-border max-w-full shrink-0 mq450:pb-[31px] mq450:box-border">
          <ContentBlock />
        </div>
        <FrameComponent1 />
        <section className="self-stretch flex flex-row items-start justify-start py-0 pl-[33px] pr-8 box-border max-w-full text-center text-29xl text-white font-instrument-sans">
          <div className="flex-1 rounded-[34px] bg-gainsboro overflow-hidden flex flex-row items-start justify-between pt-[95px] pb-[87.5px] pl-[232px] pr-[236px] box-border relative max-w-full gap-5 mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[58px] mq750:pr-[59px] mq750:box-border mq1275:flex-wrap mq1275:pl-[116px] mq1275:pr-[118px] mq1275:box-border">
            <img
              className=" hidden lg:block h-[572px] w-[-webkit-fill-available] absolute !m-[0] bottom-[-229px] left-[-1px] object-cover"
              alt=""
              src="/image@2x.png"
            />
            <h1 className=" block !m-[0] w-[calc(100%_+_1px)] absolute top-[40px] left-[0px] text-[48px] font-semibold font-[inherit] inline-block z-[1] mq450:text-10xl mq750:text-19xl">
              How does it work?
            </h1>
            <img
              className="hidden lg:block h-[71.5px] w-[313px] relative z-[1]"
              alt=""
              src="/process-icons.svg"
            />
            <img
              className=" hidden lg:block h-[71.5px] w-[313px] relative z-[1]"
              alt=""
              src="/process-icons.svg"
            />
          </div>
        </section>


        
        <section className="self-stretch flex flex-col lg:flex-row items-start justify-between max-w-full shrink-0 gap-5 text-center text-xl text-black font-instrument-sans mq1275:flex-wrap mq1275:justify-center -mt-[200px]">

        <h1 className="text-black block text-center font-bold m-auto md:hidden ">
              How does it work?
            </h1>
            
  <div className="w-full lg:w-[368.5px] flex flex-col items-center justify-start py-0 pl-0 pr-3.5 box-border gap-3 max-w-full">
    <img
      className="w-[80%] lg:w-[286px] h-[206px] relative !m-[0] rounded-[50%] object-cover z-[2]"
      alt=""
      src="/image-3@2x.png"
    />
    <div className="self-stretch relative tracking-[0.03em] font-semibold text-base mq450:text-base">
      Create your proposal
    </div>
    <div className="relative text-base leading-[24px] text-darkslategray">
      Add some information about yourself, your agency and your fees
      which will be presented to homeowners comparing agents
      side-by-side
    </div>
  </div>

  <div className="w-full lg:w-[355px] flex flex-col items-center justify-start gap-3 max-w-full">
    <img
      className="w-[80%] lg:w-[286px] h-[206px] !m-[0] rounded-[50%] object-cover z-[2]"
      alt=""
      src="/image-2@2x.png"
    />
    <div className="self-stretch relative tracking-[0.03em] font-semibold text-base mq450:text-base">
      Receive qualified leads
    </div>
    <div className="self-stretch flex flex-row items-start justify-start py-0 px-px box-border max-w-full text-base text-darkslategray">
      <div className="flex-1 relative leading-[24px] inline-block max-w-full">
        You'll receive instant notifications to your app or portal where
        you can easily respond to, manage, and nurture your leads.
      </div>
    </div>
  </div>

  <div className="w-full lg:w-[352px] flex flex-col items-center justify-start gap-3 max-w-full">
    <img
      className="w-[80%] lg:w-[286px] h-[206px] relative !m-[0] rounded-[50%] object-cover z-[2]"
      alt=""
      src="/image-1@2x.png"
    />
    <div className="self-stretch flex flex-row items-start justify-start py-0 px-[18px]">
      <div className="flex-1 relative tracking-[0.03em] font-semibold text-base mq450:text-base">
        Pay-on-success
      </div>
    </div>
    <div className="relative text-base leading-[24px] text-darkslategray">
      You only pay LocalAgentFinder a fee if you successfully sell or
      manage the property.
    </div>
  </div>
</section>


      </div>

      <Footer
        fIndMyAgent="/images/findmyagent.svg"
        copyrightIcon="/vector-4.svg"
      />
    </>
  );
};

export default ExplainingPage;
