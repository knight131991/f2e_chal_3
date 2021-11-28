import React, { useCallback } from "react";
import { ReactComponent as Back } from "../images/back.svg";
import { ReactComponent as Map } from "../images/map-1.svg";
import LogoBtn from "../components/LogoBtn";
import styled from "styled-components";
import { useHistory } from "react-router";
import NavBarContainer from "./NavBarContainer";

const Clickable = styled.span`
  cursor: pointer;
`;

function NavBar(props) {
  const history = useHistory();
  const defaultClickBack = useCallback(() => history.goBack(), [history]);
  return (
    <NavBarContainer row justify="space-between" align="center" {...props}>
      <Clickable>
        <Back onClick={props.onClickBack || defaultClickBack} />
      </Clickable>
      <LogoBtn bpoint={props.bpoint} />
      <Clickable onClick={props.onClickMap}>
        {props.customMap ? props.customMap : <Map />}
      </Clickable>
    </NavBarContainer>
  );
}

NavBar.propTypes = {};

export default NavBar;
