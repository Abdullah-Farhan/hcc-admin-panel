"use client"
import { useState } from "react";
import AddResourcePopup from "@/components/popups/AddResourcePopup";
import { resources } from "@/lib/dashboardData";
import ResourceCard from "@/components/cards/ResourceCard";
import { toast } from "react-toastify";

const page = () => {
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [resourceData, setResources] = useState(resources);

  const onClose = () => {
    setIsResourceOpen(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 mt-5">
      <div className="flex justify-between">
        <p className="text-3xl font-light">Resources</p>
        <button
          onClick={() => setIsResourceOpen(true)}
          href={"/member-progress"}
          className="border border-gray-300 cursor-pointer rounded bg-gray-100 px-2 py-1 font-medium text-sm"
        >
          + Add Resource
        </button>
      </div>
      {resources.length > 0 ? (
        <div className="grid grid-cols-2 mt-2 gap-2">
          {resourceData.map((resource, index) => (
            <ResourceCard
              data={resource}
              key={index}
              onRemove={() => {
                setResources(resources.filter((_, i) => i !== index));
                toast.success("Resource Removed Successfully!");
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
      {isResourceOpen && <AddResourcePopup onClose={onClose} />}
    </div>
  );
};

export default page;
