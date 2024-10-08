import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload.name;
      state.number = action.payload.number;
    },
  },
});

export default { actions: filtersSlice.actions, reducer: filtersSlice.reducer };
