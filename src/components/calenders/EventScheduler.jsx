"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { events } from "@/lib/dashboardData";
import { Clock } from "lucide-react";
import AddEventPopup from "../popups/AddEventPopup";

const EventScheduler = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isAddEventPopupOpen, setIsAddEventPopupOpen] = useState(false);

  const onAdd = (payload) => {
    events.push(payload);
  };

  const onRemove = (date, title) => {
    const eventIndex = events.findIndex(event => event.date === date && event.title === title);
    if (eventIndex !== -1) {
      events.splice(eventIndex, 1);
      setStartDate(new Date(startDate));
    }
  };

  const onClose = () => {
    setIsAddEventPopupOpen(false);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    console.log("Selected date:", date);
  };

  const formattedDate = startDate ? startDate.toDateString() : "Select a date";

  const selectedDate = startDate.toISOString().split("T")[0];

  const todaysEvents = events.filter((event) => event.date === selectedDate);

  return (
    <div>
      <div className="flex justify-between items-center h-full">
        <h2 className="font-light text-xl">Calender</h2>
        <button className="px-2 py-1 border rounded-lg border-gray-500 cursor-pointer hover:bg-gray-100" onClick={()=>setIsAddEventPopupOpen(true)}>
          + Add Event
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-4">Event Scheduler</h2>
      <div className="flex space-x-2">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          inline
          className="border rounded-lg p-2 w-full"
        />
        <div className="w-full rounded-lg ml-2 border border-gray-300 h-72">
          <h1 className="border-b border-b-gray-300 bg-gray-50 font-semibold p-4 rounded-t-lg">
            {formattedDate}
          </h1>
          <div className="p-4 overflow-auto max-h-56">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-2 mb-2"
                >
                  <div className="flex justify-between w-full">
                    <h2 className="font-normal flex text-sm">
                      {event.title}{" "}
                      <span className="text-gray-500 text-xs flex items-center mx-2">
                        {" "}
                        <span className="flex items-center">
                          {event.time ? (
                            <>
                              <Clock className="mr-2 w-3 h-3" /> {event.time}
                            </>
                          ) : (
                            "No Date"
                          )}
                        </span>
                      </span>
                    </h2>
                    <button 
                      className="text-[10px] text-gray-400 hover:bg-gray-100 cursor-pointer hover:text-red-400"
                      onClick={() => onRemove(event.date, event.title)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-gray-600">
                    {event?.description ? event.description : "No Description"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No events scheduled for this date.</p>
            )}
          </div>
        </div>
      </div>
      {isAddEventPopupOpen && <AddEventPopup onAdd={onAdd} onClose={onClose} selectedDate={startDate} />}
    </div>
  );
};

export default EventScheduler;
