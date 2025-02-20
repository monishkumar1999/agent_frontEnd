import AgentOneDetails from "./AgentOneDetails";
import PropTypes from "prop-types";

const TopRatedAgents = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end pt-0 pb-[82px] pl-16 pr-[63px] box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans mq450:pb-[34px] mq450:box-border mq1125:pb-[53px] mq1125:box-border mq1350:pl-8 mq1350:pr-[31px] mq1350:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[60px] max-w-full mq800:gap-[30px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[632px] flex flex-col items-start justify-start gap-[15px] max-w-full">
            <h1 className="m-0 self-stretch relative text-[48px] font-semibold font-[inherit] mq800:text-19xl mq450:text-10xl">
              Meet Our Top-Rated Agents
            </h1>
            <div className="">
              <div className="">
                Meet Our Most Recommended Agents, Here to Make Your Move Easy
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-8 max-w-full text-left text-base text-white mq800:gap-4">
          <div className="self-stretch flex flex-row items-start justify-center flex-wrap content-start gap-8 max-w-full mq800:gap-4">
            <AgentOneDetails
              agentOneDetailsJustifyContent="flex-start"
              agentOneRatingBackgroundImage="url('/images/Agentpng.png')"
              image="/images/Agentpng.png"
              agentName = "Alex"
              agentDesciptionShort = "Alex is a seasoned real estate agent passionate about helping clients find their dream homes. With a keen eye for detail and a deep understanding of the market, he guides clients through home-buying, from property search to closing"
              rating="4.9 (202 Reviews)"
              location="Manchester"
              jobrole = "Real Estate Market Advisor at Greenville"
            />
            <AgentOneDetails
              agentOneDetailsJustifyContent="flex-start"
              agentOneRatingBackgroundImage="url('/images/person2.jpg')"
              image="/images/person2.jpg"
              agentName = "Sarah"
              agentDesciptionShort = "Sarah leverages the latest technology to provide a seamless home-buying experience. She uses virtual tours, advanced search tools, and social media to help clients find their perfect home."
              rating="4.9 (238 Reviews)"
              location="Liverpool"
              jobrole = "Property Research Specialist at BuyerNest"
            />
          </div>
          <div className="self-stretch flex flex-row items-start justify-center flex-wrap content-start gap-8 max-w-full mq800:gap-4">
            <AgentOneDetails
              agentOneDetailsJustifyContent="center"
              agentOneRatingBackgroundImage="url('/images/person3.jpg')"
              image="/images/person3.jpg"
              agentName = "David"
              agentDesciptionShort = "David is a local expert with an in-depth understanding of neighborhoods and communities. He helps clients find homes that match their lifestyles and preferences."
              rating="4.8 (241 Reviews)"
              location="North Yorkshire"
              jobrole = "Advocate for Buyer’s Interests at NextStep Realty"
            />
            <AgentOneDetails
              agentOneDetailsJustifyContent="center"
              agentOneRatingBackgroundImage="url('/images/person4.jpg')"
              image="/images/person4.jpg"
              agentName = "Emily"
              agentDesciptionShort = "Emily specializes in helping first time homebuyers navigate the complex process of purchasing a home. She provides expert advice on budgeting, financing, and negotiating. "
              rating="4.9 (190 Reviews)"
              location="Cornwall"
              jobrole = "Legal and Compliance Advisor at HavenHunters"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

TopRatedAgents.propTypes = {
  className: PropTypes.string,
};

export default TopRatedAgents;
