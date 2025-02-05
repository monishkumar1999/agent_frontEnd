import { useMemo } from "react";
import PropTypes from "prop-types";

const NavLink = ({
  className = "",
  listing,
  listingMinWidth,
  listingDisplay,
  listingTextDecoration,
  listingFontSize,
  listingTextAlign,
  listingAlignSelf,
}) => {
  const listingStyle = useMemo(() => {
    return {
      minWidth: listingMinWidth,
      display: listingDisplay,
      textDecoration: listingTextDecoration,
      fontSize: listingFontSize,
      textAlign: listingTextAlign,
      alignSelf: listingAlignSelf,
    };
  }, [
    listingMinWidth,
    listingDisplay,
    listingTextDecoration,
    listingFontSize,
    listingTextAlign,
    listingAlignSelf,
  ]);

  return (
    <a
      className={`[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[52px] ${className}`}
      style={listingStyle}
    >
      {listing}
    </a>
  );
};

NavLink.propTypes = {
  className: PropTypes.string,
  listing: PropTypes.string,

  /** Style props */
  listingMinWidth: PropTypes.string,
  listingDisplay: PropTypes.string,
  listingTextDecoration: PropTypes.string,
  listingFontSize: PropTypes.string,
  listingTextAlign: PropTypes.string,
  listingAlignSelf: PropTypes.string,
};

export default NavLink;
