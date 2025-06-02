import React, { useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import TaskPopup from './TaskPopup';
import { toast } from 'react-toastify';
import useProgressStore from '@/services/progress.service';

const ProgressStatsPopup = ({ data, onClose, onToggleTask, selectedProgress }) => {
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const { addTask, editTask, deleteTask } = useProgressStore();

  const completedCount = data?.tasks?.filter(task => task?.completed)?.length ?? 0;

  const openEditPopup = (task = null) => {
    setEditingTask(task);
    setIsTaskPopupOpen(true);
  };

  const handleTaskSubmit = async (taskData) => {
    setIsLoading(true);
    try {
      const formattedTaskData = {
        title: taskData.title || "",
        notes: taskData.notes || "",
        section: selectedProgress || ""
      };

      if (editingTask) {
        await editTask(data.userId, editingTask.id, formattedTaskData);
        toast.success("Task updated successfully");
      } else {
        await addTask(data.userId, formattedTaskData);
        toast.success("Task added successfully");
      }
      setIsTaskPopupOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (task) => {
    setLoadingTaskId(task.id);
    try {
      await deleteTask(data.userId, task.id);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleToggleTask = async (userId, task) => {
    setLoadingTaskId(task.id);
    try {
      await onToggleTask(userId, task);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const filteredTasks = selectedProgress != null
    ? data?.tasks?.filter(task => task?.section === selectedProgress)
    : data?.tasks;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
        <div className="bg-white h-[500px] w-full max-w-md p-6 rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">
                {data?.name ?? 'No Name'}'s Subtasks
                <span className="text-sm text-gray-500 font-normal ml-2">
                  ({data?.program ?? 'Unknown Program'} Program)
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                {completedCount}/{data?.tasks?.length ?? 0} tasks completed
              </p>
            </div>
            <button onClick={onClose} disabled={isLoading}>
              <X className="text-gray-500 hover:text-red-500" />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3 overflow-y-auto flex-1">
            {filteredTasks?.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center border rounded px-4 py-2">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer" 
                    onClick={() => handleToggleTask(data?.userId, task)}
                  >
                    {loadingTaskId === task.id ? (
                      <Loader2 className="w-4 h-4 shrink-0 animate-spin text-gray-400" />
                    ) : task?.completed ? (
                      <CheckCircle className="text-green-500 w-4 h-4 shrink-0" />
                    ) : (
                      <Circle className="text-gray-400 w-4 h-4 shrink-0" />
                    )}
                    <span className={`text-sm ${task?.completed ? 'line-through text-gray-400' : ''}`}>
                      {task?.title ?? 'Untitled Task'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Pencil
                      className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer"
                      onClick={() => openEditPopup(task)}
                      disabled={isLoading}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDeleteTask(task)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tasks match the selected section.</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-end space-x-2 items-center">
            <button
              onClick={onClose}
              className="text-sm hover:text-gray-600 cursor-pointer mr-4"
              disabled={isLoading}
            >
              Close
            </button>
            <button
              className="px-4 py-2 text-sm bg-primary cursor-pointer hover:bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              onClick={() => openEditPopup(null)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>+ Add Task</span>
              )}
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
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ProgressStatsPopup;
