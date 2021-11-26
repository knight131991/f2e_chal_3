import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BusStateDiv = styled((props) => <span {...props} />)`
  display: inline-block;
  padding: 8.5px 18.5px;
  line-height: 1.5;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  min-width: 80px;
  background-color: ${({ state }) => (state === "in" ? "#1CC8EE" : "#131414")};
  color: ${({ state }) => {
    if (state === "normal") {
      return "#1CC8EE";
    } else if (state === "in") {
      return "#131414";
    } else {
      return "#414242";
    }
  }};
  border: ${({ state }) => state === "normal" && "1px solid #1CC8EE"};
  box-shadow: ${({ state }) => state === "normal" && "0px 0px 5px #1CC8EE"};
  border-radius: 12px;
`;

BusStateDiv.propTypes = {};

export default BusStateDiv;
