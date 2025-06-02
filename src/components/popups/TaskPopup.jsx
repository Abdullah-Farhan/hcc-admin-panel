import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const TaskPopup = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.title);
    } else {
      setTaskName("");
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (taskName.trim() === "") return;
    
    const taskData = {
      title: taskName.trim(),
      notes: ""
    };
    
    onSubmit(taskData);
    setTaskName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">
            {taskToEdit ? "Edit Task" : "Add Task"}
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input
            type="text"
            placeholder="Enter task name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
