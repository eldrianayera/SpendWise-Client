import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  useFinancialRecords,
  type FinancialRecord,
} from "../../contexts/financial-record-form";

interface Props {
  record?: FinancialRecord;
  method: "post" | "put";
}

export const FinancialRecordForm = ({ record, method }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const { addRecord, updateRecord } = useFinancialRecords();

  const { user } = useUser();

  useEffect(() => {
    if (record) {
      setDescription(record.description);
      setCategory(record.category);
      setPaymentMethod(record.paymentMethod);
      setAmount(record.amount.toString());
    }
  }, [record]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(1111111);

    if (method === "post") {
      const newRecord = {
        userId: user?.id ?? "",
        date: new Date(),
        description: description,
        amount: parseFloat(amount),
        category: category,
        paymentMethod: paymentMethod,
      };

      addRecord(newRecord);
    } else if (method === "put") {
      if (!record?._id) {
        return;
      }
      const newRecord = {
        description: description,
        amount: parseFloat(amount),
        category: category,
        paymentMethod: paymentMethod,
      };

      updateRecord(record._id, newRecord);
    }

    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="paymentMethod"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Record
        </button>
      </form>
    </div>
  );
};
