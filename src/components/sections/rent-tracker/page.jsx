"use client";
import { useState, useEffect } from "react";
import { Receipt, Calendar, History, TruckElectricIcon } from "lucide-react";
import RentCard from "@/components/cards/RentCard";
import UpdateRentPopup from "@/components/popups/UpdateRentPopup";
import HistoryTable from "@/components/table/HistoryTable";
import useRentStore from "@/services/rent.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentCardSkeleton = () => (
  <div className="w-full bg-white rounded-xl shadow p-5 border-l-4">
    <div className="flex items-center gap-3 mb-3">
      <Skeleton circle width={40} height={40} />
      <div className="flex flex-col w-full">
        <Skeleton width={150} />
        <Skeleton width={100} />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
    </div>
  </div>
);

const HistoryTableSkeleton = () => (
  <div className="bg-white mt-4 rounded-lg border border-gray-300">
    <div className="p-6">
      <Skeleton width={200} height={30} />
    </div>
    <div className="p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton width={150} />
            <Skeleton width={100} />
            <Skeleton width={80} />
            <Skeleton width={100} />
            <Skeleton width={60} />
            <Skeleton width={60} />
            <Skeleton width={60} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Page = () => {
  const [selectedView, setSelectedView] = useState("current");
  const [updateRentPopup, setUpdateRentPopup] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { rents, loading, error, fetchAllRents, updateRent } = useRentStore();

  useEffect(() => {
    fetchAllRents();
  }, [fetchAllRents]);

  // Format selected date to YYYY-MM for filtering
  const selectedMonth = selectedDate.toISOString().slice(0, 7);

  const handleEditRent = (user) => setUpdateRentPopup(user);

  const handleUpdateRent = async (userId, newRent) => {
    try {
      // Find the current month's rent record for this user
      const userRents = rents.find(rent => rent.user.id === userId)?.rents || [];
      const currentMonthRent = userRents.find(rent => {
        const rentDate = new Date(rent.createdAt);
        const rentMonth = rentDate.toISOString().slice(0, 7); // Format: YYYY-MM
        return rentMonth === selectedMonth;
      });

      if (!currentMonthRent) {
        // Create a new rent record if none exists
        const year = selectedDate.getFullYear().toString();
        const monthName = selectedDate.toLocaleString('default', { month: 'long' });
        const now = new Date().toISOString();
        
        const newRentRecord = {
          amount: newRent.toString(),
          createdAt: now,
          id: crypto.randomUUID(),
          month: monthName,
          paidAt: null,
          status: "Unpaid",
          year: year
        };

        const userRentIndex = rents.findIndex(rent => rent.user.id === userId);
        if (userRentIndex !== -1) {
          rents[userRentIndex].rents.push(newRentRecord);
        } else {
          rents.push({
            user: { id: userId },
            rents: [newRentRecord]
          });
        }

        await updateRent(userId, newRentRecord.id, {
          ...newRentRecord,
          isNew: true
        });
        toast.success("New rent record created successfully!");
      } else {
        await updateRent(userId, currentMonthRent.firebaseId, {
          amount: newRent.toString(),
          updatedAt: new Date().toISOString()
        });
        toast.success("Rent amount updated successfully!");
      }

      await fetchAllRents();
      setUpdateRentPopup(null);
    } catch (error) {
      console.error("Error updating rent:", error);
      toast.error("Failed to update rent. Please try again.");
      throw error;
    }
  };

  const handleToggleStatus = async (userId, rentId, newStatus) => {
    try {
      await updateRent(userId, rentId, {
        status: newStatus ? "Paid" : "Unpaid",
        paidAt: newStatus ? new Date().toISOString() : null,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Rent marked as ${newStatus ? "Paid" : "Unpaid"}`);
      await fetchAllRents();
    } catch (error) {
      console.error("Error toggling rent status:", error);
      toast.error("Failed to update rent status. Please try again.");
      throw error;
    }
  };

  const getCurrentMonthRent = (rents) => {
    // Filter rents for the selected month
    const monthRents = rents.filter(rent => {
      const rentDate = new Date(rent.createdAt);
      const rentMonth = rentDate.toISOString().slice(0, 7); // Format: YYYY-MM
      return rentMonth === selectedMonth;
    });

    // Return the first rent record for the month, or null if none exists
    return monthRents[0] || null;
  };

  const currentMonthRents = rents.map(rent => {
    const currentMonthRent = getCurrentMonthRent(rent.rents);
    const isPaid = currentMonthRent?.status === "Paid";
    
    return {
      ...rent.user,
      id: rent.user.id,
      rentId: currentMonthRent?.firebaseId || null,
      monthlyRent: currentMonthRent?.amount || 0,
      paid: isPaid,
      lastPaymentDate: isPaid ? currentMonthRent?.paidAt : null,
      totalPaid: rent.rents.reduce((sum, r) => sum + (r.status === "Paid" ? Number(r.amount || 0) : 0), 0),
      paidThisMonth: isPaid ? currentMonthRent?.amount : 0,
      additionalKitchenHours: currentMonthRent?.additionalKitchenHours
    };
  });

  const paidCount = currentMonthRents.filter((u) => u.paid).length;
  const unpaidCount = currentMonthRents.filter((u) => !u.paid).length;

  if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

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
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="border rounded-lg px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              Paid: {loading ? <Skeleton width={30} /> : paidCount}
            </span>
            <span className="flex items-center text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              Unpaid: {loading ? <Skeleton width={30} /> : unpaidCount}
            </span>
          </div>
        </div>
        {selectedView === "current" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <RentCardSkeleton key={index} />
              ))
            ) : (
              currentMonthRents.map((user) => (
                <RentCard
                  key={user.id}
                  user={user}
                  onEditRent={handleEditRent}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            )}
          </div>
        ) : loading ? (
          <HistoryTableSkeleton />
        ) : (
          <HistoryTable data={rents} />
        )}
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
