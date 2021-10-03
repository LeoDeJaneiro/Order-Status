import styled, { css } from "styled-components";
import { Space } from "antd";

import { colors } from "./constants";
import Flex from "./Flex";

const Title = styled.span`
  background: ${colors.primary};
  color: ${colors.back};
  font-size: 20px;
  font-style: italic;
  padding: 0 5px;
`;

const Background = styled(Flex)`
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `};

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
  color: ${colors.tertiary};

  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  padding: 5px 10px 15px 10px;
  margin: 10px;
  > * {
    width: 100%;
  }
`;

const Card = ({ children, title, width, onClick }) => (
  <Background width={width} onClick={onClick} end wrap>
    <Space direction="vertical">
      {title && <Title>{title}</Title>}
      {children}
    </Space>
  </Background>
);

export default Card;
