import { useCallback } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

import Flex from "./Flex";
import Card from "./Card";
import { colors } from "./constants";

const rules = [
  { required: true, message: "Please provide your email address. 😇" },
];

const OrderButton = styled(Button)`
  border: 0px;
  background: ${colors.greenish};
  color: ${colors.tertiary};

  &:hover {
    background: ${colors.primary};
    color: ${colors.back};
  }
`;

const MailForm = ({ setUser }) => {
  const submit = useCallback(
    (input) => {
      setUser(input.email);
    },
    [setUser]
  );

  return (
    <Card title="Who are you?">
      <Form onFinish={submit}>
        <Form.Item name="email" rules={rules}>
          <Input size="large" placeholder="email address" allowClear />
        </Form.Item>
        <Flex>
          <OrderButton type="primary" htmlType="submit">
            Show Orders
          </OrderButton>
        </Flex>
      </Form>
    </Card>
  );
};

export default MailForm;
