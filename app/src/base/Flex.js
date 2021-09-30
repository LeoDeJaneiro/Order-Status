import styled, { css } from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: center;

  ${(props) =>
    props.start &&
    css`
      justify-content: flex-start;
    `};

  ${(props) =>
    props.end &&
    css`
      justify-content: flex-end;
    `};

  ${(props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `};
`;

export default Flex;
