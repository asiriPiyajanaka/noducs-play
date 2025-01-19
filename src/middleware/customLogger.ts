import { Middleware } from "noducs";

// Generic Middleware for any state type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customLogger: Middleware<any> = (state, updater, next) => {
  console.log("🔄 Previous State:", state);
  next((updatedState) => {
    console.log("✅ Updated State:", updatedState);
    // Do not call `updater` here to avoid redundant updates
  });
};
