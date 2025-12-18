import {
  INITIAL_Z_INDEX,
  WINDOW_CONFIG,
  type windowConfigTypes,
} from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type windowConfigTypes = typeof WINDOW_CONFIG;
type windowKeyType = keyof typeof WINDOW_CONFIG;

interface WindowStore {
  windows: windowConfigTypes;
  nextZIndex: number;
  openWindow: (windowKey: windowKeyType, data: null) => void;
  closeWindow: (windowKey: windowKeyType) => void;
  focusWindow: (windowKey: windowKeyType) => void;
}

const useWindowStore = create<WindowStore, [["zustand/immer", never]]>(
  // lets us update immutable state as if it were mutable
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey, data) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
