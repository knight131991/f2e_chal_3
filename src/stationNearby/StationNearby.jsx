import React, { useEffect, useMemo } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import { useHistory } from "react-router";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import CommonList from "../components/commonList/CommonList";
import cityList from "../constant/cityList";

function StationNearby(props) {
  const history = useHistory();
  const { apiAdapter: getNearbyStations, isLoading: gettingNBStations } =
    useApiAdapter();
  const { apiAdapter: getPTBus, isLoading } = useApiAdapter();
  const { lat, long } = queryString.parse(history.location.search);
  const dataSource = useMemo(() => [], []);

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
        stations.forEach(({ title, stationId, cityCode }) => {
          const city = cityList.find((item) => item.code === cityCode).value;
          getPTBus({
            api: axios.get(
              `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/PassThrough/Station/${stationId}`
            ),
            onSuccess: (routes) => {
              console.log("data", routes);
              dataSource.push({
                title,
                desc: routes.map((route) => route.RouteName.Zh_tw).join(", "),
                onClick: () =>
                  history.push({
                    pathname: "/station-bus-list",
                    search: `city=${city}&stationId=${stationId}`,
                  }),
              });
            },
          });
        });
      },
    });
  }, [getNearbyStations, lat, long, dataSource, getPTBus, history]);

  return <CommonList dataSource={dataSource} />;
}

StationNearby.propTypes = {};

export default StationNearby;
