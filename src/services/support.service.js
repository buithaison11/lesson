import { instance } from "../configs/axios.config";

class SupportService {
  static async getAllUsers() {
    return await instance.get("/users");
  }

  static async addSupport(support) {
    return await instance.post("/supportTickets", support);
  }
}

export default SupportService;
