import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Table, Button } from "react-bootstrap";
import StudentsService from "../../../services/students.service";
import CoursesService from "../../../services/courses.service";
import { toast } from "react-toastify";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

function StudentsByCourse() {
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    StudentsService.getStudentsByCourseId(courseId).then((res) => {
      setStudents(res.data);
      setTotalItems(res.data.length);
    });
    CoursesService.getCoursesById(courseId).then((res) => {
      setCourse(res.data);
    });
  }, [courseId]);

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      StudentsService.deleteStudentsById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setStudents(students.filter((student) => student.id !== id));
          setTotalItems(totalItems - 1);
        })
        .catch((err) => {
          toast.error("Delete failed!");
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          Danh sách học viên {course ? course.courseName : ""}
        </h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to={"/admin/students/create"}>
              <Button variant="outline-primary">
                <i className="bi bi-plus-lg"></i> Thêm học viên mới
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên học viên</th>
            <th>Email</th>
            <th>Ngày nhập học</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.length > 0 &&
            displayedStudents.map((student, index) => (
              <tr key={index} className="text-center">
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{student.studentName}</td>
                <td>{student.email}</td>
                <td>{student.enrollmentDate}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/admin/students/edit/${student.id}`}>
                      <Button variant="outline-primary" className="no-border">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="no-border"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <PaginationComponent
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <Link to="/admin/students">
        <Button variant="primary" className="me-2">
          Danh sách học viên
        </Button>
      </Link>
      <Link to="/admin/courses">
        <Button variant="secondary">Trở về</Button>
      </Link>
    </main>
  );
}

export default StudentsByCourse;
