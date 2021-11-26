import React from "react";
import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import { ReactComponent as Back } from "../images/back.svg";
import { ReactComponent as Map } from "../images/map-1.svg";
import LogoBtn from "../components/LogoBtn";
import styled from "styled-components";
import { useHistory } from "react-router";

const Clickable = styled.span`
  cursor: pointer;
`;

function NavBar(props) {
  const history = useHistory();
  return (
    <FlexBox row justify="space-between" align="center" {...props}>
      <Clickable>
        <Back onClick={() => history.goBack()} />
      </Clickable>
      <LogoBtn />
      <Clickable>
        <Map />
      </Clickable>
    </FlexBox>
  );
}

NavBar.propTypes = {};

export default styled(NavBar)`
  background-color: #131414;
  padding: 25px 100px;
`;
