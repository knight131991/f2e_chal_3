import React, { useCallback, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import { useHistory } from "react-router";
import { Steps, Tabs } from "antd";
import calEstimatedTime from "./calEstimatedTime";
import NavBarWithTabs from "../components/NavBarWithTabs";
import TabTitle from "../components/TabTitle";
import styled from "styled-components";
import BusSteps from "../components/BusSteps";
import BusStateDiv from "../components/BusStateDiv";
import FlexBox from "../components/FlexBox";
import GMap from "../components/GMap";
import CircleSpin from "../components/CircleSpin";
import { ReactComponent as Map } from "../images/map-1.svg";

const StyledBusStateDiv = styled(BusStateDiv)`
  margin-bottom: 14px;
`;

const SText = styled.span`
  color: ${({ busIn }) => (busIn ? "#1CC8EE" : "white")};
  margin-left: 12px;
`;

const Container = styled(FlexBox)`
  width: 100%;
`;

const Text = styled(FlexBox)`
  width: 100%;
  max-width: 640px;
  margin-bottom: 25px;
`;

const HiddenMap = styled(Map)`
  visibility: hidden;
`;

function BusStopInfo({ bpoint }) {
  const [count, setCount] = useState(0);
  const [showMap, setShowMap] = useState();
  const {
    apiAdapter: getRouteInfo,
    isLoading,
    data: routeInfo,
  } = useApiAdapter([]);
  const {
    apiAdapter: getEstimatedTime,
    isLoading: loadingETime,
    data: estimatedTime,
  } = useApiAdapter(["", ""]);
  const history = useHistory();
  const { city, route } = queryString.parse(history.location.search);
  const { TabPane } = Tabs;
  const { Step } = Steps;

  const handleGetEstimatedTime = useCallback(() => {
    getEstimatedTime({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${encodeURIComponent(
          route
        )}`
      ),
      mapper: (resp) => calEstimatedTime(resp.data),
    });
  }, [getEstimatedTime, city, route]);

  useEffect(() => {
    getRouteInfo({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${city}/${encodeURIComponent(
          route
        )}`
      ),
      mapper: (resp) => resp.data.map((item) => item.Stops),
      onSuccess: (data) => {
        if (data.length !== 2) console.error("公車路線資訊不如預期");
      },
    });
  }, [getRouteInfo, city, route]);

  useEffect(() => {
    handleGetEstimatedTime();
    const interval = setInterval(() => {
      setCount(0);
      handleGetEstimatedTime();
    }, 10000);
    return () => clearInterval(interval);
  }, [handleGetEstimatedTime]);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(counter);
  }, [count]);

  const getState = useCallback((eTime) => {
    if (eTime === "進站中") return "in";
    if (eTime === "未發車" || eTime === "今日未營運" || eTime === "末班車已過")
      return "out";
    return "normal";
  }, []);

  return (
    <CircleSpin spinning={isLoading}>
      <NavBarWithTabs
        bpoint={bpoint}
        customMap={showMap && <HiddenMap />}
        onClickMap={() => setShowMap(true)}
      >
        {/* TODO 預期routerInfo只有2個item 但有時後端提供的資料會超過2個 所以先取前兩個 */}
        {routeInfo.slice(0, 2).map((stops, id) => (
          <TabPane
            key={id}
            tab={<TabTitle>{stops[stops.length - 1].StopName.Zh_tw}</TabTitle>}
          >
            {showMap ? (
              <GMap steps={stops} bpoint={bpoint} />
            ) : (
              <Container align="center">
                <Text align="flex-end">{`*於 ${count} 秒前更新`}</Text>
                <BusSteps bpoint={bpoint}>
                  {stops.map((stop, subId) => {
                    const eTime =
                      estimatedTime[id][stop.StopName.Zh_tw] &&
                      estimatedTime[id][stop.StopName.Zh_tw][0];
                    return (
                      <Step
                        key={subId}
                        status={eTime === "進站中" ? "process" : "wait"}
                        title={
                          <>
                            <StyledBusStateDiv state={getState(eTime)}>
                              {eTime}
                            </StyledBusStateDiv>
                            <SText busIn={eTime === "進站中"}>
                              {stop.StopName.Zh_tw}
                            </SText>
                          </>
                        }
                      />
                    );
                  })}
                </BusSteps>
              </Container>
            )}
          </TabPane>
        ))}
      </NavBarWithTabs>
    </CircleSpin>
  );
}

BusStopInfo.propTypes = {};

export default BusStopInfo;
