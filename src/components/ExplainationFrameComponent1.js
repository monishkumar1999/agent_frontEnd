import FrameComponent from "./ExplainationFrameComponent";
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start py-0 pl-8 pr-[31px] box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans ${className}`}
    >
      <div className="flex-1 flex flex-col items-center justify-start gap-12 max-w-full mq750:gap-6">
        <h1 className="m-0 w-[634px] text-[48px] relative text-inherit font-semibold font-[inherit] inline-block max-w-full mq450:text-10xl mq750:text-19xl">
          Helping Agents Thrive, One Connection at a Time
        </h1>
        <div className="self-stretch flex flex-row items-start justify-center flex-wrap content-start gap-[33px] max-w-full text-left text-xl mq750:gap-4">
          <FrameComponent
            benefitIcons="/frame-1618873306@2x.png"
            highlyQualifiedLeads="Highly qualified leads"
            weConnectThousandsOfHomeowners="We connect thousands of homeowners with real estate agents across Australia every month."
          />
          <FrameComponent
            benefitIcons="/frame-1618873308@2x.png"
            benefitHeadingsPadding="unset"
            highlyQualifiedLeads="Lead management technology"
            highlyQualifiedLeadsDisplay="unset"
            weConnectThousandsOfHomeowners="Manage and update your leads within your agent app or portal, where you can also delegate leads to other team members"
            weConnectThousandsWidth="unset"
            weConnectThousandsDisplay="unset"
          />
          <FrameComponent
            benefitIcons="/frame-1618873307@2x.png"
            benefitHeadingsPadding="0px 0px 0px 0px"
            highlyQualifiedLeads="National account management program"
            highlyQualifiedLeadsDisplay="inline-block"
            weConnectThousandsOfHomeowners="We’re here to support you in winning more listings by keeping you up-to-date with insights and introducing you to new tools and features."
            weConnectThousandsWidth="419px"
            weConnectThousandsDisplay="inline-block"
          />
        </div>
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
