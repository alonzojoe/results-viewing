import { useContext, useRef, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";
import TitleContainer from "../../../components/TitleContainer";
import useFetch from "./../../../hooks/useFetch";

const List = () => {
  const dateRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { patient: data } = useContext(PatientContext);

  const { patient } = data;

  const PatientHistoryID = patient[0]?.PatientHistoryID;

  const [results, loading, error] = useFetch(`/result/${PatientHistoryID}`);
  console.log("res", results);

  return (
    <>
      <TitleContainer title="List of available results" />
      {JSON.stringify(loading)}
      <div className="btn-container mt-3 text-center">
        {results &&
          results.map((r, index) => (
            <div className="d-flex justify-content-between mb-2" key={r.id}>
              <div>
                {index + 1}{" "}
                <span className="cursor-pointer">
                  <i
                    className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                    aria-hidden="true"
                  ></i>
                  <span className="cursor-pointer text-primary fw-bold fs-6">
                    {r.description} <small>(Click to view)</small>
                  </span>
                </span>
              </div>
              <div>
                <i className="fa fa-eye text-primary fs-5 cursor-pointer"></i>
              </div>
            </div>
          ))}
        <div className="d-flex justify-content-between mb-2">
          <div>
            1.{" "}
            <span className="cursor-pointer">
              <i
                className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                aria-hidden="true"
              ></i>
              <span className="cursor-pointer text-primary fw-bold fs-6">
                CBC <small>(Click to view)</small>
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-eye text-primary fs-5 cursor-pointer"></i>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div>
            2.{" "}
            <span className="cursor-pointer">
              <i
                className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                aria-hidden="true"
              ></i>
              <span className="cursor-pointer text-primary fw-bold fs-6">
                Potasium K <small>(Click to view)</small>
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-eye text-primary fs-5 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
