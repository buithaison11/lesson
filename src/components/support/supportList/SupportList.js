import { useEffect, useState } from "react";
import SupportService from "../../../services/support.service";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { toast } from "react-toastify";

function SupportList() {
  const [supports, setSupports] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    SupportService.getAllSupport().then((res) => {
      setSupports(res.data);
    });
  }, [reload]);

  const handleDeleteSupport = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      SupportService.deleteSupportById(id)
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
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {supports.length > 0 &&
              supports.map((support, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{support.student.studentName}</td>
                  <td>{support.issue}</td>
                  <td>{support.status}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
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
      </main>
    </>
  );
}

export default SupportList;
