import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/database/firebase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProgressStore = create(
  persist(
    (set, get) => ({
      progressGroups: [],
      loading: false,
      error: null,

      fetchAllUsersProgress: async () => {
        set({ loading: true, error: null });
        try {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const allUsersProgress = [];
      
          for (const userDoc of usersSnapshot.docs) {
            const userId = userDoc.id;
            const userData = userDoc.data();
      
            const userInfo = {
              id: userId,
              businessName: userData.businessName || "Unknown Business",
              createdAt: userData.createdAt || null, 
              email: userData.email || "No email",
              fullName: userData.fullName || "No name",
              incubatorType: userData.incubatorType || "Unknown",
              userType: userData.userType || "user",
            };
      
            const tasksSnapshot = await getDocs(
              collection(db, "users", userId, "assigned-tasks")
            );
      
            const tasks = tasksSnapshot.docs.map((taskDoc) => ({
              id: taskDoc.id,
              ...taskDoc.data(),
            }));
      
            allUsersProgress.push({
              user: userInfo,
              tasks: tasks, 
            });
          }
      
          set({ progressGroups: allUsersProgress, loading: false });
          return allUsersProgress;
        } catch (error) {
          console.error("Error fetching all users' progress:", error);
          set({ error, loading: false });
          throw error;
        }
      },

      updateTaskCompletion: async (userId, taskId, newCompletedStatus) => {
        try {
          const taskRef = doc(db, "users", userId, "assigned-tasks", taskId);
          await updateDoc(taskRef, {
            completed: newCompletedStatus,
          });
          await get().fetchAllUsersProgress();
        } catch (error) {
          console.error("Error updating task completion:", error);
          throw error;
        }
      },

      addTask: async (userId, taskData) => {
        try {
          const tasksRef = collection(db, "users", userId, "assigned-tasks");
          const newTaskRef = await addDoc(tasksRef, {
            completed: false,
            createdAt: Timestamp.now(),
            notes: taskData.notes || "",
            section: taskData.section,
            title: taskData.title
          });
          
          await get().fetchAllUsersProgress();
          return { 
            id: newTaskRef.id,
            completed: false,
            createdAt: Timestamp.now(),
            notes: taskData.notes || "",
            section: taskData.section,
            title: taskData.title
          };
        } catch (error) {
          console.error("Error adding task:", error);
          throw error;
        }
      },

      editTask: async (userId, taskId, taskData) => {
        try {
          const taskRef = doc(db, "users", userId, "assigned-tasks", taskId);
          await updateDoc(taskRef, {
            notes: taskData.notes || "",
            section: taskData.section,
            title: taskData.title
          });
          
          await get().fetchAllUsersProgress();
          return { 
            id: taskId,
            notes: taskData.notes || "",
            section: taskData.section,
            title: taskData.title
          };
        } catch (error) {
          console.error("Error editing task:", error);
          throw error;
        }
      },

      deleteTask: async (userId, taskId) => {
        try {
          const taskRef = doc(db, "users", userId, "assigned-tasks", taskId);
          await deleteDoc(taskRef);
          await get().fetchAllUsersProgress();
        } catch (error) {
          console.error("Error deleting task:", error);
          throw error;
        }
      },
      
    }),
    {
      name: "progress-storage",
    }
  )
);

export default useProgressStore;

  