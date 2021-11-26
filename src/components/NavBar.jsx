import React from "react";
import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import { ReactComponent as Back } from "../images/back.svg";
import { ReactComponent as Map } from "../images/map-1.svg";
import LogoBtn from "../components/LogoBtn";
import styled from "styled-components";

function NavBar(props) {
  return (
    <FlexBox row justify='space-between' align='center' {...props}>
      <Back />
      <LogoBtn />
      <Map />
    </FlexBox>
  );
}

NavBar.propTypes = {};

export default styled(NavBar)`
  background-color: #131414;
  padding: 25px 100px;
`;
