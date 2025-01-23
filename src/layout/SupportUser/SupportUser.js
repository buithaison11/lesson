import Container from "react-bootstrap/Container";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import SupportService from "../../services/support.service";
import { toast } from "react-toastify";
import { Link } from "react-router";

function SupportUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    SupportService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const formAdd = useFormik({
    initialValues: {
      studentId: "",
      issue: "",
      status: "Đang xử lý",
    },
    onSubmit: (values) => {
      if (!values.studentId) {
        toast.error("Vui lòng chọn người dùng!");
        return;
      }
      if (!values.issue) {
        toast.error("Vui lòng nhập yêu cầu hỗ trợ!");
        return;
      }
      SupportService.addSupport(values)
        .then((res) => {
          toast.success("Gửi yêu cầu hỗ trợ thành công!");
          navigate("/admin/support");
        })
        .catch((err) => {
          toast.error("Gửi yêu cầu hỗ trợ thất bại!");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Hỗ trợ</h1>
      </div>
      <h2>Gửi yêu cầu hỗ trợ</h2>
      <Col md={12}>
        <Form onSubmit={formAdd.handleSubmit}>
          <Form.Group className="mb-3" controlId="formStudentId">
            <Form.Label>Người dùng</Form.Label>
            <Form.Select
              onChange={formAdd.handleChange}
              name="studentId"
              aria-label="Chọn người dùng"
            >
              <option value="">Chọn người dùng</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.username}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIssue">
            <Form.Label>Yêu cầu hỗ trợ</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="issue"
              type="text"
              placeholder="Nhập yêu cầu hỗ trợ"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Gửi
          </Button>
          <Link to={"/admin/support"}>
            <Button variant="secondary">Hủy</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default SupportUser;
