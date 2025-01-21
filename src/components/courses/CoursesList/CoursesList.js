import { useEffect, useState } from "react";
import CoursesService from "../../../services/courses.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";
function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [reload, setReload] = useState(true);
  // const dispatch = useDispatch();

  useEffect(() => {
    CoursesService.getAllCourses()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [reload]);

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      CoursesService.deleteCourseById(id)
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
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Khóa học</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>
        <h2>Danh sách khóa học</h2>
        <Link to={"/admin/courses/create"}>
          <Button variant="outline-primary">Create Courses</Button>
        </Link>
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên khóa học</th>
              <th>Giá</th>
              <th>Tên giảng viên</th>
              <th>Thời lượng</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>

              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 &&
              courses.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.courseName}</td>
                  <td>{item.price} VNĐ</td>

                  <td>{item.instructor.instructorName}</td>
                  <td>{item.duration} giờ</td>
                  <td>{item.description} </td>
                  <td>
                    <img
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.courseName}
                    />
                  </td>
                  <td>
                    <Link to={`/admin/courses/edit/${item.id}`}>
                      <Button variant="outline-primary">Chỉnh sửa</Button>
                    </Link>
                    <Button
                      onClick={() => handleDeleteCourse(item.id)}
                      variant="outline-danger"
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </main>
    </>
  );
}

export default CoursesList;
