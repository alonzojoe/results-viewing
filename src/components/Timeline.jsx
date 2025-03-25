const STEPS = [
  {
    id: 1,
    label: "Search",
    isActive: true,
  },
  {
    id: 2,
    label: "Verification",
    isActive: false,
  },
  {
    id: 3,
    label: "Viewing",
    isActive: false,
  },
];

const Timeline = ({ selectedId = 1 }) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-2 mb-4 position-relative">
      <div className="intersection">
        <div className="child"></div>
      </div>
      {STEPS.map((step) => (
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
