import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, List, Spin } from "antd";
import FlexBox from "../components/FlexBox";
import { GridCol, GridRow } from "../components/grid/Grid";
import useApiAdapter from "../hooks/useApiAdapter";
import axios from "axios";
import cityList from "../constant/cityList";
import { useHistory } from "react-router";
import CommonList from "../components/commonList/CommonList";
// import PropTypes from 'prop-types'

function SearchBusPage(props) {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(cityList[0]);
  const [showCitySelector, setShowCitySelector] = useState(false);

  const appendToSearch = useCallback(
    (val) => setSearch(search.concat(val)),
    [search, setSearch]
  );

  const keyboardItems = [
    { event: () => setShowCitySelector(true), span: 60, label: city.label },
    { event: () => appendToSearch(""), span: 40, label: "手動輸入" },
    { event: () => appendToSearch("紅"), span: 20, label: "紅" },
    { event: () => appendToSearch("藍"), span: 20, label: "籃" },
    { event: () => appendToSearch("1"), span: 20, label: "1" },
    { event: () => appendToSearch("2"), span: 20, label: "2" },
    { event: () => appendToSearch("3"), span: 20, label: "3" },
    { event: () => appendToSearch("綠"), span: 20, label: "綠" },
    { event: () => appendToSearch("棕"), span: 20, label: "棕" },
    { event: () => appendToSearch("4"), span: 20, label: "4" },
    { event: () => appendToSearch("5"), span: 20, label: "5" },
    { event: () => appendToSearch("6"), span: 20, label: "6" },
    { event: () => appendToSearch("橘"), span: 20, label: "橘" },
    { event: () => appendToSearch("小"), span: 20, label: "小" },
    { event: () => appendToSearch("7"), span: 20, label: "7" },
    { event: () => appendToSearch("8"), span: 20, label: "8" },
    { event: () => appendToSearch("9"), span: 20, label: "9" },
    { event: () => appendToSearch("幹線"), span: 20, label: "幹線" },
    { event: () => appendToSearch("more"), span: 20, label: "更多" },
    { event: () => appendToSearch(0), span: 20, label: "C" },
    { event: () => appendToSearch("0"), span: 20, label: "0" },
    { event: () => setSearch(search.slice(0, -1)), span: 20, label: "Clear" },
  ];

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

  return (
    <FlexBox row>
      <FlexBox>
        <FlexBox row>
          Icon
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </FlexBox>
        <GridRow row>
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
        </GridRow>
      </FlexBox>
      <FlexBox>
        <Spin spinning={isLoading}>
          {city.label}
          <CommonList dataSource={data} />
          <List bordered dataSource={data} />
        </Spin>
      </FlexBox>
    </FlexBox>
  );
}

SearchBusPage.propTypes = {};

export default SearchBusPage;
