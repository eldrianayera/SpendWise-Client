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

    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmDelete) {
      deleteRecord(id);
    }
  };

  return (
    <>
      {/* Modal for Editing Record */}
      {recordToEdit && (
        <div className="fixed inset-0 w-full min-h-screen flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
            <FinancialRecordForm record={recordToEdit} method="put" />
            <button
              onClick={() => setRecordToEdit(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
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

      {/* Main Records List */}
      <div className="p-8 bg-gray-50 rounded-lg shadow-lg w-full max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Financial Records
        </h2>
        <p>Total : {totalAmount}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {rec.description}
              </h3>
              <p className="text-md mb-2 text-gray-600">
                Date: {new Date(rec.date).toLocaleDateString()}
              </p>
              <p className="text-md mb-2 text-gray-600">
                Amount: ${rec.amount.toFixed(2)}
              </p>
              <p className="text-md mb-2 text-gray-600">
                Category: {rec.category}
              </p>
              <p className="text-md mb-4 text-gray-600">
                Payment Method: {rec.paymentMethod}
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setRecordToEdit(rec)}
                  className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rec._id)}
                  className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transform transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
