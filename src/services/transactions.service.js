import { instance } from "../configs/axios.config";

class TransactionService {
  static async getAllTransactions() {
    return await instance.get("/transactions?_expand=student&_expand=course");
  }

  static async deleteTransactionsById(id) {
    return await instance.delete(`/transactions/${id}`);
  }
}

export default TransactionService;
