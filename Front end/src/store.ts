import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { loadAuth } from "./utils/authStore";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      loggedIn: loadAuth(),
    },
  },
});

// sync redux state with localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("authState", JSON.stringify(state.auth.loggedIn));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;