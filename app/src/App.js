import { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";

import Order from "./Order";
import Form from "./base/Form";
import Flex from "./base/Flex";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return user ? (
    <Flex>
      <Order user={user} />
    </Flex>
  ) : (
    <Flex>
      <Form setUser={setUser} />
    </Flex>
  );
}

export default App;
