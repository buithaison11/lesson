import React, { useEffect, useState } from "react";
import LoginService from "../../services/login.service";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { login } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    LoginService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const formLogin = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const user = users.find(
        (user) =>
          user.username === values.username && user.password === values.password
      );
      if (user) {
        const dataUser = {
          username: values.username,
        };
        dispatch(login(dataUser));
        localStorage.setItem("user", JSON.stringify(dataUser));
        navigate("/admin");
      } else {
        toast.error("Username and password error");
      }
    },
  });

  return (
    <>
      <form className="form-login" onSubmit={formLogin.handleSubmit}>
        <label className="label">Username:</label>
        <input
          className="input"
          type="text"
          onChange={formLogin.handleChange}
          value={formLogin.values.username}
          name="username"
          required
        />
        <label className="label">Password:</label>
        <input
          className="input"
          type="password"
          onChange={formLogin.handleChange}
          value={formLogin.values.password}
          name="password"
          required
        />
        <input className="inp-login" type="submit" value="Login" />
      </form>
    </>
  );
}

export default Login;
