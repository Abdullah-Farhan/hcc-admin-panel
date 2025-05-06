"use client";
import { useState, useEffect } from "react";
import { ListChecks, Plus } from "lucide-react";
import ProgressStatsPopup from "../popups/ProgressStatsPopup";
import TaskPopup from "../popups/TaskPopup";

const ProgressCard = ({ data, checklist = false }) => {
  const [isListPopupOpen, setIsListPopupOpen] = useState(false);
  const [taskData, setTaskData] = useState(data.tasks);
  const [progress, setProgress] = useState(data.progress);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  useEffect(() => {
    // Calculate progress based on completed tasks
    const completedTasks = taskData.filter(task => task.completed).length;
    const totalTasks = taskData.length;
    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    setProgress(newProgress);
  }, [taskData]);

  const getProgressColor = (progress) => {
    if (progress < 50) return "bg-red-500";
    if (progress <= 75) return "bg-primary";
    return "bg-green-500";
  };

  const getProgressColorOpacity = (progress) => {
    if (progress < 50) return "bg-red-500/30 text-red-500";
    if (progress <= 75) return "bg-primary/30 text-primary";
    return "bg-green-500/30 text-green-500";
  };

  const handleEditTask = (task, editedTask) => {
    if (task) {
      // Editing existing task
      const updated = taskData.map((t) =>
        t.taskName === task.taskName ? { ...t, taskName: editedTask.taskName } : t
      );
      setTaskData(updated);
    } else {
      // Adding new task
      setTaskData([...taskData, editedTask]);
    }
  };

  const handleDeleteTask = (taskToDelete) => {
    const updated = taskData.filter((t) => t.taskName !== taskToDelete.taskName);
    setTaskData(updated);
  };

  const handleToggleTask = (taskToToggle) => {
    const updated = taskData.map((t) =>
      t.taskName === taskToToggle.taskName ? { ...t, completed: !t.completed } : t
    );
    setTaskData(updated);
  };
  

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm w-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-[#151C2D] font-semibold text-base">
              {data.name}
            </h2>
            <p className="text-sm text-[#6B7280]">{data.role}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p
              className={`text-xs px-2 py-1 rounded-full h-6 font-medium ${getProgressColorOpacity(
                progress
              )}`}
            >
              {progress}%
            </p>
            {checklist && (
              <>
                <div
                  className="px-2 py-1 cursor-pointer hover:bg-gray-100 border border-gray-300 rounded-lg flex items-center space-x-2"
                  onClick={() => setIsListPopupOpen(true)}
                >
                  <ListChecks className="text-gray-500" />
                  <span className="text-sm font-semibold text-black">
                    {
                      `${taskData.filter((task) => task.completed).length}/${
                        taskData.length
                      }`
                    }
                  </span>
                </div>
                <Plus onClick={() => setIsListPopupOpen(true)} className="hover:bg-gray-100 border border-gray-400 rounded-lg cursor-pointer h-8 w-8 p-2" />
              </>
            )}
          </div>
        </div>
        <p className="text-sm text-[#4B5563] mb-3">{data.currentTask}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {isListPopupOpen && (
        <ProgressStatsPopup
          data={{
            name: data.name,
            program: data.program,
            tasks: taskData,
          }}
          onClose={() => setIsListPopupOpen(false)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
        />
      )}
    </>
  );
};

export default ProgressCard;
