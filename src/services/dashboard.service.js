import { create } from "zustand";
import { persist } from "zustand/middleware";
import useEventsStore from "./events.service"; 
import useResourcesStore from "./resources.service";
import useProgressStore from "./progress.service";

const useDashboardStore = create(
  persist(
    (set, get) => ({
      loading: true,
      error: null,
      initialized: false,

      fetchDashboardData: async () => {
        try {
          set({ loading: true });

          const { fetchAllEvents } = useEventsStore.getState();
          await fetchAllEvents();

          const { fetchAllResources } = useResourcesStore.getState();
          await fetchAllResources();

          const { fetchAllUsersProgress } = useProgressStore.getState();
          await fetchAllUsersProgress();

          set({ loading: false, initialized: true });
        } catch (error) {
          set({ error, loading: false, initialized: true });
          console.error("Error fetching dashboard data:", error);
        }
      },
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({ initialized: state.initialized }),
    }
  )
);

export default useDashboardStore;
