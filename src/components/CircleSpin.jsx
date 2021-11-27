import React from "react";
// import PropTypes from "prop-types";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function CircleSpin(props) {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
      {...props}
    />
  );
}

CircleSpin.propTypes = {};

export default CircleSpin;
