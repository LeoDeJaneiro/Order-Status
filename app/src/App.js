import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";

import "./App.css";
import "antd/dist/antd.css";

import Order from "./Order";
import Form from "./base/Form";
import Flex from "./base/Flex";
import { colors } from "./base/constants";

const queryClient = new QueryClient();
const Background = styled(Flex)`
  background: ${colors.tertiary};
`;

const Navigate = () => {
  const [user, setUser] = useState(null);

  return user ? (
    <QueryClientProvider client={queryClient}>
      <Order user={user} />
    </QueryClientProvider>
  ) : (
    <Form setUser={setUser} />
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Background>
        <Navigate />
      </Background>
    </QueryClientProvider>
  );
}

export default App;
