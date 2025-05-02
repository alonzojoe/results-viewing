import { useReducer, useContext } from "react";
import LanguageContext from "../Global/language-context";
import { ACTIONS } from "../../constants";
import { PatientContext } from "./patient-context";
import api from "../../services/api";
import Swal from "sweetalert2";
import { Toast } from "../../constants/index";

const toast = new Toast();

const initialState = {
  patient: null,
  patientHistoryIds: [],
  verified: false,
  results: [],
};

const patientReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PATIENT: {
      const { data } = action.payload;
      return { ...state, patient: data };
    }

    case ACTIONS.SET_PH: {
      const { data } = action.paylad;
      return { ...state };
    }

    case ACTIONS.SET_RESULTS: {
      const { data } = action.payload;
      return { ...state, results: data };
    }

    case ACTIONS.SET_VERIFIED: {
      return { ...state, verified: true };
    }

    default:
      return state;
  }
};

const PatientProvider = ({ children }) => {
  const [patient, dispatchPatient] = useReducer(patientReducer, initialState);
  const { language } = useContext(LanguageContext);

  const msg = language?.data[9]?.message;

  const searchPatient = async (params) => {
    try {
      const res = await api("/search", {
        params,
      });

      console.log("resss", res.data.data);

      dispatchPatient({
        type: ACTIONS.SET_PATIENT,
        payload: { data: await res.data.data },
      });

      toast.message("success", msg.proceed);
    } catch (error) {
      Swal.fire({
        title: "404",
        text: msg.errorSearch,
        icon: "error",
      });
    }
  };

  const verifyTransaction = async (params) => {
    try {
      const res = await api("/verify", {
        params,
      });

      if (!Array.isArray(res.data.data) || !res.data.data.length) {
        throw new Error("Error");
      }

      dispatchPatient({
        type: ACTIONS.SET_VERIFIED,
        payload: {},
      });

      toast.message("success", msg.verified);
    } catch (error) {
      console.log(error?.message);
      Swal.fire({
        title: "404",
        text: msg.errorVerify,
        icon: "error",
      });
    }
  };

  const patientValue = {
    patient,
    dispatchPatient,
    searchPatient,
    verifyTransaction,
  };

  return (
    <PatientContext.Provider value={patientValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
