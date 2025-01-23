import { useEffect, useState } from "react";
import BlogsService from "../../services/blogs.service";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { toast } from "react-toastify";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    BlogsService.getAllBlogs()
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });

    BlogsService.getAllStudents()
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [reload]);

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.studentId === studentId);
    return student ? student.studentName : "Unknown";
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Blogs</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>
        <h2>Danh sách Blogs</h2>
        <Link to={"/home/blogs/create"}>
          <Button variant="outline-primary">Viết blog</Button>
        </Link>
        <div className="blogs-list">
          {blogs.length > 0 &&
            blogs.map((blog, index) => (
              <div key={index} className="blog-item">
                <h3>{blog.title}</h3>
                <p>
                  <strong>Tác giả:</strong> {getStudentName(blog.studentId)}
                </p>
                <p>{blog.content}</p>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default Blogs;
