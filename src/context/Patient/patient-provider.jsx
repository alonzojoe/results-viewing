import { useReducer } from "react";
import { ACTIONS } from "../../constants";
import { PatientContext } from "./patient-context";
import api from "../../services/api";

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

  const searchPatient = async (params) => {
    try {
      const res = await api("/search", {
        params,
      });
      dispatchPatient({
        type: ACTIONS.SET_PATIENT,
        payload: { data: await res.data.data },
      });
    } catch (error) {
      console.log(error?.message);
    }
  };

  const patientValue = {
    patient,
    dispatchPatient,
    searchPatient,
  };

  return (
    <PatientContext.Provider value={patientValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
