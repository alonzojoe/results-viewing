import { useEffect, useRef, useState } from "react";
import { TourGuideClient } from "@sjmc11/tourguidejs/src/Tour";
import "@sjmc11/tourguidejs/src/scss/tour.scss";

const Instructions = ({ label }) => {
  const [tourStarted, setTourStarted] = useState(false);
  const infoTextRef = useRef(null);
  const tgInstanceRef = useRef(null);

  useEffect(() => {
    if (tourStarted) {
      tgInstanceRef.current = new TourGuideClient({
        nextBtnText: "Next",
        prevBtnText: "Previous",
        finishBtnText: "Finish",
        onFinish: () => {
          if (infoTextRef.current) infoTextRef.current.style.display = "block";
        },
        onBeforeStepChange: (step) => {
          console.log("step", step);
          if (step.currentStep === 1) {
            if (infoTextRef.current) infoTextRef.current.style.display = "none";
          } else {
            if (infoTextRef.current)
              infoTextRef.current.style.display = "block";
          }
        },
      });

      tgInstanceRef.current.start();
    }

    return () => {
      if (tgInstanceRef.current) {
        tgInstanceRef.current = null;
      }
    };
  }, [tourStarted]);

  useEffect(() => {
    setTimeout(() => {
      handleRestart();
    }, 200);
  }, []);

  const handleRestart = () => {
    setTourStarted(false);
    setTimeout(() => {
      setTourStarted(true);
    }, 200);
    if (infoTextRef.current) infoTextRef.current.style.display = "block";
  };

  return (
    <>
      <div
        className="ptype-container d-flex align-items-center transition-fade-in"
        id="selection-container"
        data-tg-title="Search Type"
        data-tg-tour="Select between QR Code or Transaction Number"
      >
        <div className="ptype-btn-container pe-none">
          <div
            className="ptype-btn new pe-none"
            id="qr"
            data-tg-title="QR Code"
            data-tg-tour="For the QR Code: Scan the Patient's QR in Charge Slip or Statement of Account"
          >
            <div className="row">
              <i className="fas fa-qrcode col-4"></i>
              <span className="col-8 d-flex align-items-center">QR Code</span>
            </div>
          </div>
          <div
            className="ptype-btn old pe-none"
            id="tr"
            data-tg-title="Transaction Number"
            data-tg-tour="Enter the Patient Transaction Number starting with (ER, OPD, WLK and IN)"
          >
            <div className="d-flex">
              <i className="fas fa-t col-4"></i>
              <span className="col-8 d-flex align-items-center">
                {label?.transaction}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-5 gap-2 qr-container transition-fade-in pe-none"
        data-tg-title="Verification"
        data-tg-tour="Next, verify the patient's transaction by selecting the transaction date from the date picker."
      >
        <h2 className="d-flex text-center justify-content-center align-self-center mb-4">
          Laboratory Results
        </h2>
        <div className="d-flex justify-content-between align-items-center px-2 mb-4 position-relative">
          <div className="intersection">
            <div className="child"></div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div className="steps">1</div>
            <div>Search</div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div className="steps active">2</div>
            <div>Verify</div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div className="steps">3</div>
            <div>Viewing</div>
          </div>
        </div>
        <hr />
        <div className="w-100 mb-">
          <label className="fw-bold mb-1">Transaction Date:</label>
          <input
            type="date"
            className="form-control"
            data-has-listeners="true"
          />
        </div>
        <div className="btn-container mt-3 text-center">
          <button className="btn-default btn w-100 mb-5">
            <i className="fa fa-check" aria-hidden="true"></i> Verify
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark btn-xs">
            <i className="fa fa-refresh"></i> Restart
          </button>
        </div>
      </div>

      <div className="py-5 gap-2 qr-container transition-fade-in">
        <h2 className="d-flex text-center justify-content-center align-self-center mb-4">
          Laboratory Results
        </h2>

        <div className="d-flex justify-content-between align-items-center px-2 mb-4 position-relative">
          <div className="intersection">
            <div className="child"></div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div className="steps">1</div>
            <div>Search</div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div className="steps">2</div>
            <div>Verify</div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div className="steps active">3</div>
            <div>Viewing</div>
          </div>
        </div>

        <hr />

        <div className="mb-2">
          <div>
            Patient <span className="fw-semibold">DELA CRUZ, JUAN BULAON</span>
          </div>
          <div>
            Transaction No <span className="fw-semibold">IN-32025-419339</span>
          </div>
        </div>

        <div className="w-100 mb-2">
          <h2 className="fs-6">List of available results:</h2>
        </div>

        <div className="btn-container mt-2 text-center">
          <table className="mb-3">
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td className="p-1">{index + 1}.</td>
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
                        {
                          [
                            "CBC, PC",
                            "ANTI BODY SCREENING",
                            "CROSSMATCHING FULLY AUTOMATED",
                            "PT (PROTIME)",
                            "NA (SODIUM)",
                            "K (POTASSIUM)",
                            "CREATININE (CREA)",
                            "CBC, PC",
                            "BLOOD UREA NITROGEN (BUN)",
                            "APTT",
                          ][index]
                        }{" "}
                        <small>(Click to view)</small>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 d-flex justify-items-end gap-1 mb-3">
            <button className="btn btn-sm btn-primary" disabled>
              First
            </button>
            <button className="btn btn-sm btn-primary" disabled>
              Previous
            </button>
            <button className="btn btn-sm btn-primary">Next</button>
            <button className="btn btn-sm btn-primary">Last</button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-dark btn-xs">
            <i className="fa fa-refresh"></i> Restart
          </button>
        </div>
      </div>
      {/* <p id="info-text" ref={infoTextRef}>
        This text will be hidden at Step 3
      </p>
      <button onClick={handleRestart} style={{ marginTop: "10px" }}>
        Restart Tour
      </button> */}
    </>
  );
};

export default Instructions;
