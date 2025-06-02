"use client";
import { useState } from "react";
import AddResourcePopup from "@/components/popups/AddResourcePopup";
import ResourceCard from "@/components/cards/ResourceCard";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import useResourcesStore from "@/services/resources.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResourceCardSkeleton = () => (
  <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white w-full">
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

const Page = () => {
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const resourceData = useResourcesStore(state => state.resources);
  const loading = useResourcesStore(state => state.loading);
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

  return (
    <div className="px-8 py-10">
      <p className="text-3xl font-light">Resources</p>
      <div className="bg-white rounded-lg p-6 mt-5">
        <div className="flex justify-between">
          <p className="text-2xl font-light">Resources</p>
          <button
            onClick={() => setIsResourceOpen(true)}
            className="border border-gray-300 cursor-pointer rounded bg-gray-100 px-2 py-1 font-medium text-sm"
          >
            + Add Resource
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
          {loading ? (
            Array(4).fill(0).map((_, index) => (
              <ResourceCardSkeleton key={index} />
            ))
          ) : resourceData.length > 0 ? (
            resourceData.map((resource, index) => (
              <ResourceCard
                key={resource.id || index}
                data={resource}
                onRemove={() => handleRemove(resource.id)}
              />
            ))
          ) : (
            <div className="col-span-2 border border-gray-400 flex flex-col space-y-2 py-10 justify-center items-center rounded-lg mt-5">
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

        {isResourceOpen && <AddResourcePopup onClose={onClose} />}
      </div>
    </div>
  );
};

export default Page;
