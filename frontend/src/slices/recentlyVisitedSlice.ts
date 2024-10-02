import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getItem, setItem } from "../utils/helpers";
import { RecentlyVisitedState, RecentsState } from "../utils/types";

const initialState: RecentlyVisitedState = {
  recents: getItem("recentlyVisited") || [],
};

const recentlyVisitedSlice = createSlice({
  name: "recentlyVisited",
  initialState,
  reducers: {
    addVisitedItem: (state, action: PayloadAction<RecentsState>) => {
      const { id, title, type } = action.payload;
      const existingIndex = state.recents.findIndex(
        (item) => item.id === id && item.type === type
      );
      if (existingIndex !== -1) {
        state.recents.splice(existingIndex, 1);
      }
      state.recents.unshift({ id, title, type });
      if (state.recents.length > 3) {
        state.recents.pop();
      }
      setItem("recentlyVisited", state.recents);
    },
  },
});

export const { addVisitedItem } = recentlyVisitedSlice.actions;
export default recentlyVisitedSlice.reducer;
