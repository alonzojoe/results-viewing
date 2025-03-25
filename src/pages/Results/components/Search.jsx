const Search = () => {
  return (
    <>
      <div className="w-100 mb-2">
        <label className="fw-bold mb-1">Transaction Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Patient Transaction Number..."
        />
      </div>
      <div className="btn-container mt-3 text-center">
        <button className="btn-default btn w-100 mb-5">
          <i className="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </>
  );
};

export default Search;
