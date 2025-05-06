import { education as educationHours } from "@/lib/eventData";

const getProgressByMember = (records) => {
  const progress = {};
  records.forEach(({ memberName, hours }) => {
    progress[memberName] = (progress[memberName] || 0) + hours;
  });
  return progress;
};

const EducationCard = () => {
  const progress = getProgressByMember(educationHours);

  return (
    <div className="bg-white rounded-xl p-8 mt-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Education Hours Attendance
      </h2>
      <p className="mb-6 text-gray-600 text-base">
        Each member is expected to complete <strong>40 hours</strong> of
        education sessions.
      </p>

      <div className="mb-8 space-y-4">
        {Object.entries(progress).map(([member, hours]) => (
          <div key={member}>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>{member}</span>
              <span>{hours} / 40 hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((hours / 40) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Session History
      </h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Member Name</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Hours</th>
              <th className="px-4 py-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {educationHours.map((record, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {record.memberName}
                </td>
                <td className="px-4 py-3 text-gray-700">{record.date}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  {record.hours}
                </td>
                <td className="px-4 py-3 text-gray-600">{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EducationCard;
