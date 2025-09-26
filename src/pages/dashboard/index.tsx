import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  if (!isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Main content */}
      <main className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome back, <span className="text-blue-600">{user?.firstName}</span>{" "}
          👋
        </h2>
        <p className="text-gray-600 mb-10">
          Manage your income, expenses, and savings in one place.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Add a Record
              </h3>
              <FinancialRecordForm method="post" />
            </div>
          </div>

          {/* Right: List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Your Financial Records
              </h3>
              <FinancialRecordList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
