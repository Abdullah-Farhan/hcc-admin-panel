import { CheckCircle, Circle } from "lucide-react";

const HistoryTable = ({ data }) => {
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

  const tableData = data.map(rent => {
    const user = rent.user;
    const rentHistory = rent.rents;
    
    // Get the most recent rent amount
    const latestRent = rentHistory.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    const monthStatus = {};
    months.forEach(({ label }) => {
      // Check all rent records for this month
      const monthRents = rentHistory.filter(rent => 
        rent.month.toLowerCase() === label
      );
      
      // If any rent record for this month is Paid, show checkmark
      monthStatus[label] = monthRents.some(rent => rent.status === "Paid");
    });

    const totalPaid = rentHistory.reduce((sum, r) => {
      return sum + (r.status === "Paid" ? Number(r.amount || 0) : 0);
    }, 0);

    return {
      name: user.fullName,
      department: user.role,
      monthlyRent: latestRent?.amount || 0,
      totalPaid: totalPaid,
      ...monthStatus
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
                {months.map(({ label }) => (
                  <td
                    key={label}
                    className="p-3 text-center border-b border-b-gray-300"
                  >
                    {person[label] ? (
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
