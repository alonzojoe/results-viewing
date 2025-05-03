import { useContext, useRef, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";

const Verification = ({ language }) => {
  const dateRef = useRef(null);
  const lnameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    patient: data,
    dispatchPatient,
    verifyTransaction,
    verified,
  } = useContext(PatientContext);

  // console.log("data", data);

  const verify = async () => {
    const { patient } = data;

    if (dateRef.current.value.trim() === "" || dateRef.current.value === null)
      return;
    setIsLoading(true);
    const bday = moment(dateRef.current.value).format("YYYY-MM-DD");
    await verifyTransaction({
      transaction_no: patient[0].PatientHistoryID,
      birthdate: bday,
      lastname: lnameRef.current.value,
    });
    setIsLoading(false);
    dateRef.current.value = null;
    lnameRef.current.value = null;
  };

  const labelTitle = language?.data[9]?.transaction_date;
  const btnTitle = language?.data[9]?.timeline["verification"];
  const labelLname = language?.data[9]?.timeline["lastname"];
  const labelBirthDate = language?.data[9]?.timeline["birthdate"];
  return (
    <>
      <div className="w-100 mb-3">
        <label className="fw-bold mb-1">{labelLname}</label>
        <input ref={lnameRef} type="text" className="form-control" />
      </div>
      <div className="w-100 mb-3">
        <label className="fw-bold mb-1">{labelBirthDate}</label>
        <input ref={dateRef} type="date" className="form-control" />
      </div>
      {/* <div className="w-100 mb-2">
        <label className="fw-bold mb-1">{labelTitle}</label>
        <input ref={dateRef} type="date" className="form-control" />
      </div> */}
      <div className="btn-container mt-3 text-center">
        <button
          className="btn-default btn w-100 mb-5"
          onClick={verify}
          disabled={isLoading}
        >
          <i className="fa fa-check" aria-hidden="true"></i> {btnTitle}
        </button>
      </div>
    </>
  );
};

export default Verification;
