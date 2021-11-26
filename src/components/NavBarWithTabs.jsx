import React from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { Tabs } from "antd";
import styled from "styled-components";

const StyledTabs = styled(Tabs)`
  background: #1c1d1d;
  color: #1cc8ee;
  & .ant-tabs-tabpane {
    display: flex;
    justify-content: center;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
    justify-content: center;
    background-color: #131414;
  }
  & .ant-tabs-tab {
    min-width: 320px;
    justify-content: center;
  }
  & .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background: #1cc8ee;
    box-shadow: 0px 0px 6px #1cc8ee, 0px 0px 2px #1cc8ee;
    border-radius: 50px;
  }
`;

function NavBarWithTabs(props) {
  return (
    <>
      <NavBar />
      <StyledTabs {...props} />
    </>
  );
}

NavBarWithTabs.propTypes = {};

export default NavBarWithTabs;
