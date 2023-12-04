/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import WorkSpace from "./Components/WorkSpace";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn callBack={setUser} />} />
        <Route path="/WorkSpace" element={<WorkSpace user={user} />} />
      </Routes>
    </Router>
    // <LogIn />
    // <WorkSpace />
  );
}
export default App;
