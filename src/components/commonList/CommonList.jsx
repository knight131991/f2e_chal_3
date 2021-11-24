import React from "react";
import PropTypes from "prop-types";
import { List } from "antd";
import FlexBox from "../FlexBox";

function CommonList(props) {
  return (
    <List
      bordered
      renderItem={({ onClick = () => {}, title, desc }) => (
        <List.Item>
          <FlexBox onClick={onClick}>
            {title}
            <FlexBox>{desc}</FlexBox>
          </FlexBox>
        </List.Item>
      )}
      {...props}
    />
  );
}

CommonList.propTypes = {};

export default CommonList;
