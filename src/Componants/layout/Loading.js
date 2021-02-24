import React from "react";

function Loading() {
  return (
    <div className="loading">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ height: "150px", width: "150px" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
