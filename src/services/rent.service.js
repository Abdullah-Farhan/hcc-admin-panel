import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/database/firebase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRentStore = create(
  persist(
    (set, get) => ({
      rents: [],
      loading: false,
      error: null,

      fetchAllRents: async () => {
        set({ loading: true, error: null });
        try {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const allRents = [];

          for (const userDoc of usersSnapshot.docs) {
            const userId = userDoc.id;
            const userData = userDoc.data();

            const userInfo = {
              id: userId,
              fullName: userData.fullName || "No name",
              email: userData.email || "No email",
              role: userData.userType || "user",
              businessName: userData.businessName || "Unknown Business",
            };

            const rentsSnapshot = await getDocs(
              collection(db, "users", userId, "rents")
            );

            const rents = rentsSnapshot.docs.map((doc) => ({
              ...doc.data(),
              firebaseId: doc.id,
            }));

            allRents.push({
              user: userInfo,
              rents,
            });
          }

          set({ rents: allRents, loading: false });
          return allRents;
        } catch (error) {
          console.error("Error fetching rents:", error);
          set({ error, loading: false });
          throw error;
        }
      },

      addRent: async (userId, rentData) => {
        try {
          const rentsRef = collection(db, "users", userId, "rents");
          const newRentRef = await addDoc(rentsRef, {
            ...rentData,
            createdAt: rentData.createdAt || new Date().toISOString(),
            paidAt: rentData.paidAt || "",
            status: rentData.status || "Unpaid",
          });
          await get().fetchAllRents();
          return newRentRef.id;
        } catch (error) {
          console.error("Error adding rent:", error);
          throw error;
        }
      },

      updateRent: async (userId, firebaseRentId, updatedRentData) => {
        try {
          if (updatedRentData.isNew) {
            const { isNew, ...rentData } = updatedRentData;
            
            const rentsRef = collection(db, "users", userId, "rents");
            const newRentRef = await addDoc(rentsRef, rentData);
            
            const updatedRents = get().rents.map(rent => {
              if (rent.user.id === userId) {
                return {
                  ...rent,
                  rents: [...rent.rents, { ...rentData, firebaseId: newRentRef.id }]
                };
              }
              return rent;
            });
            
            set({ rents: updatedRents });
            return;
          }

          const rentDocRef = doc(db, "users", userId, "rents", firebaseRentId);
          await updateDoc(rentDocRef, updatedRentData);
          await get().fetchAllRents();
        } catch (error) {
          console.error("Error updating rent:", error);
          throw error;
        }
      },

      deleteRent: async (userId, firebaseRentId) => {
        try {
          const rentDocRef = doc(db, "users", userId, "rents", firebaseRentId);
          await deleteDoc(rentDocRef);
          await get().fetchAllRents();
        } catch (error) {
          console.error("Error deleting rent:", error);
          throw error;
        }
      },
    }),
    {
      name: "rent-storage",
    }
  )
);

export default useRentStore;
