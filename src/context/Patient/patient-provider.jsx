import { useReducer } from "react";
import { ACTIONS } from "../../constants";
import { PatientContext } from "./patient-context";
import api from "../../services/api";
import Swal from "sweetalert2";

const initialState = {
  patient: null,
  verified: false,
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

    case ACTIONS.SET_VERIFIED: {
      return { ...state, verified: true };
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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Proceed to verification",
      });
    } catch (error) {
      console.log(error?.message);
      Swal.fire({
        title: "404 Not Found",
        text: "Patient not found. Please double-check the patient transaction number.",
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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Patient Transaction Date has been verified!",
      });
    } catch (error) {
      console.log(error?.message);
      Swal.fire({
        title: "404 Not Found",
        text: "Patient Transaction Date could not be verified.",
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
