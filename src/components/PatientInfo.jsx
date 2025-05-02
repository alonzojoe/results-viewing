const PatientInfo = ({ patient, label }) => {
  const { FullName, TransactionNo } = patient;
  return (
    <div className="mb-2">
      <div className="mt-2 alert alert-danger" role="alert">
        <p className="mb-0">
          <i className="fa-solid fa-triangle-exclamation"></i> If your results
          are not appearing below, it may be due to system restrictions that
          prevent some results from being available online. In such cases,
          please contact the JBLMGH Laboratory.
        </p>
      </div>
      <div>
        {label.patient} <span className="fw-semibold">{FullName}</span>
      </div>
    </div>
  );
};

export default PatientInfo;
