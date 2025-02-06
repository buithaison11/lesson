import { useEffect, useState } from "react";
import NotificationService from "../../../services/notifications.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    NotificationService.getAllNotification().then((res) => {
      setNotifications(res.data);
      setTotalItems(res.data.length);
    });
  }, [currentPage]);

  const handleDeleteNotifications = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      NotificationService.deleteNotificationById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setNotifications(
            notifications.filter((notification) => notification.id !== id)
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

  const displayedCourses = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <h1 className="h2">Danh sách hỗ trợ</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link to={"/admin/notifications/create"}>
                <Button variant="outline-primary">
                  <i className="bi bi-plus-lg"></i> Thêm thông báo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên thông báo</th>
              <th>Ngày thông báo</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses.length > 0 &&
              displayedCourses.map((notification, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>{notification.message}</td>
                  <td className="text-center">{notification.date}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to={`/admin/notifications/edit/${notification.id}`}>
                        <Button variant="outline-primary" className="no-border">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                      <Button
                        onClick={() =>
                          handleDeleteNotifications(notification.id)
                        }
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

export default NotificationsList;
