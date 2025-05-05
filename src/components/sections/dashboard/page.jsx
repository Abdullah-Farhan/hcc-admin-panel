"use client";
import EventScheduler from "@/components/calenders/EventScheduler";
import { ExternalLink, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { members } from "@/lib/dashboardData";
import ProgressCard from "@/components/cards/ProgressCard";
import AddResourcePopup from "@/components/popups/AddResourcePopup";
import { resources } from "@/lib/dashboardData";
import ResourceCard from "@/components/cards/ResourceCard";
import { toast } from "react-toastify";

const page = () => {
  const [selectedProgress, setSelectedProgress] = useState("90 Days");
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [resourceData, setResources] = useState(resources)

  const onClose = () => {
    setIsResourceOpen(false);
  };

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
                  selectedProgress === "90 Days"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedProgress("90 Days")}
              >
                90 Day
              </button>
              <button
                className={`w-1/3 rounded cursor-pointer ${
                  selectedProgress === "Graduation"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedProgress("Graduation")}
              >
                Graduation
              </button>
              <button
                className={`w-1/3 rounded cursor-pointer ${
                  selectedProgress === "Kitchen"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedProgress("Kitchen")}
              >
                Kitchen Use
              </button>
            </div>

            <div className="mt-4 space-y-4 max-h-72 overflow-auto">
              {members
                .filter((member) => {
                  if (selectedProgress === "90 Days")
                    return member.program === "90 Days";
                  if (selectedProgress === "Graduation")
                    return member.program === "Graduation Program";
                  if (selectedProgress === "Kitchen")
                    return member.program === "Before Kitchen Use";
                  return true;
                })
                .map((member, index) => (
                  <ProgressCard key={index} data={member} />
                ))}
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
            {resources.length > 0 ? (
              <div className="grid grid-cols-2 mt-2 gap-2 max-h-56 overflow-auto">
                {resourceData.map((resource, index) => (
                  <ResourceCard
                    data={resource}
                    key={index}
                    onRemove={() => {
                      setResources(resources.filter((_, i) => i !== index));
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
