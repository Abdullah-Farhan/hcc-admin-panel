
const EventsCard = ({ title, events }) => (
  <div className="bg-white rounded-lg px-6 py-4 mt-6">
    <h2 className="text-2xl font-semibold mb-8">{title}</h2>
    <table className="w-full">
      <thead>
        <tr className="text-gray-600 text-left">
          <th className="pb-2 px-4 font-normal">Member Name</th>
          <th className="pb-2 px-4 font-normal">Date</th>
          <th className="pb-2 px-4 font-normal">Notes</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="p-4 text-sm font-medium">{event.memberName}</td>
            <td className="p-4 text-sm">{event.date}</td>
            <td className="p-4 text-sm">{event.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EventsCard;