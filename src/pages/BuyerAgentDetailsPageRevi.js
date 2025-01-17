import Name1 from "../components/Name1";
import FrameComponent from "../components/FrameComponent";
import AgentTestimonialItems from "../components/AgentTestimonialItems";
import Footer from "../components/Footer";
import BuyerAgentPage from "../components/BuyerAgentPage";

const BuyerAgentDetailsPageRevi = () => {
  return (
    <div className="w-full h-[2385px] relative bg-white overflow-hidden flex flex-col items-start justify-start pt-[18px] px-0 pb-[632px] box-border gap-11 leading-[normal] tracking-[normal] mq825:gap-[22px] mq1410:h-auto">
      <BuyerAgentPage
        fIndMyAgent="/findmyagent.svg"
        budgetTextDecoration="none"
        eMailTextDecoration="none"
      />
      <section className="self-stretch flex flex-row items-start justify-center pt-0 pb-[135px] pl-5 pr-6 box-border max-w-full shrink-0 text-left text-lg text-darkslategray font-instrument-sans mq825:pb-[57px] mq825:box-border mq450:pb-[37px] mq450:box-border mq1410:pb-[88px] mq1410:box-border">
        <div className="w-[978px] flex flex-col items-start justify-start gap-7 max-w-full">
          <div className="flex flex-row items-start justify-start py-0 px-[5px]">
            <Name1
              nameWidth="unset"
              nameFlex="1"
              centralParkDisplay="unset"
              centralParkMinWidth="unset"
              reviewsDisplay="unset"
              reviewsMinWidth="unset"
            />
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[5px] pr-0 box-border max-w-full">
            <div className="self-stretch flex-1 flex flex-row items-start justify-center py-[191px] px-5 box-border relative max-w-full mq450:pt-[124px] mq450:pb-[124px] mq450:box-border">
              <img
                className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="/image@2x.png"
              />
              <img
                className="h-[72px] w-[80.2px] relative z-[1]"
                loading="lazy"
                alt=""
                src="/playcircle02.svg"
              />
            </div>
          </div>
          <div className="w-[669px] flex flex-row items-start justify-start pt-0 px-[5px] pb-[9.5px] box-border max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[1.5px] box-border gap-4 max-w-full">
              <div className="flex flex-row items-start justify-start py-0 px-[5px]">
                <div className="flex flex-row items-start justify-start gap-8">
                  <div className="relative leading-[26px] font-medium inline-block min-w-[100px]">
                    Information
                  </div>
                  <input
                    className="w-[69px] [border:none] [outline:none] font-medium font-instrument-sans text-lg bg-[transparent] relative leading-[26px] text-black text-left inline-block p-0"
                    placeholder="Reviews"
                    type="text"
                  />
                </div>
              </div>
              <img
                className="self-stretch relative max-w-full overflow-hidden max-h-full"
                alt=""
                src="/group-33830.svg"
              />
            </div>
          </div>
          <div className="w-[739px] flex flex-row items-start justify-start relative max-w-full">
            <FrameComponent
              frameDivMinWidth="unset"
              frameDivMarginLeft="unset"
              frameDivMargin="0 !important"
              frameDivPosition="absolute"
              frameDivTop="-81px"
              frameDivRight="-235px"
              counterItems="/vector-15.svg"
              counterItems1="/vector-15.svg"
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-[27px] max-w-full z-[3]">
              <AgentTestimonialItems
                image="/image-1@2x.png"
                agentName="About Bala"
                diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video’s of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
              />
              <AgentTestimonialItems
                image="/image-2@2x.png"
                agentName="About Bala"
                diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video’s of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
              />
              <AgentTestimonialItems
                image="/image-3@2x.png"
                agentName="About Bala"
                diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video’s of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
              />
              <AgentTestimonialItems
                image="/image-1@2x.png"
                agentName="About Bala"
                diveIntoTheWorldOfRealEstate="Dive into the world of real estate with a trusted ally by your side – the Buyer Agent! This profile is. Juan was great and sent through photos and video’s of the dogs as well as taking them on adventures and giving them lots of love! Will rebook in the future for sure!"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer
        fIndMyAgent="/findmyagent-1.svg"
        categoriesMargin="0"
        reviewsMargin="0"
        listingsMargin="0"
        contactUsMargin="0"
        aboutUsMargin="0"
        awardsMargin="0"
        usefulSitesMargin="0"
        privacyPolicyMargin="0"
        thStreetOfMargin="0"
        copyrightIcon="/vector-4.svg"
      />
    </div>
  );
};

export default BuyerAgentDetailsPageRevi;
