
const AddEventTypePopup = ({ title = "Pit Sessions", onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h1 className="text-xl font-semibold mb-6 text-gray-800">
          Add {title}
        </h1>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Member Name</label>
            <input
              type="text"
              placeholder="Enter member name"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Notes</label>
            <textarea
              placeholder="Write any notes..."
              className="w-full rounded-lg border border-gray-300 p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventTypePopup;
