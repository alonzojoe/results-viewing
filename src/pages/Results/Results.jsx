import { useEffect, useState, useContext, useRef } from "react";
import LogoContainer from "../../components/LogoContainer";
import LogoImg from "../../assets/images/okopdlogo.png";
import Timeline from "../../components/Timeline";
import Search from "./components/Search";
import Verification from "./components/Verification";
import List from "./components/List";
import { PatientContext } from "../../context/Patient/patient-context";
import LanguageContext from "../../context/Global/language-context";
import LanguageSelector from "./components/LanguageSelector";
import Footer from "./components/Footer";
import jsQR from "jsqr";

const Results = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { patient: data } = useContext(PatientContext);
  const { language, selectLanguage } = useContext(LanguageContext);
  const fileInputRef = useRef(null);

  const [qrData, setQrData] = useState("");

  useEffect(() => {
    if (data.patient && !data.verified) {
      console.log(data.patient);
      setActiveTab(2);
    } else if (data.patient && data.verified) {
      setActiveTab(3);
    } else {
      setActiveTab(1);
    }
  }, [data]);

  const lang = language?.data[9]?.title;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          setQrData(qrCode.data);
        } else {
          setQrData("No QR code found.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div>
      <LogoContainer>
        <img src={LogoImg} alt="JBLMGH - OKOPD" />
      </LogoContainer>
      <div className="py-5 gap-2 qr-container transition-fade-in">
        <h2 className="d-flex justify-content-center align-self-center mb-4">
          {lang}
        </h2>
        <Timeline selectedId={activeTab} />
        <hr />
        {activeTab === 1 ? (
          <Search language={language} />
        ) : activeTab === 2 ? (
          <Verification language={language} />
        ) : (
          <List language={language} />
        )}
      </div>
      <div className="ptype-container d-flex align-items-center transition-fade-in">
        <div className="ptype-btn-container">
          <div className="ptype-btn new" onClick={handleButtonClick}>
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
          <p>QR Code Content: {qrData}</p>
          <div className="ptype-btn old">
            <div className="d-flex">
              <i className="fas fa-t col-4"></i>
              <span className="col-8 d-flex align-items-center">
                Transaction No
              </span>
            </div>
          </div>
        </div>
      </div>
      <LanguageSelector />
      <Footer />
    </div>
  );
};

export default Results;
