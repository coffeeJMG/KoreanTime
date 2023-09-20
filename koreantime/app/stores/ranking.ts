import { create } from "zustand";

type RankingsType = {
    [email: string]: number;
};

export interface RankingStore {
    updateRanking: RankingsType;
    setUpdateRanking: (ranking: RankingsType) => void;
}

export const useRankingStore = create<RankingStore>((set) => ({
    updateRanking: {},
    setUpdateRanking: (ranking: RankingsType) =>
        set({ updateRanking: ranking }),
}));
