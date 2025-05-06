"use client";
import React, { useState } from "react";
import { members } from "@/lib/dashboardData";
import ProgressCard from "@/components/cards/ProgressCard";

const page = () => {
  const [selectedProgress, setSelectedProgress] = useState("90 Days");
  return (
    <div className="px-8 py-10">
      <h1 className="text-3xl font-light">Member Progress</h1>
      <div className="bg-white rounded-lg w-full">
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

        <div className="mt-4 space-y-4 h-80">
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
              <ProgressCard key={index} data={member} checklist={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
