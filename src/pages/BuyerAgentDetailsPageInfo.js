import Profile from "../components/Profile";
import Services from "../components/Services";
import Footer from "../components/Footer";
import BuyerAgentPage from "../components/BuyerAgentPage";
import HeaderComponent from "../components/Header";
import PrimaryNavigation from "../components/PrimaryNavigation";
import { useLocation } from "react-router-dom";

const BuyerAgentDetailsPageInfo = () => {
  const location = useLocation();
  const { details, agentDetails } = location.state || {};
  return (
    <>
      <HeaderComponent />
      <div className="w-full  relative bg-white overflow-hidden flex flex-col items-start justify-start pt-[18px] px-0 box-border gap-11 leading-[normal] tracking-[normal] mq825:gap-[22px] mq1410:h-auto">
      <PrimaryNavigation details={details} />
        <section className="self-stretch flex flex-row items-start justify-center pt-0 pb-[51px] pl-[21px] pr-5 box-border max-w-full shrink-0 mq825:pb-[21px] mq825:box-border mq450:pb-5 mq450:box-border mq1410:pb-[33px] mq1410:box-border">
          <div className="w-[973px] flex flex-col items-start justify-start gap-[89px] max-w-full lg:gap-11 mq825:gap-[22px]">
            <Profile agentDetails={agentDetails} details={details}/>
            {/* <Services /> */}
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

export default BuyerAgentDetailsPageInfo;
