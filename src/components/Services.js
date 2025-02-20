import OptionsRowsBtn from "./OptionsRowsBtn";
import PropTypes from "prop-types";

const Services = ({ className = "", agentDetails }) => {
  return (
    <div
      className={`w-[886px] flex flex-col items-start justify-start gap-[34px] max-w-full text-left text-lg text-black font-instrument-sans mq450:gap-[17px] ${className}`}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-3 max-w-full">
        <div className="self-stretch relative leading-[26px] font-medium">
          Services Offered
        </div>
        <div className="w-[745px] flex flex-row items-center justify-start flex-wrap content-center gap-3 max-w-full text-center">

          {agentDetails.proposals[0].services.map((service, index) => (
            <OptionsRowsBtn
              key={index} // Use a unique key for each iteration
              negotiation={service}
              negotiationDisplay="unset"
              negotiationMinWidth="unset"
              serviceOptionsRowsHeight="42px"
              serviceOptionsRowsFlex="unset"
              serviceOptionsRowsMinWidth="unset"
              serviceOptionsRowsMinHeight="unset"
              negotiationFlex="unset"
            />
          ))}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-3 max-w-full">
        <div className="self-stretch relative leading-[26px] font-medium">
          Our Specialization
        </div>
        <div className="w-[511px] flex flex-row items-center justify-start flex-wrap content-center gap-3 max-w-full text-center">
          {agentDetails.proposals[0].specializations.map((service, index) => (
            <OptionsRowsBtn
              key={index} // Use a unique key for each iteration
              negotiation={service}
              negotiationDisplay="unset"
              negotiationMinWidth="unset"
              serviceOptionsRowsHeight="42px"
              serviceOptionsRowsFlex="unset"
              serviceOptionsRowsMinWidth="unset"
              serviceOptionsRowsMinHeight="unset"
              negotiationFlex="unset"
            />
          ))}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-3">
        <div className="self-stretch relative leading-[26px] font-medium">
          Postcodes which we serve
        </div>
        <div className="w-[285px] flex flex-row items-center justify-start gap-3 text-center">
          {agentDetails.proposals[0].postcodes
            .filter((postcode) => postcode.trim() !== "") // Filter out empty strings or whitespace-only strings
            .map((service, index) => (
              <OptionsRowsBtn
                key={index} // Use a unique key for each iteration
                negotiation={service}
                negotiationDisplay="unset"
                negotiationMinWidth="unset"
                serviceOptionsRowsHeight="42px"
                serviceOptionsRowsFlex="unset"
                serviceOptionsRowsMinWidth="unset"
                serviceOptionsRowsMinHeight="unset"
                negotiationFlex="unset"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

Services.propTypes = {
  className: PropTypes.string,
  agentDetails: PropTypes.object,
};

export default Services;
