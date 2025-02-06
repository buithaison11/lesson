import Container from "react-bootstrap/Container";
import { Button, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import TransactionService from "../../../services/transactions.service";
import { toast } from "react-toastify";
import { Link } from "react-router";

function TransactionsAdd() {
  const [transactions, setTransactions] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    TransactionService.getAllTransactions().then((res) => {
      setTransactions(res.data);
    });
    TransactionService.getAllStudents().then((res) => {
      setStudents(res.data);
    });
    TransactionService.getAllCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);

  const formAdd = useFormik({
    initialValues: {
      studentId: "",
      courseId: "",
      amount: "",
      transactionDate: "",
      paymentMethod: "",
    },
    onSubmit: (values) => {
      if (!values.studentId) {
        toast.error("Vui lòng chọn học viên thanh toán!");
        return;
      }
      if (!values.courseId) {
        toast.error("Vui lòng chọn khóa học!");
        return;
      }
      if (!values.amount) {
        toast.error("Vui lòng nhập giá tiền khóa học!");
        return;
      }
      if (!values.transactionDate) {
        toast.error("Vui lòng nhập ngày thanh toán!");
        return;
      }
      if (!values.paymentMethod) {
        toast.error("Vui lòng chọn phương thức thanh toán!");
        return;
      }

      TransactionService.addTransactions(values)
        .then((res) => {
          toast.success("Thêm thành công khóa học!");
          navigate("/admin/transactions");
        })
        .catch((err) => {
          toast.error("Thêm thất bại khóa học!");
        });
    },
  });

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm thanh toán</h1>
      </div>
      <Col md={12}>
        <Form onSubmit={formAdd.handleSubmit}>
          <Form.Group className="mb-3" controlId="formStudentId">
            <Form.Label>Tên học viên thanh toán</Form.Label>
            <Form.Select
              onChange={formAdd.handleChange}
              name="studentId"
              aria-label="Chọn học viên thanh toán"
            >
              <option value="">Chọn học viên</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.studentName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCourseId">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Select
              onChange={formAdd.handleChange}
              name="courseId"
              aria-label="Chọn khóa học"
            >
              <option value="">Chọn khóa học</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Số tiền thanh toán</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="amount"
              type="number"
              placeholder="Nhập số tiền thanh toán"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTransactionDate">
            <Form.Label>Ngày thanh toán</Form.Label>
            <Form.Control
              onChange={formAdd.handleChange}
              name="transactionDate"
              type="date"
              placeholder="Chọn ngày thanh toán"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPaymentMethod">
            <Form.Label>Phương thức thanh toán</Form.Label>
            <Form.Select
              onChange={formAdd.handleChange}
              name="paymentMethod"
              aria-label="Chọn phương thức thanh toán"
            >
              <option value="">Chọn phương thức thanh toán</option>
              <option value="Thanh toán bằng tiền mặt">
                Thanh toán bằng tiền mặt
              </option>
              <option value="Thanh toán qua chuyển khoản">
                Thanh toán qua chuyển khoản
              </option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            <i className="bi bi-plus-lg"></i> Thêm
          </Button>
          <Link to={"/admin/transactions"}>
            <Button variant="secondary">Trở về</Button>
          </Link>
        </Form>
      </Col>
    </main>
  );
}

export default TransactionsAdd;
