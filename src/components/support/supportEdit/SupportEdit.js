import Container from "react-bootstrap/Container";
import { Button, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import SupportService from "../../../services/support.service";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useParams } from "react-router";

function SupportEdit() {
  const [support, setSupport] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    SupportService.getSupportsById(id)
      .then((res) => {
        setSupport(res.data);
      })
      .catch((err) => {
        console.error("Error fetching support by ID:", err);
      });
  }, [id]);

  const formEdit = useFormik({
    initialValues: {
      status: support ? support.status : "",
      issue: support ? support.issue : "",
      studentId: support ? support.studentId : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!values.status) {
        toast.error("Vui lòng chọn trạng thái!");
        return;
      }
      SupportService.updateSupports(id, values)
        .then((res) => {
          toast.success("Thay đổi trạng thái thành công!");
          navigate("/admin/supports");
        })
        .catch((err) => {
          toast.error("Sửa trạng thái thất bại");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Cập nhật trạng thái hỗ trợ</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formEdit.handleSubmit}>
          <Form.Group className="mb-3" controlId="formStudentName">
            <Form.Label>Tên học viên</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="studentId"
              type="text"
              value={formEdit.values.studentId}
              placeholder="Nhập tên học viên"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIssue">
            <Form.Label>Vấn đề</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="issue"
              type="text"
              value={formEdit.values.issue}
              placeholder="Nhập vấn đề"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Phản hồi</Form.Label>
            <Form.Select
              onChange={formEdit.handleChange}
              name="status"
              value={formEdit.values.status}
              aria-label="Chọn trạng thái"
            >
              <option value="">Chọn xử lý</option>
              <option value="Xử lý thất bại">Xử lý thất bại</option>
              <option value="Đã được xử lý">Đã được xử lý</option>
              <option value="Đang xử lý">Đang xử lý</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            <i className="bi bi-plus-lg"></i> Sửa
          </Button>
          <Link to={"/admin/supports"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default SupportEdit;
