import { useMemo, useState } from "react";
import {
  useFinancialRecords,
  type FinancialRecord,
} from "../../contexts/financial-record-form";
import { FinancialRecordForm } from "./financial-record-form";

export const FinancialRecordList = () => {
  const [recordToEdit, setRecordToEdit] = useState<FinancialRecord | null>(
    null
  );
  const { records, deleteRecord } = useFinancialRecords();

  const totalAmount = useMemo(() => {
    return records.reduce((total, record) => total + record.amount, 0);
  }, [records]);

  const handleDelete = (id?: string) => {
    if (!id) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) deleteRecord(id);
  };

  return (
    <>
      {/* Edit Modal */}
      {recordToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fadeIn scale-100 transition-transform duration-300">
            <FinancialRecordForm
              record={recordToEdit}
              method="put"
              setIsEditing={setRecordToEdit}
            />
            <button
              onClick={() => setRecordToEdit(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Records Dashboard */}
      <div className="container mx-auto p-8">
        {/* Total Amount Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
          <p className="text-3xl font-bold">${totalAmount.toFixed(2)}</p>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {rec.description}
              </h3>
              <p className="text-gray-500 mb-1">
                Date: {new Date(rec.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-1">
                Amount:{" "}
                <span
                  className={
                    rec.amount >= 0
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  ${rec.amount.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-500 mb-1">Category: {rec.category}</p>
              <p className="text-gray-500 mb-4">
                Payment Method: {rec.paymentMethod}
              </p>

              <div className="flex justify-between gap-4 mt-4">
                <button
                  onClick={() => setRecordToEdit(rec)}
                  className="flex-1 bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rec._id)}
                  className="flex-1 bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {records.length === 0 && (
          <div className="mt-12 text-center text-gray-400">
            <p>No records yet. Start by adding a new financial record!</p>
          </div>
        )}
      </div>
    </>
  );
};
