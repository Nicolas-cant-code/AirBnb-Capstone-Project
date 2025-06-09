import React from "react";

const Input = ({ slot, styles, type, placeholder }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 text-indigo-500">
      <label className="fs-7 md:fs-6">{slot}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-2 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder || slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
        />
      )}
    </div>
  );
};

export default Input;
