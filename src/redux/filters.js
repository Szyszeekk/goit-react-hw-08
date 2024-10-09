import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "", // Dodano pole do filtrowania po numerze
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.name = action.payload;
    },
    setNumberFilter: (state, action) => {
      state.number = action.payload; // Dodano akcję do filtrowania po numerze
    },
  },
});

export default { actions: filtersSlice.actions, reducer: filtersSlice.reducer };
