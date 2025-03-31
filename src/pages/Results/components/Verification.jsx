import { useContext, useRef, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";

const Verification = () => {
  const dateRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    patient: data,
    dispatchPatient,
    verifyTransaction,
    verified,
  } = useContext(PatientContext);

  console.log("data", data);

  const verify = async () => {
    const { patient } = data;

    if (dateRef.current.value.trim() === "" || dateRef.current.value === null)
      return;
    setIsLoading(true);
    const transDate = moment(dateRef.current.value).format("YYYY-MM-DD");
    await verifyTransaction({
      transaction_no: patient[0].PatientHistoryID,
      transaction_date: transDate,
    });
    setIsLoading(false);
    dateRef.current.value = null;
  };

  return (
    <>
      <div className="w-100 mb-">
        <label className="fw-bold mb-1">Transaction Date</label>
        <input ref={dateRef} type="date" className="form-control" />
      </div>
      <div className="btn-container mt-3 text-center">
        <button
          className="btn-default btn w-100 mb-5"
          onClick={verify}
          disabled={isLoading}
        >
          <i className="fa fa-check" aria-hidden="true"></i> Verify
        </button>
      </div>
    </>
  );
};

export default Verification;
