import { useRef, useState } from "react";
import QrScanner from "qr-scanner";
import Instructions from "../../../components/Instructions/Instructions";
import { Toast } from "../../../constants";
import PageLoader from "../../../components/PageLoader";
import useToggle from "./../../../hooks/useToggle";
const toast = new Toast();

const SearchType = ({ language, onSelect, onQRScan }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useToggle(false);
  const fileInputRef = useRef(null);
  const msg = language?.data[9]?.message;
  const label = language?.data[9];
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });

      const prefixes = ["IN", "OPD", "WLK", "ER"];

      if (result && prefixes.some((prefix) => result.data.includes(prefix))) {
        onQRScan(result.data);
        setTimeout(() => {
          onSelect((prev) => ({ ...prev, type: 1 }));
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          toast.message("error", "Invalid QR code", "top-end");
          onSelect((prev) => ({ ...prev, type: null }));
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("QR scan failed:", error);
      toast.message("error", "Error scanning QR code", "top-end");
      setLoading(false);
    }
  };

  const selecType = (type) => {
    if (type === "qr") {
      fileInputRef.current.click();
      return;
    }

    onSelect((prev) => ({ ...prev, type: 2 }));
  };

  return (
    <>
      {loading && <PageLoader />}
      {show ? (
        <Instructions label={label} />
      ) : (
        <div className="ptype-container d-flex align-items-center transition-fade-in">
          <div className="ptype-btn-container">
            <div className="ptype-btn new" onClick={() => selecType("qr")}>
              <div className="row">
                <i className="fas fa-qrcode col-4"></i>
                <span className="col-8 d-flex align-items-center">QR Code</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              className="d-none"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <div className="ptype-btn old" onClick={() => selecType("tn")}>
              <div className="d-flex">
                <i className="fas fa-t col-4"></i>
                <span className="col-8 d-flex align-items-center">
                  {label?.transaction}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-warning" onClick={() => setShow()}>
                <i
                  className="fa-solid fa-circle-info"
                  style={{ fontSize: "16px" }}
                ></i>{" "}
                Instructions
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchType;
