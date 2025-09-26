import { useUser } from "@clerk/clerk-react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: Partial<FinancialRecord>) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecords = async () => {
      const userId = user?.id;

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE
          }/financial-records/getAllByUserId/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const response = await res.json();
          setRecords(response);
        }
      } catch (error) {
        throw new Error("Failed to fetch records");
      }
    };

    if (user) {
      fetchRecords();
    }
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/financial-records`,
      {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      throw new Error("Error in adding a new record");
    }
  };

  const updateRecord = async (
    id: string,
    newRecord: Partial<FinancialRecord>
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/financial-records/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        }
      );

      if (response.ok) {
        const updatedRecord = await response.json();
        console.log(updatedRecord);
        setRecords((prev) =>
          prev.map((record) =>
            record._id === id ? { ...record, ...newRecord } : record
          )
        );
      }
    } catch (error) {}
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/financial-records/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) => prev.filter((record) => record._id !== id));
        console.log(deletedRecord);
      }
    } catch (error) {}
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
