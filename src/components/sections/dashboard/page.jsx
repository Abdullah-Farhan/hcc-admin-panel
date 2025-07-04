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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProgressCardSkeleton = () => (
  <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white">
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Skeleton circle width={40} height={40} />
        <div>
          <Skeleton width={120} />
          <Skeleton width={80} />
        </div>
      </div>
      <Skeleton width={60} height={20} />
    </div>
    <div className="mt-4">
      <Skeleton height={8} count={3} />
    </div>
  </div>
);

const ResourceCardSkeleton = () => (
  <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white">
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <Skeleton circle width={20} height={20} />
        <div>
          <Skeleton width={150} />
          <Skeleton width={100} />
        </div>
      </div>
      <Skeleton width={60} />
    </div>
    <div className="mt-4 space-y-2">
      <Skeleton width={120} />
      <Skeleton width={140} />
      <Skeleton width={100} />
    </div>
  </div>
);

const page = () => {
  const [selectedProgress, setSelectedProgress] = useState("Within 90 Days");
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const resourceData = useResourcesStore(state => state.resources);
  const resourceLoading = useResourcesStore(state => state.loading);
  const progressLoading = useProgressStore(state => state.loading);
  const { fetchDashboardData, loading: dashboardLoading, initialized } = useDashboardStore();
  const progressData = useProgressStore(state => state.progressGroups);
  const { deleteResourceById } = useResourcesStore();

  const onClose = () => {
    setIsResourceOpen(false);
  };

  const handleRemove = async (id) => {
    try {
      await deleteResourceById(id);
      toast.success("Resource removed successfully!");
    } catch (error) {
      console.error("Error removing resource:", error);
      toast.error("Failed to remove resource. Please try again.");
    }
  };

  const getDashboardData = async () => {
    await fetchDashboardData();    
  }

  useEffect(() => {
    if (!initialized) {
      getDashboardData();
    }
  }, [initialized]);

  const filteredProgressData = progressData.filter((member) => {
    const tasks = member.tasks || [];
    const hasTasksInSection = tasks.some(task => task.section === selectedProgress);
    
    if (selectedProgress === "Within 90 Days") return hasTasksInSection;
    if (selectedProgress === "Within Graduation") return hasTasksInSection;
    if (selectedProgress === "Before Kitchen Use") return hasTasksInSection;
    return true;
  });
  
  if (!initialized || dashboardLoading) {
    return (
      <div className="px-8 py-10">
        <h1 className="text-3xl font-light">Dashboard</h1>
        <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-2 mt-4">
          <div className="h-full bg-white rounded-lg w-full lg:w-1/2 p-6">
            <Skeleton height={400} />
          </div>
          <div className="h-full w-full lg:w-1/2">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between">
                <Skeleton width={150} height={24} />
                <Skeleton width={80} height={24} />
              </div>
              <div className="w-full flex space-x-2 rounded bg-gray-200 p-1 mt-6">
                <Skeleton height={32} count={3} />
              </div>
              <div className="mt-4 space-y-4">
                {Array(3).fill(0).map((_, index) => (
                  <ProgressCardSkeleton key={index} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 mt-5">
              <div className="flex justify-between">
                <Skeleton width={100} height={24} />
                <Skeleton width={120} height={32} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
                {Array(4).fill(0).map((_, index) => (
                  <ResourceCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              {progressLoading ? (
                Array(3).fill(0).map((_, index) => (
                  <ProgressCardSkeleton key={index} />
                ))
              ) : filteredProgressData.length > 0 ? (
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
            {resourceLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2 max-h-56 overflow-auto">
                {Array(4).fill(0).map((_, index) => (
                  <ResourceCardSkeleton key={index} />
                ))}
              </div>
            ) : resourceData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2 max-h-56 overflow-auto">
                {resourceData.map((resource, index) => (
                  <ResourceCard
                    data={resource}
                    key={index}
                    onRemove={() => handleRemove(resource.id)}
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
