import { instance } from "../configs/axios.config";

class SupportService {
  static async getAllSupport() {
    return await instance.get("/supports?_expand=student");
  }

  static async addSupport(support) {
    return await instance.post("/supportTickets", support);
  }

  static async deleteSupportById(id) {
    return await instance.delete(`/supports/${id}`);
  }

  static async updateSupportStatus(id, status) {
    return await instance.patch(`/supports/${id}`, { status });
  }
}

export default SupportService;
