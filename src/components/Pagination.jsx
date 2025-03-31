const Pagination = ({
  onFirstPage,
  onHandlePage,
  onLastPage,
  currentPage,
  lastPage,
}) => {
  return (
    <div className="mt-2 d-flex justify-items-end gap-1">
      <button className="" onClick={onFirstPage} disabled={currentPage == 1}>
        First
      </button>
      <button
        className=""
        onClick={() => onHandlePage("prev")}
        disabled={currentPage == 1}
      >
        Previous
      </button>
      <button
        className=""
        onClick={() => onHandlePage("next")}
        disabled={currentPage == lastPage}
      >
        Next
      </button>
      <button
        className=""
        onClick={onLastPage}
        disabled={currentPage == lastPage}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
