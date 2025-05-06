const EventsCard = ({ title, events }) => (
  <div className="bg-white rounded-xl px-8 py-6 mt-6 shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>

    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-600 font-medium">
          <tr>
            <th className="px-4 py-3 text-left">Member Name</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {events.map((event, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-800">{event.memberName}</td>
              <td className="px-4 py-3 text-gray-700">{event.date}</td>
              <td className="px-4 py-3 text-gray-600">{event.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EventsCard;