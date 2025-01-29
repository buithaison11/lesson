import Container from "react-bootstrap/Container";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import StudentsService from "../../../services/students.service";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useParams } from "react-router";

function StudentEdit() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    StudentsService.getAllCourses()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });

    StudentsService.getStudentsById(id)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching student by ID:", err);
      });
  }, [id]);

  const formEdit = useFormik({
    initialValues: {
      studentName: students ? students.studentName : "",
      email: students ? students.email : "",
      courseId: students ? students.courseId : "",
      enrollmentDate: students ? students.enrollmentDate : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        !values.studentName ||
        !values.email ||
        !values.courseId ||
        !values.enrollmentDate
      ) {
        toast.error("Vui lòng điền lại nội dung");
        return;
      }
      StudentsService.updateStudents(id, values)
        .then((res) => {
          toast.success("Sửa thành công học viên!");
          navigate("/admin/students");
        })
        .catch((err) => {
          toast.error("Sửa thất bại học viên");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sửa học viên</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formEdit.handleSubmit}>
          <Form.Group className="mb-3" controlId="formStudentName">
            <Form.Label>Tên học viên</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="studentName"
              type="text"
              value={formEdit.values.studentName}
              placeholder="Nhập tên học viên"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmailStudent">
            <Form.Label>Email học viên</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="email"
              type="text"
              value={formEdit.values.email}
              placeholder="Nhập email học viên"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCourseId">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Select
              onChange={formEdit.handleChange}
              name="courseId"
              aria-label="Chọn lớp học"
              value={formEdit.values.courseId}
            >
              <option value="">Chọn lớp học</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEnrollmentDate">
            <Form.Label>Ngày nhập học </Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="enrollmentDate"
              type="date"
              value={formEdit.values.enrollmentDate}
              placeholder="Nhập ngày nhập học"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            <i className="bi bi-plus-lg"></i> Sửa
          </Button>
          <Link to={"/admin/students"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default StudentEdit;
