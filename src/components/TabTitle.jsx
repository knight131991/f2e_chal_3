import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledText = styled.span`
  color: #1cc8ee;
`;

function TabTitle({ children, ...rest }) {
  return (
    <span {...rest}>
      <StyledText>{`往  `}</StyledText>
      {children}
    </span>
  );
}

TabTitle.propTypes = {};

export default styled(TabTitle)`
  color: white;
  font-size: 16px;
`;
