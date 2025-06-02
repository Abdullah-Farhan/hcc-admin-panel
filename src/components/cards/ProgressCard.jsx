"use client";
import { useState, useEffect } from "react";
import { ListChecks, Plus } from "lucide-react";
import ProgressStatsPopup from "../popups/ProgressStatsPopup";
import { toast } from "react-toastify";
import useProgressStore from "@/services/progress.service";

const ProgressCard = ({ data, checklist = false, selectedProgress }) => {
  const [isListPopupOpen, setIsListPopupOpen] = useState(false);
  const [taskData, setTaskData] = useState(data?.tasks || []);
  const [progress, setProgress] = useState(0);
  const { updateTaskCompletion, progressGroups } = useProgressStore();

  // Update taskData when progressGroups changes
  useEffect(() => {
    const currentUserProgress = progressGroups.find(
      (group) => group.user.id === data?.user?.id
    );
    if (currentUserProgress) {
      setTaskData(currentUserProgress.tasks);
    }
  }, [progressGroups, data?.user?.id]);

  const filteredTasks = taskData?.filter(
    (task) => task?.section === selectedProgress
  );

  const onToggleTask = async (userId, task) => {
    try {
      await updateTaskCompletion(userId, task.id, !task.completed);
      toast.success("Task Status Updated");
    } catch (error) {
      console.error("Failed to toggle task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  };

  useEffect(() => {
    const completedTasks = filteredTasks?.filter((task) => task?.completed)?.length || 0;
    const totalTasks = filteredTasks?.length || 0;
    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    setProgress(newProgress);
  }, [taskData, selectedProgress]);

  const getProgressColor = (progress) => {
    if (progress < 50) return "bg-red-500";
    if (progress <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getProgressColorOpacity = (progress) => {
    if (progress < 50) return "bg-red-500/30 text-red-500";
    if (progress <= 75) return "bg-yellow-500/30 text-yellow-500";
    return "bg-green-500/30 text-green-500";
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm w-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-[#151C2D] font-semibold text-base">
              {data?.user?.fullName ?? "No Name"}
            </h2>
            <p className="text-sm text-[#6B7280]">{data?.user?.email ?? "No Email"}</p>
            <p className="text-xs text-gray-500">{data?.user?.businessName ?? "Unknown Business"}</p>
            <p className="text-xs text-gray-500">{data?.user?.incubatorType ?? "Unknown Incubator"}</p>
            <p className="text-xs text-gray-500">{data?.user?.userType ?? "User"}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <p
              className={`text-xs px-2 py-1 rounded-full h-6 font-medium ${getProgressColorOpacity(progress)}`}
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
                    {`${filteredTasks?.filter(task => task?.completed)?.length ?? 0}/${filteredTasks?.length ?? 0}`}
                  </span>
                </div>
                <Plus
                  onClick={() => setIsListPopupOpen(true)}
                  className="hover:bg-gray-100 border border-gray-400 rounded-lg cursor-pointer h-8 w-8 p-2"
                />
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-[#4B5563] mb-3">
          {filteredTasks?.[0]?.title ?? "No tasks yet"}
        </p>

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
            userId: data?.user?.id,
            name: data?.user?.fullName ?? "No Name",
            program: data?.program ?? "",
            tasks: filteredTasks ?? [],
          }}
          selectedProgress={selectedProgress}
          onClose={() => setIsListPopupOpen(false)}
          onToggleTask={onToggleTask}
        />
      )}
    </>
  );
};

export default ProgressCard;
