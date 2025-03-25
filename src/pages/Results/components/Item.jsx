const Item = ({ result }) => {
  const viewResult = (path) => {
    window.open(`../../../TRY${path}`);
  };

  return (
    <div className="d-flex justify-content-between mb-2">
      <div>
        1.{" "}
        <span className="cursor-pointer">
          <i
            className="fa fa-file-pdf text-danger mx-1 mr-2 fs-5"
            aria-hidden="true"
          ></i>
          <span
            className="cursor-pointer text-primary fw-bold fs-6"
            onClick={() => viewResult(result.DocumentPath)}
          >
            {result.Description} <small>(Click to view)</small>
          </span>
        </span>
      </div>
      <div>
        <i className="fa fa-eye text-primary fs-5 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default Item;
