import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface IUserStore {
  hydrated: boolean;
  loadingUserStated: boolean;
  loadingUserFinished: boolean;
  isLoggedIn: boolean;
  userId: null | string;
  email: null | string;
  verificationStatus: boolean | null;

  setHydrated(): void;
}

export const useUser = create<IUserStore>()(
  persist(
    immer((set) => ({
      hydrated: false,
      isLoggedIn: false,
      userId: null,

      email: null,
      verificationStatus: null,
      loadingUserStated: false,
      loadingUserFinished: false,

      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "user",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
