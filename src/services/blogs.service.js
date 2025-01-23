import { instance } from "../configs/axios.config";

class BlogsService {
  static async getAllBlogs() {
    return await instance.get("/blogs");
  }

  static async getAllStudents() {
    return await instance.get("/students");
  }

  static async addBlog(blog) {
    return await instance.post("/blogs", blog);
  }
}

export default BlogsService;
