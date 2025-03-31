const PatientInfo = ({ patient }) => {
  const { FullName, TransactionNo } = patient;
  return (
    <div className="mb-2">
      <div>
        Patient: <span className="fw-semibold">{FullName}</span>
      </div>
      <div>
        TransationNo: <span className="fw-semibold">{TransactionNo}</span>
      </div>
    </div>
  );
};

export default PatientInfo;
