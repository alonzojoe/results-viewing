import { useContext, useMemo, useEffect, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";
import TitleContainer from "../../../components/TitleContainer";
import useFetch from "./../../../hooks/useFetch";
import Pagination from "../../../components/Pagination";
const PER_PAGE = 10;
const List = () => {
  const { patient: data } = useContext(PatientContext);
  const { patient } = data;
  const PatientHistoryID = patient[0]?.PatientHistoryID;
  const [results, loading, error] = useFetch(`/result/${PatientHistoryID}`);
  const [state, setState] = useState({
    display: [],
    currentPage: 1,
  });

  const totalPages = useMemo(() => {
    return results ? Math.ceil(results.length / PER_PAGE) : 0;
  }, [results]);

  const updateList = (page) => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    setState((prev) => ({
      ...prev,
      currentPage: page,
      display: results.slice(start, end),
    }));
  };

  const handlePageChange = (type) => {
    if (type === "prev" && state.currentPage > 1) {
      updateList(state.currentPage - 1);
    } else if (type === "next" && state.currentPage < totalPages) {
      updateList(state.currentPage + 1);
    }
  };

  const firstPage = () => updateList(1);
  const lastPage = () => updateList(totalPages);

  useEffect(() => {
    if (results) {
      updateList(state.currentPage);
    }
  }, [results, state.currentPage]);

  return (
    <>
      <TitleContainer title="List of available results" />
      {JSON.stringify(loading)}
      <div className="btn-container mt-3 text-center">
        {state.display &&
          state.display.map((r, index) => (
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
        <Pagination
          onFirstPage={firstPage}
          onHandlePage={handlePageChange}
          onLastPage={lastPage}
          currentPage={state.currentPage}
          lastPage={totalPages}
        />
      </div>
    </>
  );
};

export default List;
