import "./App.css";
import React from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path={"/"} element={<MasterHome />}>
          <Route path={"home"} element={<Home />} />
        </Route> */}

        {/* <Route path="/admin" element={<Master />}>
        </Route> */}

        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
