import { useMemo } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const BuyerAgentFrameComponent = ({
  className = "",
  frameDivMinWidth,
  frameDivMarginLeft,
  frameDivMargin,
  frameDivPosition,
  frameDivTop,
  frameDivRight,
  counterItems,
  counterItems1,
  agentDetails,
  details
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      minWidth: frameDivMinWidth,
      marginLeft: frameDivMarginLeft,
      margin: frameDivMargin,
      position: frameDivPosition,
      top: frameDivTop,
      right: frameDivRight,
    };
  }, [
    frameDivMinWidth,
    frameDivMarginLeft,
    frameDivMargin,
    frameDivPosition,
    frameDivTop,
    frameDivRight,
  ]);

  const clickedContactAgent = async () => {
    try {
      let data = {
        bedroomCount: details.bedroomCount,
        emailAddress: details.emailAdress,
        isAssistance: details.isAssistance,
        isLegalReady: details.isLegalReady,
        location: details.location,
        phoneNumber: details.phoneNumber,
        propertyType: details.propertyType,
        selectedOption: details.selectedOption,
        selectedPurpose: details.selectedPurpose,
        selectedUserCommunication: details.selectedUserCommunication,
        weeklyOrSaleValue: details.weeklyOrSaleValue,
        buyerAgentId: agentDetails._id,
        isAccepted: false
      }
      // console.log(data, "userDetails");
      // console.log(buyerAgent,"buyerAgent");

      const response = await axios.post('https://api.agentmatchr.com/api/userRequest', data);

      if (response.status === 200) {
        toast.error("Sent request to this Buyer Agent", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {

        toast.error("Failed to submit request.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  return (
    <div
      className={`rounded-xl bg-blueviolet overflow-hidden flex flex-col items-start justify-start pt-[17px] pb-[30px] pl-3.5 pr-[13px] box-border gap-[54px] min-w-[310px] z-[1] ml-[-18px] text-left text-base text-white font-instrument-sans mq825:flex-1 mq825:ml-0 mq450:gap-[27px] ${className}`}
      style={frameDivStyle}
    >
      <ToastContainer  toastStyle={{ zIndex: 999999, marginTop:"15%" }}/>
      <div className="w-[138px] flex flex-row items-start justify-start py-0 px-0.5 box-border">
        <div className="flex-1 flex flex-row items-start justify-start relative mq825:flex-1">
          <img
            className="h-px w-[278.5px] absolute !m-[0] top-[59px] right-[-144.5px]"
            loading="lazy"
            alt=""
            src={counterItems}
          />
          <div className="flex-1 flex flex-col items-start justify-start gap-6 z-[1]">
            <div className="self-stretch flex flex-col items-start justify-start gap-2">
              <div className="relative font-semibold inline-block min-w-[17px]">
                {agentDetails.proposals[0].salesTeamSize}
              </div>
              <div className="relative text-sm font-medium text-gray-200">
                Team Count
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[25px] relative gap-2">
              <div className="relative font-semibold">{agentDetails.proposals[0].saleAuthority}</div>
              <div className="absolute !m-[0] right-[-27px] bottom-[0px] text-sm font-medium text-gray-200">
                Buyer Agreement Period
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-2">
              <div className="relative font-semibold inline-block min-w-[23px]">
                {agentDetails.proposals[0].videoCallOption}
              </div>
              <div className="relative text-sm font-medium text-gray-200 inline-block min-w-[118px]">
                {" "}
                Video Call Option
              </div>
            </div>
          </div>
          <img
            className="h-px w-[278.5px] absolute !m-[0] right-[-144.5px] bottom-[49px] z-[2]"
            loading="lazy"
            alt=""
            src={counterItems1}
          />
        </div>
      </div>
      <button onClick={clickedContactAgent} className="cursor-pointer [border:none] py-3 px-[68px] bg-white rounded-29xl flex flex-row items-start justify-start hover:bg-gainsboro mq450:pl-5 mq450:pr-5 mq450:box-border">
        <div className="relative text-base font-medium font-instrument-sans text-blueviolet text-left">
          Contact with Agent
        </div>
      </button>
    </div>
  );
};

BuyerAgentFrameComponent.propTypes = {
  className: PropTypes.string,
  counterItems: PropTypes.string,
  counterItems1: PropTypes.string,

  /** Style props */
  frameDivMinWidth: PropTypes.string,
  frameDivMarginLeft: PropTypes.string,
  frameDivMargin: PropTypes.string,
  frameDivPosition: PropTypes.string,
  frameDivTop: PropTypes.string,
  frameDivRight: PropTypes.string,
  agentDetails: PropTypes.object,
  details: PropTypes.object
};

export default BuyerAgentFrameComponent;
