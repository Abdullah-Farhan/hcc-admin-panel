"use client"
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useResourcesStore from "@/services/resources.service";

const AddResourcePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    title: "",
    corporation: "",
    categoryId: "",
    image: ""
  });

  const { addResource, resourceCategories, fetchAllResourceCategories } = useResourcesStore();

  useEffect(() => {
    if (resourceCategories.length === 0) {
      fetchAllResourceCategories();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addResource(formData)
      .then(() => {
        toast.success("Resource Added Successfully!");
      })
      onClose();
    } catch (error) {
      toast.error("Failed to add resource. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[520px] px-6 py-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-black">Add New Resource</h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-gray-600 cursor-pointer">×</button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corporation</label>
            <input name="corporation" value={formData.corporation} onChange={handleChange} placeholder="Enter corporation name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select category</option>
              {resourceCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Enter image URL" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="flex justify-end mt-10 space-x-3">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
          <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add Resource</button>
        </div>
      </div>
    </div>
  );
};

export default AddResourcePopup;
