import React, { useEffect, useMemo } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import { useHistory } from "react-router";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import CommonList from "../components/commonList/CommonList";

function StationBusList(props) {
  const history = useHistory();
  const { apiAdapter: getPTBus, isLoading, data } = useApiAdapter();
  const { city, stationId } = queryString.parse(history.location.search);

  useEffect(() => {
    getPTBus({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/PassThrough/Station/${stationId}`
      ),
      mapper: (resp) => {
        console.log("data", resp.data);
        return resp.data.map(
          ({ RouteName: { Zh_tw }, DestinationStopNameZh }) => ({
            title: Zh_tw,
            desc: `往 ${DestinationStopNameZh}`,
            onClick: () =>
              history.push({
                pathname: "/bus-stop-info",
                search: `city=${city}&route=${Zh_tw}`,
              }),
          })
        );
      },
    });
  }, [getPTBus, city, stationId, history]);

  return <CommonList dataSource={data} />;
}

StationBusList.propTypes = {};

export default StationBusList;
