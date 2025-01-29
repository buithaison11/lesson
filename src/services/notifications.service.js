import { instance } from "../configs/axios.config";

class NotificationService {
  static async getAllNotification() {
    return await instance.get("/notifications");
  }
  static async deleteNotificationById(id) {
    return await instance.delete(`/notifications/${id}`);
  }
}

export default NotificationService;
