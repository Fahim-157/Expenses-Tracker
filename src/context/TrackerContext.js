import { createContext, useContext } from "react";

const TrackerContext = createContext(null);

export const TrackerProvider = TrackerContext.Provider;
export default function useTracker() {
  return useContext(TrackerContext);
}