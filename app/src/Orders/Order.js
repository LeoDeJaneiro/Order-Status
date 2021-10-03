import _ from "lodash";
import moment from "moment";
import styled from "styled-components";

import Card from "../base/Card";
import Flex from "../base/Flex";
import { emojis, colors, dimensions } from "../base/constants";
import Boundary from "../base/ErrorBoundary";

export const Label = styled.span`
  font-weight: bold;
  font-style: italic;
  background: ${colors.tertiary};
  color: ${colors.back};
  padding: 0 5px;
  font-size: 1.2em;
`;

export const Wrapper = styled(Flex)`
  margin: 10px 0;
`;
export const StatusEmoji = styled.span`
  font-size: 1.5em;
  margin-right: 5px;
`;

export const MultiParcelInfo = ({ trackings }) => (
  <>
    {trackings &&
      Object.keys(trackings).length > 1 &&
      `Your order has been split into ${
        Object.keys(trackings).length
      } parcels.`}
  </>
);

export const Address = ({ street, zip }) => (
  <Wrapper column align="end">
    <Label>address</Label>
    {street && <Flex>{street}</Flex>}
    {zip && <Flex>{zip}</Flex>}
  </Wrapper>
);

export const Status = ({ status, statusText, timestamp }) => (
  <Wrapper column>
    <Label>status ({moment(timestamp).format("MMMM D, h:mm a")})</Label>
    <Flex start align="center">
      <StatusEmoji>
        <span role="img">{_.get(emojis, status, emojis.fallback)}</span>
      </StatusEmoji>
      {statusText}
    </Flex>
  </Wrapper>
);

const Order = ({ trackings, orderNo, setSelectedOrder, selectedId }) => (
  <Card title={orderNo} onClick={setSelectedOrder} width={dimensions.width}>
    <Boundary domain="order">
      <MultiParcelInfo trackings={trackings} />
      {_.map(trackings, (delivery) => (
        <>
          <Status
            key={delivery.status.timestamp}
            timestamp={delivery.status.timestamp}
            status={delivery.status.status}
            statusText={delivery.status.status_text}
          />
          <Address street={delivery.street} zip={delivery.zip_code} />
        </>
      ))}
    </Boundary>
  </Card>
);

export default Order;
