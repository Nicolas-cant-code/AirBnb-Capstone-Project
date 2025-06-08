import React from "react";

const GridField = ({ name, area }) => {
  return (
    <div className="flex flex-col mt-5 cursor-pointer">
      <span
        className={`fw-semibold ${
          area === "Show more" ? "border-b-2 w-22 fw-bold" : ""
        }`}
      >
        {name}
      </span>
      <span className="text-gray-400">{area === "Show more" ? "" : area}</span>
    </div>
  );
};

export default GridField;
