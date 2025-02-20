import PrimaryNavigation from "../components/PrimaryNavigation";
import AgentProfileDetails from "../components/AgentProfileDetails";
import HeaderComponent from "../components/Header";
import Footer from "../components/Footer";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const ListOfBuyerAgents = () => {
  const location = useLocation();
  const { details } = location.state || {}; // Default to an empty object if state is undefined
  const [buyerAgents, setBuyerAgents] = useState([]);

  useEffect(() => {
    // Set dummy data for buyer agents
    if (details) {
      axios
          .get('https://api.agentmatchr.com/api/allBuyerAgents')
          .then((response) => {
              console.log(response);
              setBuyerAgents(response.data.data);
              // setLoading(false);
          })
          .catch((err) => {
              // setError('Failed to fetch buyer agents');
              // setLoading(false);
          });
  }
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-[18px] px-0 box-border gap-11 leading-[normal] tracking-[normal] mq825:gap-[22px] mq1410:h-auto">
        <PrimaryNavigation details={details} />
        <main className="w-[1391px] flex flex-row items-start justify-center pt-0 px-5 pb-2.5 box-border max-w-full shrink-0">
          <section className="w-[1229px] flex flex-col items-start justify-start gap-[30px] shrink-0 max-w-full text-left text-[38px] text-black font-instrument-sans">
            <h1 className="m-0 self-stretch relative text-inherit font-semibold font-[inherit] mq450:text-[23px] mq825:text-[30px]">
              List of Buyer Agents
            </h1>
            <div className="self-stretch flex flex-col items-end justify-start gap-[54px] max-w-full text-lg text-blueviolet mq825:gap-[27px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[27px]">
                {buyerAgents.map((agent) => (
                  <AgentProfileDetails
                    key={agent._id}
                    agentId= {agent._id}
                    agentStarReviewsBackgroundImage={`url('${agent.agencyImageUrl || "/images/Agentpng.png"}')`}
                    image={agent.imageUrl || "/images/default-profile.png"}
                    name={`${agent.firstName} ${agent.lastName}`}
                    agencyName={agent.agencyName}
                    location={agent.officeAddress}
                    role={agent.role.join(", ")}
                    services={agent.proposals[0]?.services || []}
                    aboutAgency={agent.proposals[0]?.aboutAgency || ""}
                    details = {details}
                    agentDetails = {agent}
                  />
                ))}
              </div>
              <div className="w-[1179px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                <div className="w-[309px] flex flex-col items-center justify-start gap-[18px]">
                  <div className="self-stretch flex flex-row items-center justify-start gap-4 mq450:flex-wrap">
                    <div className="flex-[0.3913] rounded-3xl bg-blueviolet flex flex-col items-center justify-center py-2.5 px-4 box-border min-w-[27px] text-white mq450:flex-1">
                      <div className="relative font-semibold">1</div>
                    </div>
                    <div className="flex-[0.3913] rounded-21xl bg-white flex flex-col items-center justify-center py-2.5 px-4 box-border min-w-[27px] mq450:flex-1">
                      <div className="relative font-semibold">2</div>
                    </div>
                    <div className="flex-[0.3913] rounded-21xl bg-white flex flex-col items-center justify-center py-2.5 px-4 box-border min-w-[27px] mq450:flex-1">
                      <div className="relative font-semibold">3</div>
                    </div>
                    <div className="flex-[0.6522] rounded-21xl bg-white flex flex-col items-center justify-center py-2.5 px-[13px] box-border min-w-[27px] mq450:flex-1">
                      <div className="relative font-semibold">...</div>
                    </div>
                    <div className="flex-1 rounded-21xl bg-white flex flex-col items-center justify-center py-2.5 px-[9px] box-border min-w-[27px]">
                      <div className="relative font-semibold inline-block min-w-[23px]">
                        85
                      </div>
                    </div>
                    <ChevronRight color="#5600FF" size={20} />
                  </div>
                  <div className="w-[41px] rounded-21xl bg-white flex flex-col items-center justify-center py-2.5 px-0 box-border text-black">
                    <div className="relative font-medium inline-block min-w-[87px]">
                      1-20 of 110
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer
        fIndMyAgent="/images/findmyagent.svg"
        copyrightIcon="/vector-4.svg"
      />
    </>
  );
};

export default ListOfBuyerAgents;
