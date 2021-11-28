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

function NavBar({ onClickBack, bpoint, onClickMap, customMap, ...rest }) {
  const history = useHistory();
  const defaultClickBack = useCallback(() => history.goBack(), [history]);
  return (
    <NavBarContainer
      row
      justify="space-between"
      align="center"
      bpoint={bpoint}
      {...rest}
    >
      <Clickable>
        <Back onClick={onClickBack || defaultClickBack} />
      </Clickable>
      <LogoBtn bpoint={bpoint} />
      <Clickable onClick={onClickMap}>
        {customMap ? customMap : <Map />}
      </Clickable>
    </NavBarContainer>
  );
}

NavBar.propTypes = {};

export default NavBar;
