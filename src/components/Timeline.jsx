import { useContext } from "react";
import LanguageContext from "../context/Global/language-context";

const Timeline = ({ selectedId = 1 }) => {
  const { language } = useContext(LanguageContext);

  const lang = language?.data[9]?.timeline;

  const steps =
    typeof lang === "object"
      ? Object.entries(lang).map(([key, value], index) => ({
          id: index + 1,
          label: value,
        }))
      : [];

  console.log("timeline", steps);
  return (
    <div className="d-flex justify-content-between align-items-center px-2 mb-4 position-relative">
      <div className="intersection">
        <div className="child"></div>
      </div>
      {steps.map((step) => (
        <div className="d-flex align-items-center flex-column" key={step.id}>
          <div className={`steps ${step.id === selectedId ? "active" : ""}`}>
            {step.id}
          </div>
          <div className="">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
