import { useEffect, useState } from "react";
import CoursesService from "../../../services/courses.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    CoursesService.getAllCourses()
      .then((res) => {
        setCourses(res.data);
        setTotalItems(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [currentPage]);

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      CoursesService.deleteCourseById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setCourses(courses.filter((course) => course.id !== id));
        })
        .catch((err) => {
          toast.error("Delete failed!");
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <h1 className="h2">Danh sách khóa học</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link to={"/admin/courses/create"}>
                <Button variant="outline-primary">
                  <i className="bi bi-plus-lg"></i> Thêm khóa học
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên khóa học</th>
              <th>Giá</th>
              <th>Tên giảng viên</th>
              <th>Thời gian</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses.length > 0 &&
              displayedCourses.map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.courseName}</td>
                  <td className="text-center">{formatCurrency(item.price)}</td>
                  <td>{item.instructor.instructorName}</td>
                  <td className="text-center">{item.duration} giờ</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.courseName}
                      className="img-fluid"
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to={`/admin/courses/${item.id}/students`}>
                        <Button variant="outline-primary" className="no-border">
                          <i className="bi bi-person-lines-fill"></i>
                        </Button>
                      </Link>
                      <Link to={`/admin/courses/${item.id}/reviews`}>
                        <Button variant="outline-primary" className="no-border">
                          <i class="bi bi-eye-fill"></i>
                        </Button>
                      </Link>
                      <Link to={`/admin/courses/edit/${item.id}`}>
                        <Button variant="outline-primary" className="no-border">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteCourse(item.id)}
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

export default CoursesList;
