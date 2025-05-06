"use client";
import { useState } from "react";
import { Receipt, Calendar, History } from "lucide-react";
import RentCard from "@/components/cards/RentCard";
import { rentPayments, history } from "@/lib/rentData";
import UpdateRentPopup from "@/components/popups/UpdateRentPopup";
import HistoryTable from "@/components/table/HistoryTable";

const Page = () => {
  const [selectedView, setSelectedView] = useState("current");
  const [payments, setPayments] = useState(rentPayments);
  const [updateRentPopup, setUpdateRentPopup] = useState();
  const [selectedMonth, setSelectedMonth] = useState("2025-05");
  const monthOptions = [
    { value: "2025-05", label: "May 2025" },
    { value: "2025-04", label: "April 2025" },
    { value: "2025-03", label: "March 2025" },
  ];

  const togglePaidStatus = (name) => {
    const updated = payments.map((u) =>
      u.name === name ? { ...u, paid: !u.paid } : u
    );
    setPayments(updated);
  };

  const handleEditRent = (user) => setUpdateRentPopup(user);

  const handleUpdateRent = (name, newRent) => {
    setPayments((payments) =>
      payments.map((u) =>
        u.name === name ? { ...u, monthlyRent: newRent } : u
      )
    );
    setUpdateRentPopup(null);
  };

  const paidCount = payments.filter((u) => u.paid).length;
  const unpaidCount = payments.filter((u) => !u.paid).length;

  return (
    <div>
      <div className="px-6 py-6 w-full">
        <h1 className="text-3xl font-light">Rent Tracker</h1>
        <p className="text-gray-500 mt-1">
          Track rent payments, manage rent amounts, and monitor kitchen hours
          for culinary members.
        </p>
        <div className="h-[1px] bg-gray-200 w-full mt-4"></div>
        <div className="w-full flex justify-between mt-4">
          <div className="flex items-center">
            <Receipt className="text-primary mr-2" />
            <p className="font-semibold">Monthly Rent Status</p>
          </div>
          <div className="bg-gray-100 p-1 flex space-x-2 rounded-lg">
            <button
              onClick={() => setSelectedView("current")}
              className={`flex cursor-pointer items-center px-2 py-1 rounded-md space-x-1 text-sm ${
                selectedView === "current"
                  ? "bg-white text-black"
                  : "text-gray-600"
              }`}
            >
              <Calendar size={16} />
              <span>Current Month</span>
            </button>
            <button
              onClick={() => setSelectedView("history")}
              className={`flex cursor-pointer items-center px-2 py-1 rounded-md space-x-1 text-sm ${
                selectedView === "history"
                  ? "bg-white text-black"
                  : "text-gray-600"
              }`}
            >
              <History size={16} />
              <span>History</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <select
              className="border rounded-lg px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {monthOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              Paid: {paidCount}
            </span>
            <span className="flex items-center text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              Unpaid: {unpaidCount}
            </span>
          </div>
        </div>
        {selectedView === "current" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {payments.map((user) => (
              <RentCard
                key={user.name}
                user={user}
                onTogglePaid={togglePaidStatus}
                onEditRent={handleEditRent}
              />
            ))}
          </div>
        ): <HistoryTable data={history} />}
      </div>
      {updateRentPopup && (
        <UpdateRentPopup
          user={updateRentPopup}
          onClose={() => setUpdateRentPopup(null)}
          onSave={handleUpdateRent}
        />
      )}
    </div>
  );
};

export default Page;
