import { instance } from "../configs/axios.config";

class LoginService {
  static async getUsers() {
    return await instance.get("/users");
  }
}

export default LoginService;
