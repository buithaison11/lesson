import { useEffect, useState } from "react";
import InstructorService from "../../../services/instructor.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

function InstructorsList() {
  const [instructor, setInstructor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    InstructorService.getAllInstructors()
      .then((res) => {
        setInstructor(res.data);
        setTotalItems(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [currentPage]);

  const handleDeleteInstructor = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      InstructorService.deleteInstructorById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setInstructor(
            instructor.filter((instructor) => instructor.id !== id)
          );
        })
        .catch((err) => {
          toast.error("Delete failed!");
        });
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedCourses = instructor.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Danh sách giảng viên</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {" "}
              <Link to={"/admin/instructors/create"}>
                <Button variant="outline-primary">
                  <i class="bi bi-plus-lg"></i> Thêm giảng viên
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên giảng viên</th>
              <th>Tiểu sử giảng viên</th>
              <th>Gmail</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses.length > 0 &&
              displayedCourses.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.instructorName}</td>
                  <td>{item.bio}</td>
                  <td>{item.emailIns}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to={`/admin/instructors/edit/${item.id}`}>
                        <Button
                          variant="outline-primary"
                          className="no-border me-2"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteInstructor(item.id)}
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

        <PaginationComponent
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
}

export default InstructorsList;
