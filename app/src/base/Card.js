import styled, { css } from "styled-components";
import { Space } from "antd";

import { colors, dimensions } from "./constants";
import Flex from "./Flex";

const Title = styled.span`
  background: ${colors.primary};
  font-size: 20px;
  font-style: italic;
  padding: 0 5px;
`;

const Background = styled(Flex)`
  width: ${dimensions.width}px;

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
      &:hover {
        color: ${colors.accommodation};
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      }
    `};

  background: ${colors.back};
  color: #fff;

  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  padding: 5px 10px 15px 10px;
  margin: 10px;
  > * {
    width: 100%;
  }
`;

const Card = ({ children, title, width, onClick }) => (
  <Background width={width} onClick={onClick} end>
    <Space direction="vertical">
      {title && <Title>{title}</Title>}
      {children}
    </Space>
  </Background>
);

export default Card;
