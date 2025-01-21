import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router";

function SideBar() {
  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div
          className="offcanvas-md offcanvas-end bg-body-tertiary"
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">
              Company name
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2 active"
                  to={"/admin/courses"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-book"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                  </svg>
                  Khóa học
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2 active"
                  to={"/admin/instructors"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-book"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                  </svg>
                  Giảng viên
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  <svg className="bi">
                    <use xlinkHref="#cart" />
                  </svg>
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  <svg className="bi">
                    <use xlinkHref="#people" />
                  </svg>
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  <svg className="bi">
                    <use xlinkHref="#graph-up" />
                  </svg>
                  Reports
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  <svg className="bi">
                    <use xlinkHref="#puzzle" />
                  </svg>
                  Integrations
                </a>
              </li>
            </ul>

            <hr className="my-3" />

            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  <svg className="bi">
                    <use xlinkHref="#gear-wide-connected" />
                  </svg>
                  Settings
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  <svg className="bi">
                    <use xlinkHref="#door-closed" />
                  </svg>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js"
        integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp"
        crossOrigin="anonymous"
      ></script>
      <script src="../../asset/js/dashboard.js"></script>
    </>
  );
}

export default SideBar;
