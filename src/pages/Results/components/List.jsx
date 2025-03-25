import TitleContainer from "../../../components/TitleContainer";
const List = () => {
  return (
    <>
      <TitleContainer title="List of available results" />
      <div className="btn-container mt-3 text-center">
        <div className="d-flex justify-content-between mb-2">
          <div>
            1.{" "}
            <span className="cursor-pointer">
              <i
                className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                aria-hidden="true"
              ></i>
              <span className="cursor-pointer text-primary fw-bold fs-6">
                CBC <small>(Click to view)</small>
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-eye text-primary fs-5 cursor-pointer"></i>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div>
            2.{" "}
            <span className="cursor-pointer">
              <i
                className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
                aria-hidden="true"
              ></i>
              <span className="cursor-pointer text-primary fw-bold fs-6">
                Potasium K <small>(Click to view)</small>
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-eye text-primary fs-5 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
