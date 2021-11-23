import React from "react";

const FlexBox = ({ flex, row, justify, aligm, style, wrap, gap, ...rest }) => {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: flex ? 1 : 0,
        justifyContent: justify,
        alignItems: aligm,
        gap,
        flexDirection: row ? "row" : "column",
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
      {...rest}
    />
  );
};

export default FlexBox;
