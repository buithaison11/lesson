import { instance } from "../configs/axios.config";

class BlogsService {
  static async getAllBlogs() {
    return await instance.get("/blogs?_expand=student");
  }

  static async getAllStudents() {
    return await instance.get("/students");
  }

  static async addBlog(blog) {
    return await instance.post("/blogs", blog);
  }

  static async deleteBlogsById(id) {
    return await instance.delete(`/blogs/${id}`);
  }
}

export default BlogsService;
