import { useCallback } from "react";
import _ from "lodash";
import { Button, Steps, Spin, Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import moment from "moment";
import { useQuery } from "react-query";
import styled from "styled-components";

import Card from "../base/Card";
import Flex from "../base/Flex";
import { dimensions, emojis, colors } from "../base/constants";
import Product from "./Product";
import { Address, MultiParcelInfo, Wrapper } from "./Order";
import { baseUrl } from "./index";

const Text = styled.span`
  font-size: 1.1em;
  color: ${colors.primary};
`;

const Progress = ({ checkpoints }) => (
  <Wrapper column>
    <Text>{_.chain(checkpoints).last().get("status_details").value()}</Text>
    <Collapse>
      <Collapse.Panel header="Tracking Details" key="1">
        <Steps direction="vertical" size="small">
          {_.map(checkpoints, (checkpoint) => (
            <Steps.Step
              key={checkpoint.timestamp}
              status={checkpoint.status}
              title={checkpoint.status_text}
              icon={
                <span>{_.get(emojis, checkpoint.status, emojis.fallback)}</span>
              }
              description={moment(checkpoint.timestamp).format("MMMM D")}
            />
          ))}
        </Steps>
      </Collapse.Panel>
    </Collapse>
  </Wrapper>
);

const OrderDetail = ({ setSelectedOrder, selectedId }) => {
  const { isLoading, error, data } = useQuery("order", () =>
    fetch(`${baseUrl}/order/${selectedId}`).then((res) => res.json())
  );
  const goBack = useCallback(() => {
    setSelectedOrder();
  }, [setSelectedOrder]);

  if (isLoading) {
    return <Spin size="large" />;
  }
  if (error) {
    return <h2>An error has occurred: {error?.message}</h2>;
  }
  return (
    <Flex column>
      <Flex>
        <Button
          shape="circle"
          size="small"
          icon={<ArrowLeftOutlined />}
          onClick={goBack}
        />
      </Flex>
      <Card title={data.orderNo} width={dimensions.width}>
        <Flex column>
          <MultiParcelInfo trackings={data.tracking} />
          <Flex column>
            {_.map(data.tracking, (checkpoints, tracking_number) => (
              <Wrapper column key={tracking_number}>
                <Progress checkpoints={checkpoints} />
                {_.chain(data.products)
                  .filter({ tracking_number })
                  .map((product) => (
                    <Product
                      key={product.articleNo}
                      img={product.articleImageUrl}
                      title={product.product_name}
                      quantity={product.quantity}
                    />
                  ))
                  .value()}
              </Wrapper>
            ))}
          </Flex>
          <Address street={data.street} zip={data.zip_code} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default OrderDetail;
