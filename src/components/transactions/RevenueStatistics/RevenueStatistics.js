import { useEffect, useState } from "react";
import TransactionService from "../../../services/transactions.service";
import { Table } from "react-bootstrap";

function RevenueStatistics() {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    TransactionService.getAllTransactions()
      .then((res) => {
        setTransactions(res.data);
        const revenue = res.data.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setTotalRevenue(revenue);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thống kê doanh thu</h1>
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
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{transaction.student.studentName}</td>
                <td>{transaction.course.courseName}</td>
                <td>{transaction.amount} VNĐ</td>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.paymentMethod}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-3">
        <h3>Tổng doanh thu: {totalRevenue} VNĐ</h3>
      </div>
    </main>
  );
}

export default RevenueStatistics;
