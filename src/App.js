import { Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";

const App = () => {
  return (
   <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
      </Routes>

      <ToastContainer position="bottom-right" />

    </>
    
  );
};

export default App;