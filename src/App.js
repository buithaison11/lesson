import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "./redux/features/authSlice";
import Login from "./pages/login/login";
import Master from "./pages/admin/Master/Master";
import Error from "./pages/Error/error";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    if (userLogin) {
      dispatch(login(JSON.parse(userLogin)));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Master />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
