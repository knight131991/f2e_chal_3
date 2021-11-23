import React, { useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import { useHistory, useParams, useRouteMatch } from "react-router";

function BusStopInfo(props) {
  const { apiAdapter, isLoading, data } = useApiAdapter([]);
  console.log(
    window.location,
    useHistory(),
    { ...useParams() },
    useRouteMatch()
  );
  const tt = useHistory();
  useEffect(() => {
    console.log("wwww", tt, queryString.parse(tt));
    const { city, route } = queryString.parse(tt.location);
    apiAdapter({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${encodeURIComponent(
          route
        )}`
      ),
    });
  }, [tt]);
  return <div></div>;
}

BusStopInfo.propTypes = {};

export default BusStopInfo;
