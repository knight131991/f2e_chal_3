import React from "react";
// import PropTypes from "prop-types";
import { List } from "antd";
import FlexBox from "../FlexBox";
import styled from "styled-components";

const Title = styled.div`
  color: #1cc8ee;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
`;

const ListItem = styled(List.Item)`
  font-size: 14px;
  line-height: 20px;
  color: white;
  background: ${(props) => props.bg && "#1c1d1d"};
  border-radius: 6px;
  padding: 12px 16px;
  cursor: pointer;

  &.ant-list-item {
    border-bottom: none;
  }
`;

const EmptyStr = styled.span`
  color: #1cc8ee;
`;

function CommonList(props) {
  return (
    <List
      locale={{ emptyText: <EmptyStr>沒有符合的內容</EmptyStr> }}
      renderItem={({ onClick = () => {}, title, desc }, id) => (
        <ListItem bg={id % 2} onClick={onClick}>
          <FlexBox>
            <Title>{title}</Title>
            <FlexBox>{desc}</FlexBox>
          </FlexBox>
        </ListItem>
      )}
      {...props}
    />
  );
}

CommonList.propTypes = {};

export default styled(CommonList)``;
