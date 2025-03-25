const Verification = () => {
  return (
    <>
      <div className="w-100 mb-">
        <label className="fw-bold mb-1">Transaction Date</label>
        <input type="date" className="form-control" />
      </div>
      <div className="btn-container mt-3 text-center">
        <button className="btn-default btn w-100 mb-5">
          <i className="fa fa-check" aria-hidden="true"></i> Verify
        </button>
      </div>
    </>
  );
};

export default Verification;
