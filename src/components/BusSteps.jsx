import React from "react";
// import PropTypes from "prop-types";
import { Steps } from "antd";
import styled from "styled-components";

const StyledSteps = styled(Steps)`
  max-width: 640px;
  & .ant-steps-item.ant-steps-item-process {
    display: flex;
  }
  & .ant-steps-item-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  & .ant-steps-item-process .ant-steps-item-icon {
    top: 2px;
    width: 8px;
  }

  &.ant-steps-vertical.ant-steps-dot
    .ant-steps-item
    > .ant-steps-item-container
    > .ant-steps-item-tail {
    right: 28px;
    left: unset;

    &:after {
      width: 1.2px;
      background-color: #1cc8ee;
      height: 127%;
    }
  }
`;

const Circle = styled.span`
  height: 15px;
  width: 15px;
  background-color: ${({ bg }) => (bg ? "#1CC8EE" : "transparent")};
  border: 2px solid #1cc8ee;
  border-radius: 50%;
  display: inline-block;
`;

function BusSteps(props) {
  return (
    <StyledSteps
      direction="vertical"
      progressDot={(iconDot, { index, status, title, description }) => (
        <Circle bg={status !== "wait"} />
      )}
      {...props}
    />
  );
}

BusSteps.propTypes = {};

export default BusSteps;
