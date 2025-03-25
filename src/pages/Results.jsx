import LogoContainer from "../components/LogoContainer";
import LogoImg from "../assets/images/okopdlogo.png";

const Results = () => {
  return (
    <div>
      <LogoContainer>
        <img src={LogoImg} alt="JBLMGH - OKOPD" />
      </LogoContainer>
      <div className="py-5 gap-2 qr-container transition-fade-in">
        <h2 className="d-flex justify-content-center align-self-center mb-4">
          Laboratory Results
        </h2>
        <>
          <div className="w-100 mb-2">
            <label className="fw-bold mb-1">Transaction Number</label>
            <input
              className="form-control"
              placeholder="Enter Patient Transaction Number..."
            />
          </div>
          <div className="btn-container mt-3 text-center">
            <button className="btn-default btn w-100 mb-2">
              <i className="fa fa-search" aria-hidden="true"></i> Search
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Results;
