import React from "react";

function Avatar(props) {
  const { img, width = "100px", height = "100px" } = props;
  return (
    <div style={{ width, height, margin: "auto" }}>
      <img
        src={img}
        alt="Profile_pic"
        className="card-img-top rounded-circle"
      />
    </div>
  );
}

export default Avatar;
