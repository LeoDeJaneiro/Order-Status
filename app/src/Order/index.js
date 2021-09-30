import { useState } from "react";
import { useQuery } from "react-query";
import { Spin } from "antd";
import Card from "../base/Card";

const Orders = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { isLoading, error, data } = useQuery("orders", () =>
    fetch(
      `${process.env.REACT_APP_HOST || "http://localhost:3001"}/order`
    ).then((res) => res.json())
  );

  console.log("data: ", data);
  if (isLoading) {
    return <Spin size="large" />;
  }
  if (error) {
    return <h2>An error has occurred: {error?.message}</h2>;
  }
  return <Card>doc</Card>;
};

export default Orders;
