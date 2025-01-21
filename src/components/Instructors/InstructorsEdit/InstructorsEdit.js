import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import InstructorService from "../../../services/instructor.service";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useParams } from "react-router";

function InstructorEdit() {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    InstructorService.getAllInstructors().then((res) => {
      setInstructors(res.data);
    });
    InstructorService.getInstructorById(id).then((res) => {
      setInstructors(res.data);
    });
  }, [id]);

  const formEditInstructor = useFormik({
    initialValues: {
      instructorName: instructors ? instructors.instructorName : "",
      bio: instructors ? instructors.bio : "",
      emailIns: instructors ? instructors.emailIns : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!values.instructorName || !values.bio || !values.emailIns) {
        toast.error("Vui lòng điền lại nội dung");
        return;
      }
      InstructorService.updateInstructor(id, values)
        .then((res) => {
          toast.success("Sửa thành công giảng viên!");
          navigate("/admin/instructors");
        })
        .catch((err) => {
          toast.error("Sửa thất bại giảng viên");
        });
    },
  });

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Giảng viên</h1>
        </div>
        <h2>Sửa giảng viên</h2>
        <Col md={12}>
          <Form onSubmit={formEditInstructor.handleSubmit}>
            <Form.Group className="mb-3" controlId="formInstructorName">
              <Form.Label>Tên giảng viên</Form.Label>
              <Form.Control
                onChange={formEditInstructor.handleChange}
                name="instructorName"
                type="text"
                value={formEditInstructor.values.instructorName}
                placeholder="Nhập tên giảng viên"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label>Tiểu sử giảng viên</Form.Label>
              <Form.Control
                onChange={formEditInstructor.handleChange}
                name="bio"
                type="text"
                value={formEditInstructor.values.bio}
                placeholder="Nhập tiểu sử giảng viên"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIns">
              <Form.Label>Gmail giảng viên</Form.Label>
              <Form.Control
                onChange={formEditInstructor.handleChange}
                name="emailIns"
                type="email"
                value={formEditInstructor.values.emailIns}
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

export default InstructorEdit;
