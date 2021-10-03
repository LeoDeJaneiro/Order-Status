import styled, { css } from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `};

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

  ${(props) =>
    props.wrap &&
    css`
      flex-wrap: wrap;
    `};
`;

export default Flex;
