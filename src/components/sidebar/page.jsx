"use client"
import React, { useState } from "react";
import { sidebarLinks } from "@/lib/sidebarLinks";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Dashboard"); 

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="w-64 bg-white min-h-screen flex flex-col border-r border-r-gray-300/50">
      <div className="p-6 flex items-center space-x-2">
        <div className="rounded-lg w-8 h-8 flex justify-center items-center text-white font-medium bg-primary">
          A
        </div>
        <p className="font-medium text-lg">Admin</p>
      </div>
      <div className="px-4">
        <h1 className="text-xs text-gray-500 mb-2 mt-4">Main</h1>
        <div>
          {sidebarLinks.items.map((item, index) => (
            <div
              key={index}
              className={`flex items-center py-2 px-1 rounded-md hover:bg-gray-100 cursor-pointer text-sm mb-1 hover:text-black ${
                activeTab === item.label ? "bg-gray-200 text-primary font-normal" : "text-black/80"
              }`}
              onClick={() => handleTabChange(item.label)} 
            >
              <item.icon className="w-4 h-4 mr-2" />
              <span>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;