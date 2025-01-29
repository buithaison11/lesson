import { useEffect, useState } from "react";
import TransactionService from "../../../services/transactions.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    TransactionService.getAllTransactions()
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [reload]);

  const handleDeleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      TransactionService.deleteTransactionsById(id)
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
          {/* <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link to={"/admin/students/create"}>
                <Button variant="outline-primary">
                  <i class="bi bi-plus-lg"></i> Thêm học viên
                </Button>
              </Link>
            </div>
          </div> */}
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tên học viên</th>
              <th>Tên khóa học</th>
              <th>Số tiền</th>
              <th>Thời gian thanh toán</th>
              <th>Phương thức thanh toán</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 &&
              transactions.map((transactions, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{transactions.student.studentName}</td>
                  <td>{transactions.course.courseName}</td>
                  <td>{transactions.amount} VNĐ</td>
                  <td>{transactions.transactionDate}</td>
                  <td>{transactions.paymentMethod}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      {/* <Link to={`/admin/students/edit/${transactions.id}`}>
                        <Button variant="outline-primary" className="no-border">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link> */}
                      <Button
                        onClick={() => handleDeleteTransaction(transactions.id)}
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

export default TransactionsList;
