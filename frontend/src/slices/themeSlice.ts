import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../utils/types";

export interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: "LIGHT",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      (state.theme = action.payload),
        localStorage.setItem("theme", action.payload);
    },
    loadTheme: (state) => {
      const storedTheme = localStorage.getItem("theme") as ThemeType;
      if (storedTheme) {
        state.theme = storedTheme;
      }
    },
  },
});

export const { setTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
