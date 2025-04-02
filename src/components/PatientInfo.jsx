const PatientInfo = ({ patient, label }) => {
  const { FullName, TransactionNo } = patient;
  return (
    <div className="mb-2">
      <div>
        {label.patient} <span className="fw-semibold">{FullName}</span>
      </div>
      <div>
        {label.transaction} <span className="fw-semibold">{TransactionNo}</span>
      </div>
    </div>
  );
};

export default PatientInfo;
