import React from "react";
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
    <div className="bg-white rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Education Hours Attendance</h2>
      <p className="mb-4 text- text-lg font-medium">
        Education Hours Progress (40 hours required)
      </p>
      <div className="mb-6 space-y-2">
        {Object.entries(progress).map(([member, hours]) => (
          <div key={member} className="mb-2">
            <div className="flex justify-between font-medium mb-2">
              <span>{member}</span>
              <span>
                {hours} / 40 hours
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (hours / 40) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <table className="w-full mt-6">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="p-2">Member Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Hours</th>
            <th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {educationHours.map((record, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="p-2 font-medium">{record.memberName}</td>
              <td className="p-2">{record.date}</td>
              <td className="p-2">{record.hours}</td>
              <td className="p-2">{record.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EducationCard;