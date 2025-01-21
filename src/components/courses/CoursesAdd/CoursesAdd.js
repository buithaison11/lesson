import Container from "react-bootstrap/Container";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import CoursesService from "../../../services/courses.service";
import { toast } from "react-toastify";
import { Link } from "react-router";

function CoursesAdd() {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    CoursesService.getAllInstructors().then((res) => {
      setInstructors(res.data);
    });
  }, []);

  const formAdd = useFormik({
    initialValues: {
      courseName: "",
      description: "",
      price: "",
      duration: "",
      image: "",
      instructorId: "",
    },
    onSubmit: (values) => {
      if (!values.courseName) {
        toast.error("Vui lòng nhập tên khóa học!");
        return;
      }
      if (!values.description) {
        toast.error("Vui lòng nhập mô tả khóa học!");
        return;
      }
      if (!values.price) {
        toast.error("Vui lòng nhập giá khóa học!");
        return;
      }
      if (!values.duration) {
        toast.error("Vui lòng nhập số giờ học!");
        return;
      }
      if (!values.image) {
        toast.error("Vui lòng nhập đường dẫn ảnh!");
        return;
      }
      if (!values.instructorId) {
        toast.error("Vui lòng chọn giáo viên giảng dạy!");
        return;
      }
      CoursesService.addCourses(values)
        .then((res) => {
          toast.success("Thêm thành công khóa học!");
          navigate("/admin/courses");
        })
        .catch((err) => {
          toast.error("Thêm thất bại khóa học!");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Khóa học</h1>
      </div>
      <h2>Thêm khóa học</h2>
      <Col md={12}>
        <Form onSubmit={formAdd.handleSubmit}>
          <Form.Group className="mb-3" controlId="formCourseName">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="courseName"
              type="text"
              placeholder="Nhập tên khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Mô tả khóa học</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="description"
              type="text"
              placeholder="Nhập mô tả khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Giá khóa học</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="price"
              type="number"
              placeholder="Nhập giá khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDuration">
            <Form.Label>Số giờ học</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="duration"
              type="number"
              placeholder="Nhập số giờ học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Đường dẫn ảnh</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="image"
              type="text"
              placeholder="Nhập đường dẫn ảnh"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInstructorId">
            <Form.Label>Giáo viên giảng dạy</Form.Label>
            <Form.Select
              onChange={formAdd.handleChange}
              name="instructorId"
              aria-label="Chọn giảng viên"
            >
              <option value="">Chọn giảng viên</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.instructorName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to={"/admin/courses"}>
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default CoursesAdd;
