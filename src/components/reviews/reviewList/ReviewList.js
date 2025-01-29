import { useEffect, useState } from "react";
import ReviewsService from "../../../services/reviews.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    ReviewsService.getAllReviews().then((res) => {
      setReviews(res.data);
    });
  }, [reload]);

  const handleDeleteReviews = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      ReviewsService.deleteReviewsById(id)
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
          <h1 className="h2">Danh sách đánh giá khóa học</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên học viên</th>
              <th>Khóa học</th>
              <th>Số sao đánh giá</th>
              <th>Nội dung đánh giá</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 &&
              reviews.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.student.studentName}</td>
                  <td>{item.course.courseName}</td>
                  <td>{item.rating}</td>
                  <td>{item.comment}</td>
                  <td>
                    <Button
                      onClick={() => handleDeleteReviews(item.id)}
                      variant="outline-danger"
                      className="no-border"
                    >
                      <i className="bi bi-trash-fill"></i>
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

export default ReviewList;
