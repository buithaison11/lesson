import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Table, Button } from "react-bootstrap";
import CoursesService from "../../../services/courses.service";
import ReviewsService from "../../../services/reviews.service";
import { toast } from "react-toastify";

function ReviewByCourses() {
  const [reviews, setReviews] = useState([]);
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    ReviewsService.getReviewsByCourseId(courseId).then((res) => {
      setReviews(res.data);
    });
    CoursesService.getCoursesById(courseId).then((res) => {
      setCourse(res.data);
    });
  }, [courseId]);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          Danh sách học viên đánh giá khóa học {course ? course.courseName : ""}
        </h1>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên học viên</th>
            <th>Số sao đánh giá</th>
            <th>Nội dung đánh giá</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{review.student.studentName}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Link to="/admin/reviews">
        <Button variant="primary" className="me-2">
          Danh sách đánh giá
        </Button>
      </Link>
      <Link to="/admin/courses">
        <Button variant="secondary">Trở về</Button>
      </Link>
    </main>
  );
}

export default ReviewByCourses;
