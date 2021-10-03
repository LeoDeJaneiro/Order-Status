import { Component } from "react";
import styled from "styled-components";

const Message = styled.h2`
  color: white;
`;

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Message>
          Something went wrong displaying this {this.props.domain ?? "item"}.
        </Message>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
