"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import EventsCard from "@/components/cards/EventsCard";
import { events } from "@/lib/eventData";
import EducationCard from "@/components/cards/EducationCard";
import AddEventTypePopup from "@/components/popups/AddEventTypePopup";

const page = () => {
  const [selectedTab, setSelectedTab] = useState("Pit Sessions");
  const [addEventPopup, setAddEventPopup] = useState(false);

  const getFilteredEvents = () => {
    if (selectedTab === "Pit Sessions") {
      return events.filter(
        (event) => event.category === "Pit Sessions Attendance"
      );
    }
    if (selectedTab === "Chamber Events") {
      return events.filter(
        (event) => event.category === "Chamber Events Attendance"
      );
    }
    return [];
  };

  return (
    <div className="px-6 py-6 w-full">
      <h1 className="text-3xl font-light">Event Tracking</h1>
      <p className="text-gray-500 mt-1">
        Monitor member participation in pit sessions, chamber events, and
        education hours.
      </p>
      <div className="h-[1px] bg-gray-200 w-full mt-4"></div>

      <div className="flex flex-col md:flex-row w-full justify-between mt-6 space-y-2 md:space-y-0 md:space-x-2">
        <div className="p-1 rounded bg-gray-100 space-x-2 w-full md:w-auto flex">
          {[
            "Pit Sessions",
            "Chamber Events",
            "Education Hours"
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`rounded-lg px-2 py-1 text-sm font-medium cursor-pointer ${
                selectedTab === tab ? "text-black bg-white" : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button onClick={()=>setAddEventPopup(true)} className="flex items-center cursor-pointer bg-primary rounded-lg px-4 h-10 text-white w-full md:w-auto justify-center md:justify-start">
          <CirclePlus className="mr-2" width={16} /> Add Event
        </button>
      </div>

      {selectedTab === "Pit Sessions" && (
        <EventsCard title="Pit Sessions Attendance" events={getFilteredEvents()} />
      )}
      {selectedTab === "Chamber Events" && (
        <EventsCard title="Chamber Events Attendance" events={getFilteredEvents()} />
      )}
      {selectedTab === "Education Hours" && (
        <div className="mt-6"><EducationCard /></div>
      )}
      {addEventPopup && <AddEventTypePopup title={selectedTab} onClose={()=>setAddEventPopup(false)} />}
    </div>
  );
};

export default page;
