import { instance } from "../configs/axios.config";

class CoursesService {
  static async getAllCourses() {
    return await instance.get("/courses?_expand=instructor");
  }

  static async getAllStudents() {
    return await instance.get("/students?_expand=course");
  }

  static async getAllInstructors() {
    return await instance.get("/instructors");
  }

  static async getCoursesById(coursesId) {
    return await instance.get(`/courses/${coursesId}?_expand=instructor`);
  }

  static async deleteCourseById(id) {
    return await instance.delete(`/courses/${id}`);
  }

  static async addCourses(courses) {
    return await instance.post("/courses", courses);
  }

  static async updateCourses(coursesId, courses) {
    return await instance.put(`/courses/${coursesId}`, courses);
  }
}

export default CoursesService;
