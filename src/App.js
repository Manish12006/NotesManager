import { Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";

import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateNote />} />
    </Routes>
  );
};

export default App;