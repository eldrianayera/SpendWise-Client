import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  useFinancialRecords,
  type FinancialRecord,
} from "../../contexts/financial-record-form";

interface Props {
  record?: FinancialRecord;
  method: "post" | "put";
  setIsEditing?: React.Dispatch<React.SetStateAction<FinancialRecord | null>>;
}

export const FinancialRecordForm = ({
  record,
  method,
  setIsEditing,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const { addRecord, updateRecord } = useFinancialRecords();
  const { user } = useUser();

  useEffect(() => {
    if (record) {
      setDescription(record.description);
      setCategory(record.category);
      setPaymentMethod(record.paymentMethod);
      setAmount(Math.abs(record.amount));
      setType(record.amount < 0 ? "expense" : "income");
    }
  }, [record]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      category,
      paymentMethod,
    };

    if (method === "post") {
      addRecord(newRecord);
    } else if (method === "put" && record?._id) {
      updateRecord(record._id, newRecord);
      setIsEditing?.(null);
    }

    // Reset form
    setDescription("");
    setAmount(0);
    setCategory("");
    setPaymentMethod("");
    setType("expense");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Description:
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Amount:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">$</span>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
              className="pl-7 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Income/Expense Toggle */}
        <div className="flex justify-center bg-gray-100 p-1 rounded-full w-64 mx-auto">
          <button
            type="button"
            className={`flex-1 py-2 rounded-full font-semibold transition-colors ${
              type === "income"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setType("income")}
          >
            Income
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-full font-semibold transition-colors ${
              type === "expense"
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Payment Method */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Payment Method:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {method === "post" ? "Add Record" : "Update"}
        </button>
      </form>
    </div>
  );
};
