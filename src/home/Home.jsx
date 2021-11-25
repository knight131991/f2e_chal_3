import React from "react";
// import PropTypes from "prop-types";
import { useHistory } from "react-router";
import styled from "styled-components";
import bgImg from "../images/BGImg.png";
import { ReactComponent as BlueCircle } from "../images/blue-circle.svg";
import { ReactComponent as WhiteCircle } from "../images/white-circle.svg";
import { ReactComponent as Spot } from "../images/GPS.svg";
import { ReactComponent as Search } from "../images/big-search.svg";
import logo from "../images/logo-home.png";
import FlexBox from "../components/FlexBox";

const BGDiv = styled.div`
  background-image: url(${bgImg});
  height: 100vh;
  background-size: cover;
`;

const StyledBlueCircle = styled(BlueCircle)`
  position: absolute;
  right: 41px;
  top: 115px;
`;

const StyledWhiteCircle = styled(WhiteCircle)`
  position: absolute;
  right: 34px;
  top: 356px;
`;

const StyledSpot = styled(Spot)`
  width: 44.5px;
  height: 45.33px;
`;

const BCircleBtn = styled((props) => (
  <FlexBox justify="center" align="center" {...props}>
    <StyledSpot />
    附近公車站
  </FlexBox>
))`
  width: 248px;
  height: 249px;
  position: absolute;
  right: 105px;
  top: 175px;
  font-weight: 500;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const WCircleBtn = styled((props) => (
  <FlexBox justify="center" align="center" {...props}>
    <Search />
    搜尋公車
  </FlexBox>
))`
  position: absolute;
  right: 81px;
  top: 394px;
  width: 194px;
  height: 193px;
  cursor: pointer;
`;

const StyledLogo = styled((props) => <img src={logo} alt="logo" {...props} />)`
  position: absolute;
  left: 60px;
  top: 64px;
`;

function Home(props) {
  const history = useHistory();
  return (
    <BGDiv>
      <StyledLogo />
      <StyledBlueCircle />
      <StyledWhiteCircle />
      <BCircleBtn
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              ({ coords: { latitude, longitude } }) => {
                history.push({
                  pathname: "/nearby-stations",
                  search: `lat=${latitude}&long=${longitude}`,
                });
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
        }}
      />
      <WCircleBtn onClick={() => history.push("/search-bus")} />
    </BGDiv>
  );
}

Home.propTypes = {};

export default Home;
