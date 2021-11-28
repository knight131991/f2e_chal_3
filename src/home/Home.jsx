import React from "react";
// import PropTypes from "prop-types";
import { useHistory } from "react-router";
import useBreakPoint from "../hooks/useBreakPoint";
import styled from "styled-components";
import bgImg from "../images/BGImg.png";
import { ReactComponent as BlueCircle } from "../images/blue-circle.svg";
import { ReactComponent as WhiteCircle } from "../images/white-circle.svg";
import { ReactComponent as Spot } from "../images/GPS.svg";
import { ReactComponent as Search } from "../images/big-search.svg";
import logo from "../images/logo-home.png";
import FlexBox from "../components/FlexBox";

const BGDiv = styled.div`
  // background-image: url(${bgImg});
  height: 100vh;
  background-color: radial-gradient(
    86.64% 87.21% at 14.72% 0%,
    #414242 0%,
    #0a0a0b 100%
  );
  background-size: cover;
`;

const StyledBlueCircle = styled(BlueCircle)`
  position: fixed;
  top: 115px;
  right: ${({ bpoint }) => (bpoint === "xs" ? "-100px" : "41px")};
`;

const StyledWhiteCircle = styled(WhiteCircle)`
  position: fixed;
  right: 34px;
  top: 356px;
  right: ${({ bpoint }) => (bpoint === "xs" ? "-100px" : "34px")};
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
  position: fixed;
  right: ${({ bpoint }) => (bpoint === "xs" ? "-36px" : "105px")};
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
  position: fixed;
  right: 81px;
  right: ${({ bpoint }) => (bpoint === "xs" ? "-53px" : "81px")};
  top: 394px;
  width: 194px;
  height: 193px;
  cursor: pointer;
`;

const StyledLogo = styled((props) => <img src={logo} alt="logo" {...props} />)`
  position: fixed;
  left: ${({ bpoint }) => (bpoint === "xs" ? "21px" : "60px")};
  top: ${({ bpoint }) => (bpoint === "xs" ? "25px" : "64px")};
  ${({ bpoint }) => bpoint === "xs" && "width: 144px; height:60px;"}
`;

function Home() {
  const history = useHistory();
  const [bpoint] = useBreakPoint();
  return (
    <BGDiv>
      {bpoint && (
        <>
          <StyledLogo bpoint={bpoint} />
          <StyledBlueCircle bpoint={bpoint} />
          <StyledWhiteCircle bpoint={bpoint} />
          <BCircleBtn
            bpoint={bpoint}
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
                alert("無法取得您所在的位置");
                return;
              }
            }}
          />
          <WCircleBtn
            bpoint={bpoint}
            onClick={() => history.push("/search-bus")}
          />
        </>
      )}
    </BGDiv>
  );
}

Home.propTypes = {};

export default Home;
