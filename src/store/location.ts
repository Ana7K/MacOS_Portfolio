import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type LocationWork = typeof locations.work;
type LocationAbout = typeof locations.about;
type LocationResume = typeof locations.resume;
type LocationTrash = typeof locations.trash;

type LocationTypes =
  | LocationWork
  | LocationAbout
  | LocationResume
  | LocationTrash;

type LocationState = {
  activeLocation: LocationTypes;
  setActiveLocation: (location: LocationTypes | undefined) => void;
  resetActiveLocation: () => void;
};

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;
