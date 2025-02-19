import { useEffect, useState } from "react";
import BlogsService from "../../../services/blogs.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    BlogsService.getAllBlogs().then((res) => {
      setBlogs(res.data);
      setTotalItems(res.data.length);
    });
  }, [currentPage]);

  const handleDeleteBlogs = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      BlogsService.deleteBlogsById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setBlogs(blogs.filter((blogs) => blogs.id !== id));
        })
        .catch((err) => {
          toast.error("Delete failed!");
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedCourses = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <h1 className="h2">Danh sách bài viết</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên người viết</th>
              <th>Tiêu đề bài viết</th>
              <th>Nội dung bài viết </th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses.length > 0 &&
              displayedCourses.map((blogs, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{blogs.student.studentName}</td>
                  <td>{blogs.title}</td>
                  <td>{blogs.content}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        onClick={() => handleDeleteBlogs(blogs.id)}
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

export default BlogList;
