import { useEffect, useState } from "react";
import SupportService from "../../../services/support.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

function SupportList() {
  const [supports, setSupports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    SupportService.getAllSupport().then((res) => {
      setSupports(res.data);
      setTotalItems(res.data.length);
    });
  }, [currentPage]);

  const handleDeleteSupport = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      SupportService.deleteSupportById(id)
        .then((res) => {
          console.log("Xóa thành công!");
          toast.success("Delete successfully!");
          setSupports(supports.filter((supports) => supports.id !== id));
        })
        .catch((err) => {
          toast.error("Delete failed!");
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedSupports = supports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowClass = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "table-warning";
      case "Đã được xử lý":
        return "table-success";
      case "Xử lý thất bại":
        return "table-danger";
      default:
        return "";
    }
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <h1 className="h2">Danh sách hỗ trợ</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên học viên</th>
              <th>Vấn đề</th>
              <th>Phản hồi</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {displayedSupports.length > 0 &&
              displayedSupports.map((support, index) => (
                <tr
                  key={index}
                  className={`text-center ${getRowClass(support.status)}`}
                >
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{support.student.studentName}</td>
                  <td>{support.issue}</td>
                  <td>{support.status}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to={`/admin/supports/edit/${support.id}`}>
                        <Button variant="outline-primary" className="no-border">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteSupport(support.id)}
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

export default SupportList;
