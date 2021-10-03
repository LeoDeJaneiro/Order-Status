import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { Spin, Empty } from "antd";
import _ from "lodash";
import styled from "styled-components";

import Flex from "../base/Flex";
import Boundary from "../base/ErrorBoundary";
import Order from "./Order";
import Detail from "./Detail";

const NoOrders = styled(Empty)`
  .ant-empty-description {
    color: white;
  }
`;

export const baseUrl = process.env.REACT_APP_HOST || "http://localhost:3001";

const Orders = ({ user }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { isLoading, error, data } = useQuery("orders", () =>
    fetch(`${baseUrl}/order?email=${user}`).then((res) => res.json())
  );

  const setSelectedOrder = useCallback(
    (orderNo) => () => {
      setSelectedId(orderNo);
    },
    [setSelectedId]
  );

  if (isLoading) {
    return <Spin size="large" />;
  }
  if (error) {
    return <h2>An error has occurred: {error?.message}</h2>;
  }
  if (_.isEmpty(data)) {
    return <NoOrders description="no orders" />;
  }
  if (selectedId) {
    return (
      <Detail
        selectedId={selectedId}
        setSelectedOrder={setSelectedOrder(null)}
      />
    );
  }

  return (
    <Flex column>
      {_.map(data, (trackings, orderNo) => (
        <Boundary domain="order">
          <Order
            key={orderNo}
            orderNo={orderNo}
            trackings={trackings}
            setSelectedOrder={setSelectedOrder(orderNo)}
            selectedId={selectedId}
          />
        </Boundary>
      ))}
    </Flex>
  );
};

export default Orders;
