import React, { useCallback, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import { useHistory } from "react-router";
import { Spin, Steps, Tabs } from "antd";
import calEstimatedTime from "./calEstimatedTime";

function BusStopInfo(props) {
  const [count, setCount] = useState(0);
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

  return (
    <Spin spinning={isLoading}>
      <Tabs>
        {/* TODO 預期routerInfo只有2個item 但有時後端提供的資料會超過2個 所以先取前兩個 */}
        {routeInfo.slice(0, 2).map((stops, id) => {
          return (
            <TabPane
              key={id}
              tab={`往 ${stops[stops.length - 1].StopName.Zh_tw}`}
            >
              {`*於 ${count} 秒前更新`}
              <Steps direction="vertical">
                {stops.map((stop, subId) => (
                  <Step
                    key={subId}
                    title={stop.StopName.Zh_tw}
                    description={
                      estimatedTime[id][stop.StopName.Zh_tw] &&
                      estimatedTime[id][stop.StopName.Zh_tw][0]
                    }
                  />
                ))}
              </Steps>
            </TabPane>
          );
        })}
      </Tabs>
    </Spin>
  );
}

BusStopInfo.propTypes = {};

export default BusStopInfo;
