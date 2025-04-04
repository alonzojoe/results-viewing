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
import SearchType from "./components/SearchType";

const Results = () => {
  const [payload, setPayload] = useState({
    activeTab: 1,
    type: null,
  });

  const { patient: data } = useContext(PatientContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (data.patient && !data.verified) {
      console.log(data.patient);
      setPayload((prev) => ({ ...prev, activeTab: 2 }));
    } else if (data.patient && data.verified) {
      setPayload((prev) => ({ ...prev, activeTab: 3 }));
    } else if (payload.type === 2) {
      setPayload((prev) => ({ ...prev, activeTab: 1 }));
    }
  }, [data, setPayload, payload.type]);

  const lang = language?.data[9]?.title;

  return (
    <div>
      <LogoContainer>
        <img src={LogoImg} alt="JBLMGH - OKOPD" />
      </LogoContainer>
      {payload.type === null ? (
        <SearchType onSelect={setPayload} />
      ) : (
        <div className="py-5 gap-2 qr-container transition-fade-in">
          <h2 className="d-flex justify-content-center align-self-center mb-4">
            {lang}
          </h2>
          <Timeline selectedId={payload.activeTab} />
          <hr />
          {payload.activeTab === 1 ? (
            <Search language={language} />
          ) : payload.activeTab === 2 ? (
            <Verification language={language} />
          ) : (
            <List language={language} />
          )}
        </div>
      )}

      <LanguageSelector />
      <Footer />
    </div>
  );
};

export default Results;
