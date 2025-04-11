import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Instructions = ({ label }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showText, setShowText] = useState(true); // Controls visibility of the <p> tag

  const driverObj = driver({
    popoverClass: "driverjs-theme",
    nextBtnText: "Next",
    prevBtnText: "Previous",
    onPopoverRender: (popover) => {
      const restartButton = document.createElement("button");
      restartButton.innerText = "Restart";
      popover.footerButtons.appendChild(restartButton);

      restartButton.addEventListener("click", () => {
        driverObj.drive(0);
      });
    },
    onStepChanged: (stepIndex) => {
      setCurrentStep(stepIndex);

      if (stepIndex === 2) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    },
    steps: [
      {
        element: "#selection-container",
        popover: {
          title: "Search Type",
          description: "Select between QR Code or Transaction Number",
        },
      },
      {
        element: "#qr",
        popover: {
          title: "QR Code",
          description: "Scan the QR Code to proceed.",
        },
      },
      {
        element: "#tr",
        popover: {
          title: "Transaction Number",
          description: "Enter the transaction number for verification.",
        },
      },
    ],
  });

  useEffect(() => {
    driverObj.drive(); // Start the guided tour
  }, []);

  return (
    <>
      <div
        className="ptype-container d-flex align-items-center transition-fade-in"
        id="selection-container"
      >
        <div className="ptype-btn-container pe-none">
          <div className="ptype-btn new pe-none" id="qr">
            <div className="row">
              <i className="fas fa-qrcode col-4"></i>
              <span className="col-8 d-flex align-items-center">QR Code</span>
            </div>
          </div>
          <div className="ptype-btn old pe-none" id="tr">
            <div className="d-flex">
              <i className="fas fa-t col-4"></i>
              <span className="col-8 d-flex align-items-center">
                {label?.transaction}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showText && <p id="info-text">This text will be hidden at Step 3</p>}
    </>
  );
};

export default Instructions;
