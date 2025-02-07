import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import LoginService from "../../services/login.service";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useParams } from "react-router";

function ChangePassword() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    LoginService.getUsers().then((res) => {
      setUsers(res.data);
    });
    LoginService.getLoginById(id).then((res) => {
      setUsers(res.data);
    });
  }, [id]);

  const formEdit = useFormik({
    initialValues: {
      username: users ? users.username : "",
      password: users ? users.password : "",
      role: users ? users.role : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!values.username || !values.password || !values.role) {
        toast.error("Vui lòng điền lại nội dung");
        return;
      }
      LoginService.updateLogin(id, values)
        .then((res) => {
          toast.success("Đổi mật khẩu thành công!");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Đổi mật khẩu thất bại");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Đổi mật khẩu</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formEdit.handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Tên tài khoản</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="username"
              type="text"
              value={formEdit.values.username}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Quyền hạn</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="role"
              type="text"
              value={formEdit.values.role}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="password"
              type="password"
              value={formEdit.values.password}
              placeholder="Nhập mật khẩu"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Đổi mật khẩu
          </Button>
          <Link to={"/admin"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default ChangePassword;
