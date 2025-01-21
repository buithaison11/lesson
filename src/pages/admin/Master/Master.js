import { Outlet } from "react-router";
import { useEffect } from "react";
import { login } from "../../../redux/features/authSlice";
import Header from "../Header/Header";
import "../../asset/css/admin.css";
import "../../asset/js/color-modes.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Theme from "../Theme/Theme.js";
import SideBar from "../SideBar/SideBar.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function Master() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    if (userLogin) {
      dispatch(login(userLogin));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);
  return (
    <>
      <Theme />
      <Container fluid>
        <Row>
          <Header />
          <SideBar />
          <Outlet />
        </Row>
      </Container>
    </>
  );
}
export default Master;
