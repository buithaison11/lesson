import { useEffect, useState } from "react";
import StudentsService from "../../../services/students.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    StudentsService.getAllStudents()
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [reload]);

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      StudentsService.deleteStudentsById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setReload(!reload);
        })
        .catch((err) => {
          toast.error("Delete failed!");
        });
    }
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <h1 className="h2">Danh sách học viên</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link to={"/admin/students/create"}>
                <Button variant="outline-primary">
                  <i class="bi bi-plus-lg"></i> Thêm học viên
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
              <th>Gmail</th>
              <th>Khóa học hiện tại</th>
              <th>Thời gian nhập học</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 &&
              students.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.studentName}</td>
                  <td>{item.email} </td>
                  <td>{item.course.courseName}</td>
                  <td>{item.enrollmentDate}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to={`/admin/students/edit/${item.id}`}>
                        <Button variant="outline-primary" className="no-border">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteStudent(item.id)}
                        variant="outline-danger"
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
      </main>
    </>
  );
}

export default StudentList;
