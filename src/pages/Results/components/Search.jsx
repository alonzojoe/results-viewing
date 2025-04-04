import { useContext, useRef, useState, useEffect } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";

const Search = ({ language, qrData }) => {
  const searchRef = useRef(null);
  const btnRef = useRef(null);
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

  console.log("search comp", language?.data[9]?.transaction);

  const labelTitle = language?.data[9]?.transaction;
  const btnTitle = language?.data[9]?.timeline["search"];

  useEffect(() => {
    if (qrData !== "") {
      console.log("Search component QR Content:", qrData);
      searchRef.current.value = qrData;
      btnRef.current.click();
    }
  }, [qrData]);
  return (
    <>
      <div className="w-100 mb-2">
        <label className="fw-bold mb-1">{labelTitle}</label>
        <input ref={searchRef} type="text" className="form-control" />
      </div>
      <div className="btn-container mt-3 text-center">
        <button
          ref={btnRef}
          className="btn-default btn w-100 mb-5"
          onClick={search}
          disabled={isLoading}
        >
          <i className="fa fa-search" aria-hidden="true"></i> {btnTitle}
        </button>
      </div>
    </>
  );
};

export default Search;
