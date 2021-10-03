import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import "antd/dist/antd.css";

import Orders from "./Orders";
import Form from "./base/Form";
import Flex from "./base/Flex";

const queryClient = new QueryClient();

const Navigate = () => {
  const [user, setUser] = useState(null);
  return user ? <Orders user={user} /> : <Form setUser={setUser} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Flex align="flex-start">
        <Navigate />
      </Flex>
    </QueryClientProvider>
  );
}

export default App;
