import { useReducer } from "react";
import { ACTIONS } from "../../constants";
import { PatientContext } from "./patient-context";

const initialState = {
  patient: null,
  results: [],
};

const patientReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PATIENT: {
      const { data } = action.payload;
      return { ...state, patient: data };
    }

    case ACTIONS.SET_RESULTS: {
      const { data } = action.payload;
      return { ...state, results: data };
    }

    default:
      return state;
  }
};

const PatientProvider = ({ children }) => {
  const [patient, dispatchPatient] = useReducer(patientReducer, initialState);

  const patientValue = {
    patient,
    dispatchPatient,
  };

  return (
    <PatientContext.Provider value={patientValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
