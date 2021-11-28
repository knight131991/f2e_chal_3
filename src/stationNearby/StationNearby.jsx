import React, { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import { useHistory } from "react-router";
import useApiAdapter from "../hooks/useApiAdapter";
import useBreakPoint from "../hooks/useBreakPoint";
import axios from "axios";
import CommonList from "../components/commonList/CommonList";
import cityList from "../constant/cityList";
import NavBarContainer from "../components/NavBarContainer";
import FlexBox from "../components/FlexBox";
import LogoBtn from "../components/LogoBtn";
import styled from "styled-components";
import CircleSpin from "../components/CircleSpin";

const Container = styled(FlexBox)`
  height: 100%;
`;

const StyledLogo = styled((props) => <LogoBtn {...props} />)`
  position: relative;
  z-index: 2;
`;

const ListContainer = styled(FlexBox)`
  padding: ${({ bpoint }) => (bpoint === "xs" ? "24px 16px" : "40px 100px")};
  background-color: #131414;
  overflow: auto;
`;

const Title = styled((props) => (
  <FlexBox
    justify="center"
    align={props.bpoint === "xs" ? "flex-end" : "center"}
    {...props}
  >
    我的附近
  </FlexBox>
))`
  position: absolute;
  top: 0px;
  left: 0px;
  color: white;
  width: 100%;
  height: 100%;
  font-size: 16px;
  z-index: 1;
`;

const TitleContainer = styled.div`
  position: relative;
`;

function StationNearby() {
  const [bpoint] = useBreakPoint();
  const history = useHistory();
  const { apiAdapter: getNearbyStations } = useApiAdapter();
  const { apiAdapter: getPTBus } = useApiAdapter();
  const { lat, long } = queryString.parse(history.location.search);
  const dataSource = useMemo(() => [], []);
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    getNearbyStations({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${lat},${long},500)`
      ),
      mapper: (resp) =>
        resp.data.map(({ StationName, StationID, LocationCityCode }) => ({
          title: StationName.Zh_tw,
          stationId: StationID,
          cityCode: LocationCityCode,
        })),
      onSuccess: (stations) => {
        if (
          !cityList.find((item) =>
            stations.map(({ cityCode }) => cityCode).includes(item.code)
          )
        ) {
          alert("目前無法確認您所在的城市");
          return;
        }
        stations.forEach(({ title, stationId, cityCode }) => {
          const city = cityList.find((item) => item.code === cityCode).value;
          getPTBus({
            api: axios.get(
              `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/PassThrough/Station/${stationId}`
            ),
            onSuccess: (routes) => {
              dataSource.push({
                title,
                desc: routes.map((route) => route.RouteName.Zh_tw).join(", "),
                onClick: () =>
                  history.push({
                    pathname: "/station-bus-list",
                    search: `city=${city}&stationId=${stationId}&station=${encodeURIComponent(
                      title
                    )}`,
                  }),
              });
              setLoaded(true);
            },
          });
        });
      },
    });
  }, [getNearbyStations, lat, long, dataSource, getPTBus, history]);

  return (
    <Container>
      <NavBarContainer bpoint={bpoint}>
        <TitleContainer>
          <StyledLogo bpoint={bpoint} />
          <Title bpoint={bpoint} />
        </TitleContainer>
      </NavBarContainer>
      <ListContainer bpoint={bpoint} flex>
        <CircleSpin spinning={!loaded}>
          {loaded && <CommonList dataSource={dataSource} />}
        </CircleSpin>
      </ListContainer>
    </Container>
  );
}

StationNearby.propTypes = {};

export default StationNearby;
