import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyType: "",
  bedroomCount: "",
  weeklyOrSaleValue: "",
  location: "",
  pincode: "",
  selectedPlan: "",
  selectedPurpose: "",
  selectedUserCommunication: "",
  isLegalReady: "",
  isAssistance: "",
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    updateDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
