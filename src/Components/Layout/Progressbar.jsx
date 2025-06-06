import React from "react";

const Progressbar = ({ progress }) => {
  return (
    <div className="w-[15vw] max-w-md">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`h-2 bg-black rounded-full`}
          style={{ width: `${(progress / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Progressbar;
