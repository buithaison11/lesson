import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import InstructorService from "../../../services/instructor.service";
import { toast } from "react-toastify";
import { Link } from "react-router";

function InstructorAdd() {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    InstructorService.getAllInstructors().then((res) => {
      setInstructors(res.data);
    });
  }, []);

  const formAddInstructor = useFormik({
    initialValues: {
      instructorName: "",
      bio: "",
      emailIns: "",
    },
    onSubmit: (values) => {
      if (!values.instructorName) {
        toast.error("Vui lòng nhập tên giảng viên!");
        return;
      }
      if (!values.bio) {
        toast.error("Vui lòng nhập tiểu sử giảng viên!");
        return;
      }
      if (!values.emailIns) {
        toast.error("Vui lòng nhập gmail giảng viên!");
        return;
      }
      InstructorService.addInstructor(values)
        .then((res) => {
          toast.success("Thêm thành công giảng viên!");
          navigate("/admin/instructors");
        })
        .catch((err) => {
          toast.error("Thêm thất bại giảng viên!");
        });
    },
  });

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Giảng viên</h1>
        </div>
        <h2>Thêm giảng viên</h2>
        <Col md={12}>
          <Form onSubmit={formAddInstructor.handleSubmit}>
            <Form.Group className="mb-3" controlId="formInstructorName">
              <Form.Label>Tên giảng viên</Form.Label>
              <Form.Control
                onChange={formAddInstructor.handleChange}
                name="instructorName"
                type="text"
                placeholder="Nhập tên giảng viên"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label>Tiểu sử giảng viên</Form.Label>
              <Form.Control
                onChange={formAddInstructor.handleChange}
                name="bio"
                type="text"
                placeholder="Nhập tiểu sử giảng viên"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIns">
              <Form.Label>Gmail giảng viên</Form.Label>
              <Form.Control
                onChange={formAddInstructor.handleChange}
                name="emailIns"
                type="email"
                placeholder="Nhập Gmail giảng viên"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Link to={"/admin/instructors"}>
              <Button variant="secondary">Cancel</Button>
            </Link>
          </Form>
        </Col>
      </main>
    </>
  );
}

export default InstructorAdd;
