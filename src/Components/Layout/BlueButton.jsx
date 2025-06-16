import React from "react";

const BlueButton = ({ slot, styles, table, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-indigo-700 ${
        table ? "py-0" : "py-3"
      } h-[60px] bg-indigo-600 rounded-3 text-white ${styles}`}
    >
      {slot}
    </button>
  );
};

export default BlueButton;
