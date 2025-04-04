import { createPortal } from "react-dom";

const PageLoader = () => {
  return createPortal(
    <div className="loader-backdrop">
      <div className="children">
        <div
          className="spinner-border fs-1 text-primary"
          style={{
            height: "8rem",
            width: "8rem",
          }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>,
    document.getElementById("overlay")
  );
};

export default PageLoader;
