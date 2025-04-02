import { useEffect, useState, useContext } from "react";
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

const Results = () => {
  const [activeTab, setActiveTab] = useState(2);
  const { patient: data } = useContext(PatientContext);
  const { language, selectLanguage } = useContext(LanguageContext);
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
          <Search language={language} />
        ) : activeTab === 2 ? (
          <Verification language={language} />
        ) : (
          <List language={language} />
        )}
      </div>
      <LanguageSelector />
      <Footer />
    </div>
  );
};

export default Results;
