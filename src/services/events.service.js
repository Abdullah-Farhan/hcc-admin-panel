import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "@/database/firebase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEventsStore = create(
  persist(
    (set, get) => ({
      events: [],
      loading: false,
      error: null,

      fetchAllEvents: async () => {
        set({ loading: true, error: null });

        try {
          const eventsRef = collection(db, "events");
          const snapshot = await getDocs(eventsRef);

          const events = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          set({ events, loading: false });
          return events;
        } catch (error) {
          console.error("Error fetching events:", error);
          set({ error, loading: false });
          throw error;
        }
      },

      deleteEventById: async (id) => {
        try {
          await deleteDoc(doc(db, "events", id));
          const updatedEvents = get().events.filter((event) => event.id !== id);
          set({ events: updatedEvents });
        } catch (error) {
          console.error("Error deleting event:", error);
          set({ error });
          throw error;
        }
      },

      addEvent: async (eventData) => {
        try {
          const docRef = await addDoc(collection(db, "events"), eventData);
          const newEvent = { id: docRef.id, ...eventData };
          set({ events: [...get().events, newEvent] });
          return newEvent;
        } catch (error) {
          console.error("Error adding event:", error);
          set({ error });
          throw error;
        }
      },
    }),
    {
      name: "events-storage",
    }
  )
);

export default useEventsStore;
