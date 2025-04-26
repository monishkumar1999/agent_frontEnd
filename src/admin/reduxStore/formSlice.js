import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  formData: {
    aboutAgent: "",
    aboutAgency: "",
    NegotiationStyle: "",
    describes_agent: "",
    role: "",
    agency_name: "",
    Branch: "",
    location_Address: "",
    agencyType: "",
    services_provided: "",
    method_of_sale: "",
    buyer_agency_agreement: "",
    sales_team_count: "",
    postCode_cover: ["", "", "", ""],
    specialization: "",
    agent_work_type: "",
    videoCall_offer: "",
    videoCallTech: "",
    digital_solution: "",
    fees_structure: { min: "", max: "" },
    chargeType: "",
    fee: "",
  },
  errors: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateErrors: (state, action) => {
      state.errors = action.payload;
    },
    nextStep: (state) => {
      state.step = Math.min(state.step + 1, 2);
    },
    prevStep: (state) => {
      state.step = Math.max(state.step - 1, 0);
    },
    resetForm: () => initialState,
  },
});

export const { updateFormData, updateErrors, nextStep, prevStep, resetForm } = formSlice.actions;
export default formSlice.reducer;
