import { instance } from "../configs/axios.config";

class ReviewsService {
  static async getAllReviews() {
    return await instance.get("/reviews?_expand=course&_expand=student");
  }

  static async getReviewsByCourseId(courseId) {
    return await instance.get(`/reviews?courseId=${courseId}&_expand=student`);
  }

  static async deleteReviewsById(id) {
    return await instance.delete(`/reviews/${id}`);
  }
}

export default ReviewsService;
