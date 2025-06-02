import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/database/firebase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useResourcesStore = create(
  persist(
    (set, get) => ({
      resourceCategories: [],
      resources: [],
      loading: false,
      error: null,

      fetchAllResources: async () => {
        set({ loading: true, error: null });

        try {
          const resourcesRef = collection(db, "resources");
          const snapshot = await getDocs(resourcesRef);

          const resources = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          set({ resources, loading: false });
          return resources;
        } catch (error) {
          console.error("Error fetching resources:", error);
          set({ error, loading: false });
          throw error;
        }
      },

      fetchAllResourceCategories: async () => {
        set({ loading: true, error: null });

        try {
          const categoriesRef = collection(db, "resource-categories");
          const snapshot = await getDocs(categoriesRef);

          const resourceCategories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          set({ resourceCategories, loading: false });
          return resourceCategories;
        } catch (error) {
          console.error("Error fetching resource categories:", error);
          set({ error, loading: false });
          throw error;
        }
      },

      addResource: async (resourceData) => {
        try {
          const docRef = await addDoc(
            collection(db, "resources"),
            resourceData
          );
          const newResource = { id: docRef.id, ...resourceData };
          set({ resources: [...get().resources, newResource] });
          return newResource;
        } catch (error) {
          console.error("Error adding resource:", error);
          set({ error });
          throw error;
        }
      },

      deleteResourceById: async (id) => {
        try {
          await deleteDoc(doc(db, "resources", id));
          const updatedResources = get().resources.filter(
            (res) => res.id !== id
          );
          set({ resources: updatedResources });
        } catch (error) {
          console.error("Error deleting resource:", error);
          set({ error });
          throw error;
        }
      },
    }),
    {
      name: "resources-storage",
    }
  )
);

export default useResourcesStore;
