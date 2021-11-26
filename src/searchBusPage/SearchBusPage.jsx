import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Spin } from "antd";
import FlexBox from "../components/FlexBox";
import { GridCol, GridRow } from "../components/grid/Grid";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import cityList from "../constant/cityList";
import { useHistory } from "react-router";
import CommonList from "../components/commonList/CommonList";
import LogoBtn from "../components/LogoBtn";
import styled from "styled-components";
import { ReactComponent as Del } from "../images/del.svg";
import useKeyboardItems from "./useKeyboardItems";
// import PropTypes from 'prop-types'

const Container = styled(FlexBox)`
  ${({ bpoint }) => bpoint !== "xs" && "padding: 25px 100px"};
  background-color: #131414;
  height: 100%;
  color: white;
`;

const LogoBar = styled(FlexBox)`
  gap: 10px;
  margin-bottom: 15px;
  ${({ bpoint }) => bpoint === "xs" && "padding: 18px;"}

  & > input {
    height: 40px;
    background: #1c1d1d;
    border-radius: 6px;
    color: #1cc8ee;
    border: none;
  }
`;

const KeyboardContainer = styled(GridRow)`
  padding: 24px 16px;
  background-color: #1c1d1d;
  border-radius: 10px;
  min-height: ${({ bpoint }) => bpoint !== "xs" && "550px"}
  align-content: flex-start;

  ${({ bpoint }) => bpoint === "xs" && "position: absolute; bottom: 0px;"}

  & > div {
    padding: 6px;

    & > button {
      height: 40px;
      color: white;
      background-color: transparent;
      border: 1px solid #1cc8ee;
      // filter: drop-shadow(0px 0px 6px #1cc8ee) drop-shadow(0px 0px 2px #1cc8ee);
      border-radius: 9px;
    }
  }
`;

const LeftContainer = styled(FlexBox)`
  max-width: 410px;
  margin-right: 42px;
`;

function SearchBusPage({ bpoint }) {
  const history = useHistory();
  const inputEle = useRef();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(cityList[0]);
  const [showCitySelector, setShowCitySelector] = useState(false);

  const keyboardItems = useKeyboardItems(
    search,
    setSearch,
    setShowCitySelector,
    city,
    inputEle
  );

  const { apiAdapter, isLoading, data } = useApiAdapter([]);

  useEffect(() => {
    apiAdapter({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${
          city.value
        }/${encodeURIComponent(search)}`
      ),
      mapper: ({ data }) =>
        data.map(
          ({
            DepartureStopNameZh,
            DestinationStopNameZh,
            RouteName: { Zh_tw },
          }) => ({
            title: Zh_tw,
            desc: `${DepartureStopNameZh} 往 ${DestinationStopNameZh}`,
            onClick: () =>
              history.push({
                pathname: "/bus-stop-info",
                search: `city=${city.value}&route=${Zh_tw}`,
              }),
          })
        ),
    });
  }, [search, city.value, apiAdapter, history]);

  const LogoBarComponent = ({ bpoint }) => (
    <LogoBar row align="end" bpoint={bpoint}>
      <LogoBtn bpoint={bpoint} />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={inputEle}
      />
    </LogoBar>
  );

  const KeyboardComponent = ({ bpoint }) => (
    <KeyboardContainer row bpoint={bpoint}>
      {showCitySelector
        ? cityList.map(({ value, label }) => (
            <GridCol key={value} span={20}>
              <Button
                onClick={() => {
                  setCity({ value, label });
                  setShowCitySelector(false);
                }}
              >
                {label}
              </Button>
            </GridCol>
          ))
        : keyboardItems.map(({ span, label, event }, id) => (
            <GridCol key={id} span={span}>
              <Button onClick={event}>{label}</Button>
            </GridCol>
          ))}
    </KeyboardContainer>
  );

  const List = styled((props) => (
    <div {...props}>
      <Spin spinning={isLoading}>
        {city.label}
        <CommonList dataSource={data} />
      </Spin>
    </div>
  ))`
    padding: 8px 18px;
  `;

  return (
    <Container row={bpoint !== "xs"} bpoint={bpoint}>
      {bpoint === "xs" ? (
        <>
          <LogoBarComponent bpoint={bpoint} />
          <List bpoint={bpoint} />
          <KeyboardComponent bpoint={bpoint} />
        </>
      ) : (
        <>
          <LeftContainer>
            <LogoBarComponent />
            <KeyboardComponent />
          </LeftContainer>
          <FlexBox flex>
            <List />
          </FlexBox>
        </>
      )}
    </Container>
  );
}

SearchBusPage.propTypes = {};

export default SearchBusPage;
