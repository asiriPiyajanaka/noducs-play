import {
  createSliceState,
  //  storeManager
} from "noducs";
import { customLogger } from "../../../middleware/customLogger";
import { fetchUserAPI } from "./services/userAPI";

// 📝 Define State Interfaces
interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  role: string;
}

// 🛠️ Initial State
const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// 🌟 User State Slice with Auto-Generated Actions
const userSlice = createSliceState<UserState>({
  name: "user",
  initialState,
  asyncActions: (actionMap) => {
    actionMap.handleAction("fetchUser", async (state: UserState) => {
      state.loading = true;
      state.error = null;
      try {
        const data = await fetchUserAPI();
        state.data = data;
        state.loading = false;
        // storeManager.updateGlobalState(); //manual update
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        state.error = error.message || "Failed to fetch user data";
        state.loading = false;
      }
    });
  },
  middlewares: [customLogger],
  // globalUpdate: false, // Disable automatic updates
});

export const { use: useUser } = userSlice;
export const { fetchUser } = userSlice.asyncActions;

/** 🌟 Unified Selector Hook */
export const useUserSelector = <R>(selector: (state: UserState) => R): R => {
  return userSlice.select(selector);
};

export const useUserState = () => userSlice.use()[0];
