import { create } from "zustand";

interface PlayerSettingsStore {
    volume: number;
    repeatState: string;
    shuffleState: boolean;
    setVolume: (volume: number) => void;
    setRepeatState: (repeatState: string) => void;
    setShuffleState: (shuffleState: boolean) => void;
}

const usePlayerSettings = create<PlayerSettingsStore>((set) => ({
    volume: 1,
    repeatState: 'disable',
    shuffleState: false,
    setVolume: (volume) => set({ volume }),
    setRepeatState: (repeatState) => set({ repeatState }),
    setShuffleState: (shuffleState) => set({ shuffleState }),
}));

export default usePlayerSettings;