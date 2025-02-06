import Container from "react-bootstrap/Container";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import NotificationService from "../../../services/notifications.service";
import { toast } from "react-toastify";
import { Link } from "react-router";

function NotificationsAdd() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    NotificationService.getAllNotification().then((res) => {
      setNotifications(res.data);
    });
  }, []);

  const formAdd = useFormik({
    initialValues: {
      message: "",
      date: "",
    },
    onSubmit: (values) => {
      if (!values.message) {
        toast.error("Vui lòng nhập tên thông báo!");
        return;
      }
      if (!values.date) {
        toast.error("Vui lòng nhập ngày thông báo!");
        return;
      }
      NotificationService.addNotification(values)
        .then((res) => {
          toast.success("Thêm thành công khóa học!");
          navigate("/admin/notifications");
        })
        .catch((err) => {
          toast.error("Thêm thất bại khóa học!");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm Thông Báo</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formAdd.handleSubmit}>
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Tên thông báo</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="message"
              type="text"
              placeholder="Nhập tên thông báo"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Ngày thông báo</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="date"
              type="date"
              placeholder="Nhập ngày thông báo"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            <i className="bi bi-plus-lg"></i> Thêm
          </Button>
          <Link to={"/admin/notifications"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default NotificationsAdd;
