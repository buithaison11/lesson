import { instance } from "../configs/axios.config";

class StudentsService {
  static async getAllStudents() {
    return await instance.get("/students?_expand=course");
  }

  static async deleteStudentsById(id) {
    return await instance.delete(`/students/${id}`);
  }

  static async getAllCourses() {
    return await instance.get("/courses");
  }

  static async addStudents(students) {
    return await instance.post("/students", students);
  }

  static async updateStudents(studentId, students) {
    return await instance.put(`/students/${studentId}`, students);
  }

  static async getStudentsById(studentId) {
    return await instance.get(`/students/${studentId}?_expand=course`);
  }

  static async getStudentsByCourseId(courseId) {
    return await instance.get(`/students?courseId=${courseId}`);
  }
}

export default StudentsService;
