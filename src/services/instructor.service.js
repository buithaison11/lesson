import { instance } from "../configs/axios.config";

class InstructorService {
  static async getAllInstructors() {
    return await instance.get("/instructors");
  }

  static async getInstructorById(instructorId) {
    return await instance.get(`/instructors/${instructorId}`);
  }

  static async deleteInstructorById(id) {
    return await instance.delete(`/instructors/${id}`);
  }

  static async addInstructor(instructor) {
    return await instance.post("/instructors", instructor);
  }

  static async updateInstructor(instructorId, instructor) {
    return await instance.put(`/instructors/${instructorId}`, instructor);
  }
}

export default InstructorService;
