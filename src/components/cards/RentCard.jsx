import React from "react";
import {
  CheckCircle,
  Circle,
  PiggyBank,
  DollarSign,
  Timer,
  User as UserIcon,
  SquarePen,
} from "lucide-react";

const RentCard = ({ user, onTogglePaid, onEditRent }) => {
  return (
    <div
      className={`w-full bg-white rounded-xl shadow p-5 border-l-4 transition-all duration-300 ${
        user.paid ? "border-l-green-400" : "border-l-red-400"
      } relative`}
    >
      {/* Toggle Paid/Unpaid */}
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => onTogglePaid(user.name)}
        title={user.paid ? "Mark as Unpaid" : "Mark as Paid"}
      >
        {user.paid ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <Circle className="text-red-400" />
        )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`rounded-full p-2 ${
            user.paid ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <UserIcon className="text-gray-600" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{user.name}</span>
          <span className="text-sm text-gray-500">{user.role}</span>
          {user.paid && user.lastPaymentDate && (
            <span className="text-green-600 text-xs font-medium">
              Paid on{" "}
              {new Date(user.lastPaymentDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {/* Total Paid */}
      <div className="bg-blue-50 rounded-lg px-4 py-2 mb-3 flex justify-between items-center">
        <span className="font-medium flex items-center gap-2">
          <PiggyBank /> Total Paid:
        </span>
        <span className="text-blue-600 font-bold text-lg">
          ${user.totalPaid}
        </span>
      </div>

      {/* Monthly Rent */}
      <div className="bg-gray-50 rounded-lg px-4 py-2 mb-3 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <DollarSign /> Monthly Rent:
        </span>
        <span
          className="ml-2 flex items-center space-x-2 text-blue-500 cursor-pointer"
          title="Edit Rent"
          onClick={() => onEditRent(user)}
        >
          <span className="font-bold text-lg">${user.monthlyRent}</span>
          <SquarePen width={16} className="hover:text-black"/>
        </span>
      </div>

      {/* Kitchen Hours */}
      {user.additionalKitchenHours ? (
        <div className="bg-yellow-50 rounded-lg px-4 py-2 mb-3 flex justify-between items-center">
          <span className="flex items-center gap-2 text-yellow-700">
            <Timer /> Additional Kitchen Hours:
          </span>
          <span className="font-bold text-lg">
            {user.additionalKitchenHours}h
          </span>
        </div>
      ) : null}

      {/* Paid Box */}
      {user.paid && (
        <div className="bg-green-100 text-green-700 rounded-lg px-4 py-2 font-semibold text-center">
          Paid ${user.paidThisMonth}
          {user.additionalKitchenHours && (
            <> (with {user.additionalKitchenHours} additional hours)</>
          )}
        </div>
      )}
    </div>
  );
};

export default RentCard;
