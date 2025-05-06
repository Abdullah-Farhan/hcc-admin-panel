import React, { useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash2, X } from 'lucide-react';
import TaskPopup from './TaskPopup';

const ProgressStatsPopup = ({ data, onClose, onEditTask, onDeleteTask, onToggleTask }) => {
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const completedCount = data.tasks.filter(task => task.completed).length;

  const openEditPopup = (task = null) => {
    setEditingTask(task);
    setIsTaskPopupOpen(true);
  };

  const handleTaskSubmit = (task) => {
    if (editingTask) {
      onEditTask(editingTask, task);
    } else {
      onEditTask(null, task);
    }
    setIsTaskPopupOpen(false);
    setEditingTask(null);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
        <div className="bg-white h-[500px] w-full max-w-md p-6 rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">
                {data.name}'s Subtasks
                <span className="text-sm text-gray-500 font-normal ml-2">
                  ({data.program} Program)
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                {completedCount}/{data.tasks.length} tasks completed
              </p>
            </div>
            <button onClick={onClose}>
              <X className="text-gray-500 hover:text-red-500" />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3 overflow-y-auto flex-1">
            {data.tasks.map((task, index) => (
              <div key={index} className="flex justify-between items-center border rounded px-4 py-2">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onToggleTask(task)}>
                  {task.completed ? (
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  ) : (
                    <Circle className="text-gray-400 w-4 h-4" />
                  )}
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.taskName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Pencil
                    className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer"
                    onClick={() => openEditPopup(task)}
                  />
                  <Trash2
                    className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => onDeleteTask(task)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-end space-x-2 items-center">
            <button
              onClick={onClose}
              className="text-sm hover:text-gray-600 cursor-pointer mr-4"
            >
              Close
            </button>
            <button
              className="px-4 py-2 text-sm bg-primary cursor-pointer hover:bg-blue-600 text-white rounded"
              onClick={() => openEditPopup(null)}
            >
              + Add Task
            </button>
          </div>
        </div>
      </div>

      {isTaskPopupOpen && (
        <TaskPopup
          isOpen={isTaskPopupOpen}
          onClose={() => setIsTaskPopupOpen(false)}
          onSubmit={handleTaskSubmit}
          taskToEdit={editingTask}
        />
      )}
    </>
  );
};

export default ProgressStatsPopup;
