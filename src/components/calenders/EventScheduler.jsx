"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from "lucide-react";
import AddEventPopup from "../popups/AddEventPopup";
import useEventsStore from "@/services/events.service";
import { toast } from "react-toastify";

const EventScheduler = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isAddEventPopupOpen, setIsAddEventPopupOpen] = useState(false);
  const events = useEventsStore((state) => state.events);
  const { addEvent, deleteEventById } = useEventsStore();

  const onAdd = async (payload) => {
    try {
      const res = await addEvent(payload);
      if (res?.id) {
        toast.success("Event Added Successfully.");
      } else {
        toast.error("Error Creating Event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Creating Event.");
    }
  };

  const onRemove = async (id) => {
    await deleteEventById(id)
    .then(() => {
      toast.success("Event Deleted Successfully.");
    })
    .catch((err) => {
      console.error(err);
      toast.error("Error Deleting Event.");
    })
  };

  const onClose = () => setIsAddEventPopupOpen(false);
  const handleDateChange = (date) => setStartDate(date);

  const formattedDate = startDate.toDateString();
  const selectedDate = startDate.toISOString().split("T")[0];
  const todaysEvents = events.filter((event) => event.date === selectedDate);

  return (
    <div className="bg-white px-2 py-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
        <button
          className="text-sm px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsAddEventPopupOpen(true)}
        >
          + Add Event
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:gap-2">
        <div className="custom-datepicker">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            inline
            dayClassName={(date) => {
              const isoDate = date.toLocaleDateString("en-CA");
              const isToday = new Date().toDateString() === date.toDateString();
              const hasEvent = events.some((event) => event.date === isoDate);
              return [
                hasEvent ? "has-event" : "",
                isToday ? "today-highlight" : "",
              ].join(" ");
            }}
          />
        </div>

        <div className="w-full border border-gray-300 rounded-lg mt-6 md:mt-0">
          <h1 className="p-4 border-b border-gray-300 font-semibold bg-gray-50 rounded-t-lg">
            {formattedDate}
          </h1>
          <div className="p-2 space-y-3 overflow-auto max-h-60">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium text-gray-800">
                      {event?.title}
                      {event?.startTime && (
                        <span className="ml-1 text-gray-500 text-xs inline-flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.startTime}
                        </span>
                      )}
                    </div>
                    <button
                      className="text-xs text-gray-400 hover:text-red-500 hover:underline"
                      onClick={() => onRemove(event?.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {event?.description || "No Description"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No events scheduled for this date.
              </p>
            )}
          </div>
        </div>
      </div>

      {isAddEventPopupOpen && (
        <AddEventPopup
          onAdd={onAdd}
          onClose={onClose}
          selectedDate={startDate}
        />
      )}
    </div>
  );
};

export default EventScheduler;
