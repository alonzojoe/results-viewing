import { useState } from "react";
import LogoContainer from "../components/LogoContainer";
import LogoImg from "../assets/images/okopdlogo.png";

import Timeline from "./../components/Timeline";

const Results = () => {
  const [activeTab, setActiveTab] = useState(3);
  return (
    <div>
      <LogoContainer>
        <img src={LogoImg} alt="JBLMGH - OKOPD" />
      </LogoContainer>
      <div className="py-5 gap-2 qr-container transition-fade-in">
        <h2 className="d-flex justify-content-center align-self-center mb-4">
          Laboratory Results
        </h2>
        <Timeline selectedId={activeTab} />
        <hr />
        {activeTab === 1 ? (
          <>
            <div className="w-100 mb-2">
              <label className="fw-bold mb-1">Transaction Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Patient Transaction Number..."
              />
            </div>
            <div className="btn-container mt-3 text-center">
              <button className="btn-default btn w-100 mb-5">
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </button>
            </div>
          </>
        ) : activeTab === 2 ? (
          <>
            <div className="w-100 mb-">
              <label className="fw-bold mb-1">Transaction Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="btn-container mt-3 text-center">
              <button className="btn-default btn w-100 mb-5">
                <i className="fa fa-check" aria-hidden="true"></i> Verify
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-100 mb-">
              <h2 className="fs-5">List of available results</h2>
            </div>
            <div className="btn-container mt-3 text-center">
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
        )}
      </div>
    </div>
  );
};

export default Results;
