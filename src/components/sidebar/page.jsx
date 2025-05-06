"use client";
import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/lib/sidebarLinks";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
  const [activeTab, setActiveTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const handleTabChange = (item) => {
    setActiveTab(item.label);
    setIsOpen(false);
    router.push(item.path);
  };

  useEffect(() => {
    switch (path.toLowerCase()) {
      case "/dashboard":
        setActiveTab("Dashboard");
        break;
      case "/resources":
        setActiveTab("Resources");
        break;
      case "/member-progress":
        setActiveTab("Member Progress");
        break;
      case "/rent-tracker":
        setActiveTab("Rent Tracker");
        break;
      case "/event-tracking":
        setActiveTab("Event Tracking");
        break;
      default:
        setActiveTab("");
    }
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 md:w-64 w-0 bg-white
  border-r border-gray-300/50 flex flex-col h-screen
  transform transition-transform duration-300 ease-in-out z-50
  ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
  overflow-y-auto`}
      >
        <div className="p-6 flex items-center space-x-2">
          <div className="rounded-lg w-8 h-8 flex justify-center items-center text-white font-medium bg-primary">
            A
          </div>
          <p className="font-medium text-lg">Admin</p>
          <div className="absolute right-0 top-4 md:hidden flex justify-end px-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="px-4">
          <h1 className="text-xs text-gray-500 mb-2 mt-4">Main</h1>
          <div>
            {sidebarLinks.items.map((item, index) => (
              <div
                key={index}
                className={`flex items-center py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm mb-1 hover:text-black ${
                  activeTab === item.label
                    ? "bg-gray-200 text-primary font-normal"
                    : "text-black/80"
                }`}
                onClick={() => handleTabChange(item)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
