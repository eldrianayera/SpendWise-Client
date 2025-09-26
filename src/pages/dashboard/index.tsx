import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, <span className="text-blue-600">{user?.firstName}</span>! Here
        are your Finances:
      </h1>

      {/* Financial Record Form */}
      <div className="mb-8">
        <FinancialRecordForm method="post" />
      </div>

      {/* Financial Record List */}
      <FinancialRecordList />
    </div>
  );
};
