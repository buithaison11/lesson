import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "../../../redux/features/authSlice";
import Header from "../Header/Header";
import MainAdmin from "../MainAdmin/MainAdmin";
import "../../asset/css/admin.css";
import "../../asset/css/bootstrap.min.css";
import "../../asset/js/color-modes.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col } from "react-bootstrap";

// import SideBar from "../SideBar/SideBar.js";

function Master() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    if (userLogin) {
      dispatch(login(JSON.parse(userLogin)));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <MainAdmin />
      {/* <Container>
        <Row>
          <Col></Col>
        </Row>
      </Container> */}
      <Outlet />
    </>
  );
}

export default Master;
