import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import FlexBox from "../components/FlexBox";
import { GridCol, GridRow } from "../components/grid/Grid";
import useApiAdapter from "../hooks/useApiAdapter";
import useBreakPoint from "../hooks/useBreakPoint";
import axios from "axios";
import cityList from "../constant/cityList";
import { useHistory } from "react-router";
import CommonList from "../components/commonList/CommonList";
import LogoBtn from "../components/LogoBtn";
import styled from "styled-components";
import useKeyboardItems from "./useKeyboardItems";
import CircleSpin from "../components/CircleSpin";
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

  // ${({ bpoint }) => bpoint === "xs" && "position: absolute; bottom: 0px;"}
  
  & > div {
    padding: 6px;
    
    & > button {
      height: 40px;
      color: white;
      background-color: transparent;
      border: 1px solid #1cc8ee;
      // filter: drop-shadow(0px 0px 6px #1cc8ee) drop-shadow(0px 0px 2px #1cc8ee);
      border-radius: 9px;
      padding: 0px 7px; 
      font-size: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      
    }
  }
`;

const LeftContainer = styled(FlexBox)`
  max-width: 380px;
  margin-right: 42px;
`;

const List = styled(({ isLoading, data, city, className }) => (
  <div className={className}>
    <CircleSpin spinning={isLoading}>
      {city}
      <CommonList dataSource={data} />
    </CircleSpin>
  </div>
))`
  padding: 8px 18px;
  overflow: auto;
  height: ${({ bpoint }) => bpoint === "xs" && "calc(100% - 308px - 76px)"};
`;

function SearchBusPage() {
  const [bpoint] = useBreakPoint();
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

  const LogoBarComponent = useCallback(
    ({ bpoint, search, inputEle, onInputChange }) => (
      <LogoBar row align="end" bpoint={bpoint}>
        <LogoBtn bpoint={bpoint} />
        <Input value={search} onChange={onInputChange} ref={inputEle} />
      </LogoBar>
    ),
    []
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

  return (
    <Container row={bpoint !== "xs"} bpoint={bpoint}>
      {bpoint === "xs" ? (
        <>
          <LogoBarComponent
            bpoint={bpoint}
            search={search}
            inputEle={inputEle}
            onInputChange={(e) => setSearch(e.target.value)}
          />
          <List
            bpoint={bpoint}
            isLoading={isLoading}
            city={city.label}
            data={data}
          />
          <KeyboardComponent bpoint={bpoint} />
        </>
      ) : (
        <>
          <LeftContainer>
            <LogoBarComponent
              bpoint={bpoint}
              search={search}
              inputEle={inputEle}
              onInputChange={(e) => setSearch(e.target.value)}
            />
            <KeyboardComponent />
          </LeftContainer>
          <FlexBox flex>
            <List
              bpoint={bpoint}
              isLoading={isLoading}
              city={city.label}
              data={data}
            />
          </FlexBox>
        </>
      )}
    </Container>
  );
}

SearchBusPage.propTypes = {};

export default SearchBusPage;
