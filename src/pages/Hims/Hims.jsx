import React from "react";

const Hims = () => {
  return (
    <>
      <div className="py-5 gap-2 qr-container transition-fade-in">
        <h2 className="d-flex text-center justify-content-center align-self-center mb-4">
          {`Medical Certificate Appointment`}
        </h2>
        <div className="w-100 mb-2">
          <label className="fw-bold mb-1">{`Patient Hospital Number`} :</label>
          <input type="text" className="form-control" />
        </div>
        <div className="btn-container mt-3 text-center">
          <button
            //   ref={btnRef}
            className="btn-default btn w-100 mb-5"
            //   onClick={search}
            //   disabled={isLoading}
          >
            <i className="fa fa-search" aria-hidden="true"></i> {`Search`}
          </button>
        </div>
      </div>

      <div className="py-5 gap-2 qr-container transition-fade-in mt-5">
        <h2 className="d-flex text-center justify-content-center align-self-center mb-4">
          {`Select Transaction Type`}
        </h2>
        <table className="table table-border">
          <thead>
            <tr>
              <th>Select</th>
              <th>Transaction No</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 })
              .map((_, index) => index + 1)
              .map((data) => (
                <tr key={data}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>OPD-42025-1473050</td>
                  <td>April 5, 2025</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="btn-container mt-3 text-center">
          <button
            //   ref={btnRef}
            className="btn-default btn w-100 mb-5"
            //   onClick={search}
            //   disabled={isLoading}
          >
            {`Proceed`} <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div className="py-5 gap-2 qr-container transition-fade-in mt-5">
        <h2 className="d-flex text-center justify-content-center align-self-center mb-4">
          {`Booking of Appointment`}
        </h2>
        <div className="w-100 mb-2">
          <label className="fw-bold mb-1">{`Appointment Date`} :</label>
          <input type="date" className="form-control" />
        </div>
        {/* <div className="w-100 mb-2">
          <label className="fw-bold mb-1">{`Appointment Time`} :</label>
          <input type="time" className="form-control" />
        </div> */}
        <div className="btn-container mt-3 text-center">
          <button
            //   ref={btnRef}
            className="btn-default btn w-100 mb-5"
            //   onClick={search}
            //   disabled={isLoading}
          >
            <i className="fa fa-bookmark" aria-hidden="true"></i>{" "}
            {`Book an Appointment`}
          </button>
        </div>
      </div>
    </>
  );
};

export default Hims;
