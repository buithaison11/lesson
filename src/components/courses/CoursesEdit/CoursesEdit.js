import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import CoursesService from "../../../services/courses.service";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useParams } from "react-router";

function CoursesEdit() {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    CoursesService.getAllInstructors().then((res) => {
      setInstructors(res.data);
    });
    CoursesService.getCoursesById(id).then((res) => {
      setCourses(res.data);
    });
  }, [id]);

  const formEdit = useFormik({
    initialValues: {
      courseName: courses ? courses.courseName : "",
      description: courses ? courses.description : "",
      price: courses ? courses.price : "",
      duration: courses ? courses.duration : "",
      image: courses ? courses.image : "",
      instructorId: courses ? courses.instructorId : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        !values.courseName ||
        !values.description ||
        !values.price ||
        !values.duration ||
        !values.image ||
        !values.instructorId
      ) {
        toast.error("Vui lòng điền lại nội dung");
        return;
      }
      CoursesService.updateCourses(id, values)
        .then((res) => {
          toast.success("Sửa thành công khóa học!");
          navigate("/admin/courses");
        })
        .catch((err) => {
          toast.error("Sửa thất bại khóa học");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sửa khóa học</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formEdit.handleSubmit}>
          <Form.Group className="mb-3" controlId="formCourseName">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="courseName"
              type="text"
              value={formEdit.values.courseName}
              placeholder="Nhập tên khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Mô tả khóa học</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="description"
              type="text"
              value={formEdit.values.description}
              placeholder="Nhập mô tả khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Giá khóa học</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="price"
              type="number"
              value={formEdit.values.price}
              placeholder="Nhập giá khóa học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDuration">
            <Form.Label>Số giờ học</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="duration"
              type="number"
              value={formEdit.values.duration}
              placeholder="Nhập số giờ học"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Đường dẫn ảnh</Form.Label>
            <Form.Control
              onChange={formEdit.handleChange}
              name="image"
              type="text"
              value={formEdit.values.image}
              placeholder="Nhập đường dẫn ảnh"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInstructorId">
            <Form.Label>Giáo viên giảng dạy</Form.Label>
            <Form.Select
              onChange={formEdit.handleChange}
              name="instructorId"
              value={formEdit.values.instructorId}
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
          <Button variant="primary" type="submit" className="me-2">
            Sửa
          </Button>
          <Link to={"/admin/courses"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default CoursesEdit;
