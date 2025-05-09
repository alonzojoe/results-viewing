import { useContext, useMemo, useEffect, useState } from "react";
import { PatientContext } from "../../../context/Patient/patient-context";
import moment from "moment";
import TitleContainer from "../../../components/TitleContainer";
import useFetch from "./../../../hooks/useFetch";
import Pagination from "../../../components/Pagination";
import PatientInfo from "../../../components/PatientInfo";
const PER_PAGE = 10;
const List = ({ language }) => {
  const { patient: data } = useContext(PatientContext);
  const { patient } = data;
  console.log("patient", patient);
  const PatientID = patient[0]?.PatientID;
  const [results, loading, error] = useFetch(`/result/${PatientID}`);
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

  const labelPatient = language?.data[9]?.transaction;
  const btnTitle = language?.data[9]?.timeline["search"];

  const label = {
    patient: language?.data[9]?.patient,
    transaction: language?.data[9]?.transaction,
    list: language?.data[9]?.list,
    wrong: language?.data[9]?.wrong,
    notFound: language?.data[9]?.notFound,
  };

  const warningInfo = language?.data[9]?.listInfo;

  const viewResults = (docPath) => {
    let formattedPath = docPath.replace(/\\/g, "/");
    formattedPath = unescape(encodeURIComponent(formattedPath));

    // console.log(formattedPath);
    window.open(`../../../TRY${formattedPath}`);
  };

  return (
    <>
      <PatientInfo
        label={label}
        warningInfo={warningInfo}
        patient={patient[0]}
      />

      {!error && state.display.length > 0 && (
        <TitleContainer title={`${label.list}:`} />
      )}
      <div className="btn-container mt-2 text-center">
        {loading ? (
          <div className="mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="mt-3">
            <p className="text text-danger fw-bold">{label.wrong}</p>
          </div>
        ) : (
          <table className="mb-3">
            <tbody>
              {state.display && state.display.length > 0 ? (
                state.display.map((r) => (
                  <tr key={r.id}>
                    <td className="p-1">{r.item_id}.</td>
                    <td className="p-1">
                      <span
                        className="cursor-pointer"
                        onClick={() => viewResults(r.DocumentPath)}
                      >
                        <i
                          className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </td>
                    <td className="p-1 text-start">
                      <div onClick={() => viewResults(r.DocumentPath)}>
                        <span className="cursor-pointer text-primary">
                          {r.description} <small>(Click to view)</small>
                        </span>
                      </div>
                    </td>
                    <td className="p-1" colSpan={3}>
                      {r.RenderDate
                        ? moment(r.RenderDate).format("L")
                        : moment().format("L")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center fw-bolder text-danger" colSpan={3}>
                    <p>{label.notFound}</p>
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
      <div className="mb-2"></div>
    </>
  );
};

export default List;
