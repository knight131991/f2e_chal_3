import React from "react";
import PropTypes from "prop-types";
import logo from "../images/logo.svg";
import { useHistory } from "react-router";
import styled from "styled-components";

function LogoBtn(props) {
  const history = useHistory();
  return (
    <img
      src={logo}
      alt="logo"
      onClick={() => history.push("/home")}
      {...props}
    />
  );
}

LogoBtn.propTypes = {};

export default styled(LogoBtn)`
  cursor: pointer;
`;
