import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import { useHistory } from "react-router";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import CommonList from "../components/commonList/CommonList";
import FlexBox from "../components/FlexBox";
import NavBar from "../components/NavBar";
import styled from "styled-components";

const Container = styled(FlexBox)`
  height: 100%;
`;

const ListContainer = styled(FlexBox)`
  padding: ${({ bpoint }) => (bpoint === "xs" ? "24px 16px" : "40px 100px")};
  background-color: #131414;
  overflow: auto;
`;

function StationBusList({ bpoint }) {
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

  return (
    <Container>
      <NavBar bpoint={bpoint} />
      <ListContainer bpoint={bpoint}>
        <CommonList dataSource={data} />;
      </ListContainer>
    </Container>
  );
}

StationBusList.propTypes = {};

export default StationBusList;
