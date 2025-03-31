import { useContext, useRef, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";

const Search = () => {
  const searchRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { patient, dispatchPatient, searchPatient } =
    useContext(PatientContext);

  const search = async () => {
    if (searchRef.current.value.trim() === "") return;
    setIsLoading(true);
    await searchPatient({ transaction_no: searchRef.current.value });
    setIsLoading(false);
    searchRef.current.value = "";
  };

  return (
    <>
      <div className="w-100 mb-2">
        <label className="fw-bold mb-1">Transaction Number</label>
        <input
          ref={searchRef}
          type="text"
          className="form-control"
          placeholder="Enter Patient Transaction Number..."
        />
      </div>
      <div className="btn-container mt-3 text-center">
        <button
          className="btn-default btn w-100 mb-5"
          onClick={search}
          disabled={isLoading}
        >
          <i className="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </>
  );
};

export default Search;
