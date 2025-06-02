"use client";
import React, { useState } from "react";
import ProgressCard from "@/components/cards/ProgressCard";
import useProgressStore from "@/services/progress.service";

const page = () => {
  const [selectedProgress, setSelectedProgress] = useState("Within 90 Days"); 
  const members = useProgressStore(state => state.progressGroups);

  return (
    <div className="px-8 py-10">
      <h1 className="text-3xl font-light">Member Progress</h1>
      <div className="bg-white rounded-lg w-full">
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

        <div className="mt-4 space-y-4 h-80 overflow-y-auto">
          {members
            .filter((member) =>
              member.tasks.some(task => task.section === selectedProgress)
            )
            .map((member, index) => (
              <ProgressCard key={index} data={member} checklist={true} selectedProgress={selectedProgress}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
