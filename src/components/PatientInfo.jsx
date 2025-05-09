const PatientInfo = ({ patient, label, warningInfo }) => {
  const { FullName, TransactionNo } = patient;
  return (
    <div className="mb-2">
      <div className="mt-2 alert alert-danger" role="alert">
        <p className="mb-0">
          <i className="fa-solid fa-triangle-exclamation"></i> {warningInfo}
        </p>
      </div>
      <div>
        {label.patient} <span className="fw-semibold">{FullName}</span>
      </div>
    </div>
  );
};

export default PatientInfo;
