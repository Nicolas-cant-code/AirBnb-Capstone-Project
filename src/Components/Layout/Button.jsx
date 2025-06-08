import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";

const Button = ({ slot, type, style }) => {
  return (
    <div
      className={`flex w-fit align-items-center rounded-50 px-3 py-2 cursor-pointer bg-gray-0 hover:scale-103 hover:text-red-600 fw-semibold text-gray-950 border-2 border-gray-400/5 transition-all duration-200 shadow-md hover:shadow-lg ${style}`}
    >
      {type === "filter" && (
        <div>
          <TuneIcon />
        </div>
      )}
      <button>{slot}</button>
      {type === "dropdown" && (
        <div className="pl-2">
          <KeyboardArrowDownIcon />
        </div>
      )}
    </div>
  );
};

export default Button;
