import React, { useEffect, useState } from "react";
import LoginService from "../../services/login.service";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { login } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import "../asset/css/login.css";

function Login() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uiUxImage = require("../asset/img/UI-UX.png");

  useEffect(() => {
    LoginService.getUsers().then((res) => {
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
          username: user.username,
          role: user.role,
        };
        dispatch(login(dataUser));
        localStorage.setItem("user", JSON.stringify(dataUser));

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        toast.error("Username and password error");
      }
    },
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap py-5">
                <div
                  className="img d-flex align-items-center justify-content-center"
                  style={{ backgroundImage: `url(${uiUxImage})` }}
                ></div>

                <h3 className="text-center mb-0 title-form">Welcome</h3>
                <p className="text-center">
                  Sign in by entering the information below
                </p>
                <form className="login-form" onSubmit={formLogin.handleSubmit}>
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-user"></span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={formLogin.handleChange}
                      value={formLogin.values.username}
                      name="username"
                      required
                      autoComplete="username"
                    />
                  </div>
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-lock"></span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={formLogin.handleChange}
                      value={formLogin.values.password}
                      name="password"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-login form-control btn-primary rounded submit px-3"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
