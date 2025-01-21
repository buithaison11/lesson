import { BrowserRouter as Router, Routes, Route } from "react-router";
import Master from "./pages/admin/Master/Master";
import Login from "./pages/login/login";
import Error from "./pages/Error/error";
import CoursesList from "./components/courses/CoursesList/CoursesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursesAdd from "./components/courses/CoursesAdd/CoursesAdd";
import CoursesEdit from "./components/courses/CoursesEdit/CoursesEdit";
import InstructorsList from "./components/Instructors/InstructorsList/InstructorsList";
import InstructorAdd from "./components/Instructors/InstructorsAdd/InstructorsAdd";
import InstructorEdit from "./components/Instructors/InstructorsEdit/InstructorsEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Master />}>
          <Route path="courses" element={<CoursesList />} />
          <Route path="courses/create" element={<CoursesAdd />} />
          <Route path="courses/edit/:id" element={<CoursesEdit />} />
          <Route path="instructors" element={<InstructorsList />} />
          <Route path="instructors/create" element={<InstructorAdd />} />
          <Route path="instructors/edit/:id" element={<InstructorEdit />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
