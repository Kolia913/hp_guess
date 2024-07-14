import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StatsStoreState = {
  total: number;
  success: number;
  failed: number;
};

type StatsStoreActions = {
  guess: () => void;
  fail: () => void;
  reset: () => void;
};

export const useStatsStore = create<StatsStoreState & StatsStoreActions>()(
  persist(
    (set, get) => ({
      total: 0,
      success: 0,
      failed: 0,
      guess: () => {
        const total = get().total;
        const success = get().success;
        set(() => ({
          total: total + 1,
          success: success + 1,
        }));
      },
      fail: () => {
        const total = get().total;
        const failed = get().failed;
        set(() => ({
          total: total + 1,
          failed: failed + 1,
        }));
      },
      reset: () => {
        set(() => ({
          total: 0,
          success: 0,
          failed: 0,
        }));
      },
    }),
    {
      name: "statsStore",
      storage: createJSONStorage<StatsStoreState>(() => AsyncStorage),
    }
  )
);
