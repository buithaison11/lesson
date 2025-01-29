import Container from "react-bootstrap/Container";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import StudentsService from "../../../services/students.service";
import { toast } from "react-toastify";
import { Link } from "react-router";

function StudentAdd() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    StudentsService.getAllCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);

  const formAdd = useFormik({
    initialValues: {
      studentName: "",
      email: "",
      courseId: "",
      enrollmentDate: "",
    },
    onSubmit: (values) => {
      // Chuyển đổi courseId thành số
      values.courseId = Number(values.courseId);

      if (!values.studentName) {
        toast.error("Vui lòng nhập tên học viên!");
        return;
      }
      if (!values.email) {
        toast.error("Vui lòng nhập email học viên!");
        return;
      }
      if (!values.courseId) {
        toast.error("Vui lòng chọn tên khóa học!");
        return;
      }
      if (!values.enrollmentDate) {
        toast.error("Vui lòng chọn ngày nhập học!");
        return;
      }
      StudentsService.addStudents(values)
        .then((res) => {
          toast.success("Thêm thành công học viên!");
          navigate("/admin/students");
        })
        .catch((err) => {
          toast.error("Thêm thất bại học viên!");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm học viên</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formAdd.handleSubmit}>
          <Form.Group className="mb-3" controlId="formStudentName">
            <Form.Label>Tên học viên</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="studentName"
              type="text"
              placeholder="Nhập tên khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmailStudent">
            <Form.Label>Email học viên</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="email"
              type="text"
              placeholder="Nhập mô tả khóa học"
            />
          </Form.Group>
          <Form.Select
            onChange={formAdd.handleChange}
            name="courseId"
            value={formAdd.values.courseId || ""}
            aria-label="Chọn lớp học"
          >
            <option value="">Chọn lớp học</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </Form.Select>

          <Form.Group className="mb-3" controlId="formEnrollmentDate">
            <Form.Label>Ngày nhập học </Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="enrollmentDate"
              type="date"
              placeholder="Nhập mô tả khóa học"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            <i className="bi bi-plus-lg"></i> Thêm
          </Button>
          <Link to={"/admin/students"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default StudentAdd;
