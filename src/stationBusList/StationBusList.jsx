import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import { useHistory } from "react-router";
import useApiAdapter from "../hooks/useApiAdapter";
import useBreakPoint from "../hooks/useBreakPoint";
import CommonList from "../components/commonList/CommonList";
import FlexBox from "../components/FlexBox";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import CircleSpin from "../components/CircleSpin";
import getTDXAxios from "../utils/getTDXAxios";

const Container = styled(FlexBox)`
  height: 100%;
`;

const ListContainer = styled(FlexBox)`
  padding: ${({ bpoint }) => (bpoint === "xs" ? "24px 16px" : "40px 100px")};
  background-color: #131414;
  overflow: auto;
`;

const StationName = styled.span`
  color: white;
  font-size: 16px;
`;

function StationBusList() {
  const [bpoint] = useBreakPoint();
  const history = useHistory();
  const { apiAdapter: getPTBus, data } = useApiAdapter();
  const { city, stationId, station } = queryString.parse(
    history.location.search
  );
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    getTDXAxios().then((axios) => {
      getPTBus({
        api: axios.get(
          `https://tdx.transportdata.tw/api/advanced/v2/Bus/Route/City/${city}/PassThrough/Station/${stationId}`
        ),
        mapper: (resp) => {
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
        onSuccess: () => setLoaded(true),
      });
    });
  }, [getPTBus, city, stationId, history]);

  return (
    <Container>
      <NavBar
        bpoint={bpoint}
        customMap={<StationName>{station}</StationName>}
      />
      <ListContainer bpoint={bpoint} flex>
        <CircleSpin spinning={!loaded}>
          {loaded && <CommonList dataSource={data} />}
        </CircleSpin>
      </ListContainer>
    </Container>
  );
}

StationBusList.propTypes = {};

export default StationBusList;
