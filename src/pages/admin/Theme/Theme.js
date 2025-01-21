import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Theme() {
  const dispatch = useDispatch();

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
    </>
  );
}

export default Theme;
