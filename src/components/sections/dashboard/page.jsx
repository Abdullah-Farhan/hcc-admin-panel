"use client";
import EventScheduler from "@/components/calenders/EventScheduler";
import { ExternalLink, UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProgressCard from "@/components/cards/ProgressCard";
import AddResourcePopup from "@/components/popups/AddResourcePopup";
import ResourceCard from "@/components/cards/ResourceCard";
import { toast } from "react-toastify";
import useDashboardStore from "@/services/dashboard.service";
import useResourcesStore from "@/services/resources.service";
import useProgressStore from "@/services/progress.service";

const page = () => {
  const [selectedProgress, setSelectedProgress] = useState("Within 90 Days");
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const resourceData = useResourcesStore(state => state.resources)
  const { fetchDashboardData } = useDashboardStore();
  const progressData = useProgressStore(state => state.progressGroups);
  console.log(progressData);
  

  const onClose = () => {
    setIsResourceOpen(false);
  };

  const getDashboardData = async () => {
    await fetchDashboardData();    
  }
  useEffect(() => {
    getDashboardData()
  }, [])

  // Filter progress data based on selected progress type
  const filteredProgressData = progressData.filter((member) => {
    const tasks = member.tasks || [];
    const hasTasksInSection = tasks.some(task => task.section === selectedProgress);
    
    if (selectedProgress === "Within 90 Days") return hasTasksInSection;
    if (selectedProgress === "Within Graduation") return hasTasksInSection;
    if (selectedProgress === "Before Kitchen Use") return hasTasksInSection;
    return true;
  });

  return (
    <div className="px-8 py-10">
      <h1 className="text-3xl font-light">Dashboard</h1>
      <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-2 mt-4">
        <div className="h-full bg-white rounded-lg w-full lg:w-1/2 p-6">
          <EventScheduler />
        </div>
        <div className="h-full w-full lg:w-1/2">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between">
              <p className="text-xl font-light">Member Progress</p>
              <Link
                href={"/member-progress"}
                className="flex items-center cursor-pointer text-sm font-semibold"
              >
                View All <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="w-full flex space-x-2 rounded bg-gray-200 p-1 mt-6">
              <button
                className={`w-1/3 rounded cursor-pointer ${
                  selectedProgress === "Within 90 Days"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedProgress("Within 90 Days")}
              >
                90 Day
              </button>
              <button
                className={`w-1/3 rounded cursor-pointer ${
                  selectedProgress === "Within Graduation"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedProgress("Within Graduation")}
              >
                Graduation
              </button>
              <button
                className={`w-1/3 rounded cursor-pointer ${
                  selectedProgress === "Before Kitchen Use"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedProgress("Before Kitchen Use")}
              >
                Kitchen Use
              </button>
            </div>

            <div className="mt-4 space-y-4 max-h-72 overflow-auto">
              {filteredProgressData.length > 0 ? (
                filteredProgressData.map((member, index) => (
                  <ProgressCard 
                    key={index} 
                    data={member} 
                    selectedProgress={selectedProgress}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No members found for this progress type
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 mt-5">
            <div className="flex justify-between">
              <p className="text-xl font-light">Resources</p>
              <button
                onClick={() => setIsResourceOpen(true)}
                href={"/member-progress"}
                className="border border-gray-300 rounded bg-gray-100 px-2 py-1 font-medium text-sm"
              >
                + Add Resource
              </button>
            </div>
            {resourceData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2 max-h-56 overflow-auto">
                {resourceData.map((resource, index) => (
                  <ResourceCard
                    data={resource}
                    key={index}
                    onRemove={() => {
                      toast.success("Resource Removed Successfully!")
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="border border-gray-400 flex flex-col space-y-2 py-10 justify-center items-center rounded-lg mt-5">
                <UserPlus size={48} className="text-gray-400" />
                <p className="text-gray-500">No resources added yet</p>
                <button
                  onClick={() => setIsResourceOpen(true)}
                  className="text-[10px] rounded-lg bg-gray-100 cursor-pointer text-black font-medium border border-gray-400 px-4 py-2"
                >
                  Add New Resource
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isResourceOpen && <AddResourcePopup onClose={onClose} />}
    </div>
  );
};

export default page;
