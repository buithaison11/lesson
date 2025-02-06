import { instance } from "../configs/axios.config";

class NotificationService {
  static async getAllNotification() {
    return await instance.get("/notifications");
  }
  static async deleteNotificationById(id) {
    return await instance.delete(`/notifications/${id}`);
  }
  static async addNotification(notification) {
    return await instance.post("/notifications", notification);
  }
  static async updateNotifications(notificationsId, notifications) {
    return await instance.put(
      `/notifications/${notificationsId}`,
      notifications
    );
  }
  static async getNotificationById(notificationsId) {
    return await instance.get(`/notifications/${notificationsId}`);
  }
}

export default NotificationService;
