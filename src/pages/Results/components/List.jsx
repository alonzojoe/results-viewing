import { useContext, useMemo, useEffect, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";
import TitleContainer from "../../../components/TitleContainer";
import useFetch from "./../../../hooks/useFetch";
import Pagination from "../../../components/Pagination";
import PatientInfo from "../../../components/PatientInfo";
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
      display: results
        .map((r, index) => ({ ...r, item_id: index + 1 }))
        .slice(start, end),
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
      <PatientInfo patient={patient[0]} />

      <TitleContainer title="List of available results" />
      <div className="btn-container mt-2 text-center">
        {loading ? (
          <div>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div>
            <p className="text text-danger">
              Something went wrong. <br /> Please try again later
            </p>
          </div>
        ) : (
          <table className="mb-3">
            <tbody>
              {state.display && state.display.length > 0 ? (
                state.display.map((r) => (
                  <tr key={r.id}>
                    <td className="p-1">{r.item_id}.</td>
                    <td className="p-1">
                      <span className="cursor-pointer">
                        <i
                          className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </td>
                    <td className="p-1 text-start">
                      <div>
                        <span className="cursor-pointer text-primary">
                          {r.description} <small>(Click to view)</small>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-danger" colSpan={3}>
                    <p>
                      Patient results have not been released yet. Please try
                      again later.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {state.display.length > 0 && (
          <Pagination
            onFirstPage={firstPage}
            onHandlePage={handlePageChange}
            onLastPage={lastPage}
            currentPage={state.currentPage}
            lastPage={totalPages}
          />
        )}
      </div>
    </>
  );
};

export default List;
