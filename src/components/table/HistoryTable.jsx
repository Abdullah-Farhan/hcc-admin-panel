import { CheckCircle, Circle } from "lucide-react";
import { toast } from "react-toastify";
import useRentStore from "@/services/rent.service";

const HistoryTable = ({ data }) => {
  const { updateRent, addRent } = useRentStore();

  const getLastSixMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push({
        value: date.toISOString().slice(0, 7),
        label: date.toLocaleString('default', { month: 'long' }).toLowerCase()
      });
    }
    
    return months;
  };

  const months = getLastSixMonths();

  const handleStatusToggle = async (userId, month, currentStatus, rentRecord) => {
    try {
      const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
      const updatedRentData = {
        ...rentRecord,
        status: newStatus,
        paidAt: newStatus === "Paid" ? new Date().toISOString() : ""
      };

      await updateRent(userId, rentRecord.firebaseId, updatedRentData);
      toast.success(`Rent marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating rent status:", error);
      toast.error("Failed to update rent status");
    }
  };

  const handleCreateAndToggle = async (userId, month, monthlyRent) => {
    try {
      const newRentData = {
        month: month,
        amount: monthlyRent,
        status: "Paid",
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      await addRent(userId, newRentData);
      toast.success("Rent record created and marked as paid");
    } catch (error) {
      console.error("Error creating rent record:", error);
      toast.error("Failed to create rent record");
    }
  };

  const tableData = data.map(rent => {
    const user = rent.user;
    const rentHistory = rent.rents;
    
    const latestRent = rentHistory.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    const monthStatus = {};
    const monthRentRecords = {};
    months.forEach(({ label }) => {
      const monthRents = rentHistory.filter(rent => 
        rent.month.toLowerCase() === label
      );
      
      monthStatus[label] = monthRents.some(rent => rent.status === "Paid");
      monthRentRecords[label] = monthRents[0];
    });

    const totalPaid = rentHistory.reduce((sum, r) => {
      return sum + (r.status === "Paid" ? Number(r.amount || 0) : 0);
    }, 0);

    return {
      userId: user.id,
      name: user.fullName,
      department: user.role,
      monthlyRent: latestRent?.amount || 0,
      totalPaid: totalPaid,
      monthStatus,
      monthRentRecords
    };
  });

  return (
    <div className="bg-white mt-4 rounded-lg border border-gray-300">
      <h2 className="text-xl font-semibold p-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 text-gray-500 font-medium border-b border-b-gray-300">Name</th>
              <th className="text-left p-3 text-gray-500 font-medium border-b border-b-gray-300">Department</th>
              <th className="text-left p-3 text-gray-500 font-medium border-b border-b-gray-300">Monthly Rent</th>
              <th className="text-left p-3 text-gray-500 font-medium border-b border-b-gray-300">Total Paid</th>
              {months.map(({ label }) => (
                <th key={label} className="text-center text-gray-500 font-medium p-3 capitalize border-b border-b-gray-300">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((person, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3 border-b border-b-gray-300 font-medium">{person.name}</td>
                <td className="p-3 border-b border-b-gray-300">{person.department}</td>
                <td className="p-3 border-b border-b-gray-300">${person.monthlyRent}</td>
                <td className="p-3 border-b border-b-gray-300 text-blue-600">${person.totalPaid}</td>
                {months.map(({ label }) => {
                  const rentRecord = person.monthRentRecords[label];
                  const isPaid = person.monthStatus[label];
                  const isCurrentMonth = label === months[0].label; 
                  
                  return (
                    <td
                      key={label}
                      className="p-3 text-center border-b border-b-gray-300"
                    >
                      {rentRecord ? (
                        <button
                          onClick={() => handleStatusToggle(person.userId, label, rentRecord.status, rentRecord)}
                          className="focus:outline-none"
                        >
                          {isPaid ? (
                            <CheckCircle className="text-green-500 w-5 h-5 inline hover:text-green-600" />
                          ) : (
                            <Circle className="text-red-500 w-5 h-5 inline hover:text-red-600" />
                          )}
                        </button>
                      ) : isCurrentMonth ? (
                        <button
                          onClick={() => handleCreateAndToggle(person.userId, label, person.monthlyRent)}
                          className="focus:outline-none"
                        >
                          <Circle className="text-gray-400 w-5 h-5 inline hover:text-gray-500" />
                        </button>
                      ) : (
                        <Circle className="text-gray-300 w-5 h-5 inline" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
