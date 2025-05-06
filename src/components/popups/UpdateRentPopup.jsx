import React, { useState } from "react";

const UpdateRentPopup = ({ user, onClose, onSave }) => {
  const [value, setValue] = useState(user.monthlyRent);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.name, Number(value));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-6">Update Monthly Rent</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Monthly Rent</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <span className="text-gray-400 mr-2">$</span>
              <input
                type="number"
                className="w-full outline-none"
                value={value}
                onChange={e => setValue(e.target.value)}
                min={0}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRentPopup;