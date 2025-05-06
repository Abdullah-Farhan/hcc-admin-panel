import React, { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

const months = ["may", "april", "march", "february", "january", "december"];

const HistoryTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  const toggleMonth = (index, month) => {
    const updated = [...tableData];
    updated[index][month] = !updated[index][month];
    updated[index].totalPaid = calculateTotal(updated[index]);
    setTableData(updated);
  };

  const calculateTotal = (person) => {
    return (
      months.filter((month) => person[month]).length *
      parseInt(person.monthlyRent)
    );
  };

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
              {months.map((month) => (
                <th key={month} className="text-center text-gray-500 font-medium p-3 capitalize border-b border-b-gray-300">
                  {month}
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
                {months.map((month) => (
                  <td
                    key={month}
                    className="p-3 text-center cursor-pointer border-b border-b-gray-300"
                    onClick={() => toggleMonth(index, month)}
                  >
                    {person[month] ? (
                      <CheckCircle className="text-green-500 w-5 h-5 inline" />
                    ) : (
                      <Circle className="text-red-500 w-5 h-5 inline" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
