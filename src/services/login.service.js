import { instance } from "../configs/axios.config";

class LoginService {
  static async getUsers() {
    return await instance.get("/users");
  }

  static async getLoginById(loginId) {
    return await instance.get(`/users/${loginId}`);
  }

  static async updateLogin(loginId, users) {
    return await instance.put(`/users/${loginId}`, users);
  }
}

export default LoginService;
