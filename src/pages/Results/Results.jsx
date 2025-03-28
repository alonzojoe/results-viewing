import { useState } from "react";
import LogoContainer from "../../components/LogoContainer";
import LogoImg from "../../assets/images/okopdlogo.png";
import Timeline from "../../components/Timeline";
import Search from "./components/Search";
import Verification from "./components/Verification";
import List from "./components/List";

const Results = () => {
  const [activeTab, setActiveTab] = useState(1);
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
          <Search />
        ) : activeTab === 2 ? (
          <Verification />
        ) : (
          <List />
        )}
      </div>
    </div>
  );
};

export default Results;
