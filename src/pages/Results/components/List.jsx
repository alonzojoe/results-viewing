import { useContext, useMemo, useRef, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";
import TitleContainer from "../../../components/TitleContainer";
import useFetch from "./../../../hooks/useFetch";
import Pagination from "../../../components/Pagination";
const LIMIT = 10;
const List = () => {
  const dateRef = useRef(null);
  const [paginated, setPaginated] = useState({
    currentPage: 1,
    display: [],
  });

  const { patient: data } = useContext(PatientContext);

  const { patient } = data;

  const PatientHistoryID = patient[0]?.PatientHistoryID;

  const [results, loading, error] = useFetch(`/result/${PatientHistoryID}`);
  console.log("res", results);

  const display = useMemo(() => {
    if (results) {
      return {
        lastpage: Math.ceil(results.length / LIMIT),
        display: results.slice(0, LIMIT),
      };
    }
    return {
      lastpage: 0,
      display: [],
    };
  }, [results]);

  return (
    <>
      <TitleContainer title="List of available results" />
      {JSON.stringify(loading)}
      <div className="btn-container mt-3 text-center">
        <pre>{JSON.stringify(display)}</pre>
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
        <Pagination />
      </div>
    </>
  );
};

export default List;
