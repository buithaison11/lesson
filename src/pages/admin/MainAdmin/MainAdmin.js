import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
function MainAdmin() {
  const [theme, setTheme] = useState("light"); // Đặt giá trị khởi tạo là "light"
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", "light"); // Đặt chủ đề mặc định là "light"
  }, []);
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* sidebar */}
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
                    <a
                      className="nav-link d-flex align-items-center gap-2 active"
                      aria-current="page"
                      href="#"
                    >
                      <svg className="bi">
                        <use xlinkHref="#house-fill" />
                      </svg>
                      Khóa học
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link d-flex align-items-center gap-2"
                      href="#"
                    >
                      <svg className="bi">
                        <use xlinkHref="#file-earmark" />
                      </svg>
                      Giảng viên
                    </a>
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
          {/* Main */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Khóa học</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2"></div>
              </div>
            </div>
            <h2>Danh sách khóa học</h2>
            <div className="table-responsive small"></div>
          </main>
        </div>
      </div>

      {/* action light dark */}
      <div
        className={`dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle ${theme}`}
      >
        {" "}
        <button
          className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme (auto)"
        >
          {" "}
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
            {" "}
            <use href="#circle-half"></use>{" "}
          </svg>{" "}
          <span className="visually-hidden" id="bd-theme-text">
            {" "}
            Toggle theme{" "}
          </span>{" "}
        </button>{" "}
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="bd-theme-text"
        >
          {" "}
          <li>
            {" "}
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="light"
              aria-pressed={theme === "light"}
              onClick={() => handleThemeChange("light")}
            >
              {" "}
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                {" "}
                <use href="#sun-fill"></use>{" "}
              </svg>{" "}
              Light{" "}
              <svg className="bi ms-auto d-none" width="1em" height="1em">
                {" "}
                <use href="#check2"></use>{" "}
              </svg>{" "}
            </button>{" "}
          </li>{" "}
          <li>
            {" "}
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="dark"
              aria-pressed={theme === "dark"}
              onClick={() => handleThemeChange("dark")}
            >
              {" "}
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                {" "}
                <use href="#moon-stars-fill"></use>{" "}
              </svg>{" "}
              Dark{" "}
              <svg className="bi ms-auto d-none" width="1em" height="1em">
                {" "}
                <use href="#check2"></use>{" "}
              </svg>{" "}
            </button>{" "}
          </li>{" "}
          <li>
            {" "}
            <button
              type="button"
              className="dropdown-item d-flex align-items-center active"
              data-bs-theme-value="auto"
              aria-pressed={theme === "light"}
              onClick={() => handleThemeChange("light")}
            >
              {" "}
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                {" "}
                <use href="#circle-half"></use>{" "}
              </svg>{" "}
              Auto{" "}
              <svg className="bi ms-auto d-none" width="1em" height="1em">
                {" "}
                <use href="#check2"></use>{" "}
              </svg>{" "}
            </button>{" "}
          </li>{" "}
        </ul>{" "}
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

export default MainAdmin;
