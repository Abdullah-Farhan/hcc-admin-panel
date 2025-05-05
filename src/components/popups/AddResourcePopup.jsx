import React, { useState } from "react";
import { toast } from "react-toastify";
import { resources as initialResources } from "@/lib/dashboardData";

const AddResourcePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    location: "",
    notes: ""
  });

  const [resourceData, setResources] = useState(initialResources);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) return toast.error("Name & Email are Required!");
    console.log(formData);
    toast.success("Resource Added Successfully!");
    setResources([...resourceData, formData]);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-30 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[520px] px-6 py-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-black">Add New Resource</h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-gray-600 cursor-pointer">×</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input name="position" value={formData.position} onChange={handleChange} placeholder="Enter position" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Enter department" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional information..." rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 cursor-pointer">Add Resource</button>
        </div>
      </div>
    </div>
  );
};

export default AddResourcePopup;