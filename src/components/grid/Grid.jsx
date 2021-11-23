import React from "react";
import FlexBox from "../FlexBox";

export const GridCol = ({ span = "100", ...rest }) => {
  return (
    <FlexBox
      {...rest}
      style={{
        flex: `0 0 ${span}%`,
        maxWidth: `${span}%`,
      }}
    />
  );
};

export const GridRow = (props) => {
  return <FlexBox wrap {...props} style={{ width: "100%" }} />;
};
