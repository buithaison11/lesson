import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import NotificationService from "../../../services/notifications.service";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useParams } from "react-router";

function NotificationsEdit() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    NotificationService.getAllNotification().then((res) => {
      setNotifications(res.data);
    });
    NotificationService.getNotificationById(id).then((res) => {
      setNotifications(res.data);
    });
  }, [id]);

  const formEdit = useFormik({
    initialValues: {
      message: notifications ? notifications.message : "",
      date: notifications ? notifications.date : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!values.message) {
        toast.error("Vui lòng nhập tên thông báo!");
        return;
      }
      if (!values.date) {
        toast.error("Vui lòng nhập ngày thông báo!");
        return;
      }
      NotificationService.updateNotifications(id, values)
        .then((res) => {
          toast.success("Sửa thành công khóa học!");
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
        <h1 className="h2">Sửa Thông Báo</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formEdit.handleSubmit}>
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Tên thông báo</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="message"
              type="text"
              value={formEdit.values.message}
              placeholder="Nhập tên thông báo"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Ngày thông báo</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="date"
              type="date"
              value={formEdit.values.date}
              placeholder="Nhập ngày thông báo"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            <i className="bi bi-plus-lg"></i> Sửa
          </Button>
          <Link to={"/admin/notifications"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default NotificationsEdit;
