"use client";
import { useState } from "react";
import { X } from "lucide-react";

const AddEventPopup = ({ onAdd, onClose, selectedDate }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toISOString().split("T")[0];
    onAdd({
      date: formattedDate,
      title: eventTitle,
      startTime: eventTime,
      description: eventDescription,
    });
    onClose();
  };

  return (
    <div className="w-full bg-black/30 h-screen fixed inset-0 flex justify-center items-center">
      <div className="bg-white rounded-lg min-w-sm p-6 py-3">
        <div className="flex justify-between w-full mb-4">
          <p className="font-semibold">Add New Event</p>
          <X
            className="w-3 cursor-pointer hover:text-black text-gray-400 h-3"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="eventTitle" className="text-sm font-medium">
            Event Title
          </label>
          <input
            type="text"
            id="eventTitle"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="border border-gray-300 focus:border-black rounded-lg py-2 mb-4 px-3 transition-colors"
            placeholder="Enter event title"
          />
          <label htmlFor="eventTime" className="text-sm font-medium">
            Time (Optional)
          </label>
          <input
            type="time"
            id="eventTime"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="border border-gray-300 focus:border-black rounded-lg py-2 mb-4 px-3 transition-colors"
          />
          <label htmlFor="eventDescription" className="text-sm font-medium">
            Description (Optional)
          </label>
          <input
            type="text"
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="border border-gray-300 focus:border-black rounded-lg py-2 mb-4 px-3 transition-colors"
            placeholder="Enter event description"
          />
          <div className="w-full flex justify-end space-x-2">
            <button
              type="submit"
              className="hover:text-black text-gray-600 rounded-lg cursor-pointer text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded-lg py-2 px-4 cursor-pointer text-sm"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventPopup;
