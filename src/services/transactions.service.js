import { instance } from "../configs/axios.config";

class TransactionService {
  static async getAllTransactions() {
    return await instance.get("/transactions?_expand=student&_expand=course");
  }
  static async getAllStudents() {
    return await instance.get("/students?_expand=course");
  }

  static async deleteTransactionsById(id) {
    return await instance.delete(`/transactions/${id}`);
  }

  static async addTransactions(transactions) {
    return await instance.post("/transactions", transactions);
  }

  static async getAllCourses() {
    return await instance.get("/courses?_expand=instructor");
  }
}

export default TransactionService;
