import { useFormik } from "formik";
import { useNavigate } from "react-router";
import BlogsService from "../../services/blogs.service";
import { toast } from "react-toastify";
import { Button, Form, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

function BlogAdd() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BlogsService.getAllStudents()
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const formAdd = useFormik({
    initialValues: {
      title: "",
      content: "",
      studentId: "",
    },
    onSubmit: (values) => {
      if (!values.title) {
        toast.error("Vui lòng nhập tiêu đề!");
        return;
      }
      if (!values.content) {
        toast.error("Vui lòng nhập nội dung!");
        return;
      }
      if (!values.studentId) {
        toast.error("Vui lòng chọn học sinh!");
        return;
      }
      // Chuyển đổi studentId từ chuỗi sang số
      values.studentId = parseInt(values.studentId, 10);
      BlogsService.addBlog(values)
        .then((res) => {
          toast.success("Thêm blog thành công!");
          navigate("/home/blogs");
        })
        .catch((err) => {
          toast.error("Thêm blog thất bại!");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm Blog</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formAdd.handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="title"
              type="text"
              placeholder="Nhập tiêu đề"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="content"
              as="textarea"
              rows={5}
              placeholder="Nhập nội dung"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStudentId">
            <Form.Label>Học sinh</Form.Label>
            <Form.Select
              onChange={formAdd.handleChange}
              name="studentId"
              aria-label="Chọn học sinh"
            >
              <option value="">Chọn học sinh</option>
              {students.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.studentName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Thêm Blog
          </Button>
          <Button variant="secondary" onClick={() => navigate("/home/blogs")}>
            Hủy
          </Button>
        </Form>
      </Col>
    </main>
  );
}

export default BlogAdd;
