const Instructions = ({ label }) => {
  return (
    <div className="ptype-container d-flex align-items-center transition-fade-in">
      <div className="ptype-btn-container">
        <div className="ptype-btn new">
          <div className="row">
            <i className="fas fa-qrcode col-4"></i>
            <span className="col-8 d-flex align-items-center">QR Code</span>
          </div>
        </div>
        <div className="ptype-btn old">
          <div className="d-flex">
            <i className="fas fa-t col-4"></i>
            <span className="col-8 d-flex align-items-center">
              {label?.transaction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
