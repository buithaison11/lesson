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
import SupportUser from "./layout/SupportUser/SupportUser";
import Blogs from "./layout/Blogs/Blogs";
import BlogAdd from "./layout/Blogs/BlogsAdd";
import StudentList from "./components/students/studentList/studentList";
import StudentAdd from "./components/students/studentAdd/StudentAdd";
import StudentEdit from "./components/students/studentEdit/StudentEdit";
import StudentsByCourse from "./components/courses/CoursesList/StudentsByCourse";
import ReviewList from "./components/reviews/reviewList/ReviewList";
import ReviewByCourses from "./components/reviews/reviewCourses/reviewCourses";
import BlogList from "./components/Blogs/blogList/blogLitst";
import SupportList from "./components/support/supportList/SupportList";
import NotificationsList from "./components/notifications/notificationsList/NotificationsList";
import NotificationsAdd from "./components/notifications/notificationAdd/NotificationsAdd";
import NotificationsEdit from "./components/notifications/notificationEdit/NotificationsEdit";
import TransactionsList from "./components/transactions/TransactionsList/TransactionsList";
import TransactionsAdd from "./components/transactions/TransactionsAdd/TransactionsAdd";
import RevenueStatistics from "./components/transactions/RevenueStatistics/RevenueStatistics";
import SupportEdit from "./components/support/supportEdit/SupportEdit";
import ChangePassword from "./components/changePassword/ChangePassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home/support" element={<SupportUser />} />
        <Route path="/home/blogs" element={<Blogs />} />
        <Route path="/home/blogs/create" element={<BlogAdd />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/edit/:id" element={<ChangePassword />} />
        {/* Admin */}
        <Route path="/admin" element={<Master />}>
          <Route path="courses" element={<CoursesList />} />
          <Route path="courses/create" element={<CoursesAdd />} />
          <Route path="courses/edit/:id" element={<CoursesEdit />} />
          <Route
            path="courses/:courseId/students"
            element={<StudentsByCourse />}
          />
          <Route
            path="courses/:courseId/reviews"
            element={<ReviewByCourses />}
          />
          <Route path="instructors" element={<InstructorsList />} />
          <Route path="instructors/create" element={<InstructorAdd />} />
          <Route path="instructors/edit/:id" element={<InstructorEdit />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/create" element={<StudentAdd />} />
          <Route path="students/edit/:id" element={<StudentEdit />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="supports" element={<SupportList />} />
          <Route path="notifications" element={<NotificationsList />} />
          <Route path="notifications/create" element={<NotificationsAdd />} />
          <Route
            path="notifications/edit/:id"
            element={<NotificationsEdit />}
          />
          <Route path="transactions" element={<TransactionsList />} />
          <Route path="transactions/create" element={<TransactionsAdd />} />
          <Route path="revenues" element={<RevenueStatistics />} />
          <Route path="supports/edit/:id" element={<SupportEdit />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
