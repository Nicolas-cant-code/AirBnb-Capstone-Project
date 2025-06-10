import React from "react";

const Input = ({ slot, styles, type, placeholder, required }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 text-indigo-500">
      <label className="fs-7 md:fs-6 fw-semibold">{slot}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-2 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
          style={{ resize: "none" }}
          required={required}
        />
      ) : type === "file" ? (
        <input
          type={type || "file"}
          multiple={true}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}
          file:mr-4 file:py-2 file:px-4
         file:rounded-full file:border-0
         file:text-sm file:font-semibold
         file:bg-blue-50 file:text-blue-700
         hover:file:bg-blue-100"`}
          required={required}
        />
      ) : type === "select" ? (
        <select
          type={type || "text"}
          placeholder={placeholder || slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
          required={required}
        >
          <option value="" selected disabled></option>
          <option value="Home">Home</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Villa">Villa</option>
          <option value="Cottage">Cottage</option>
        </select>
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder || slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] outline-red-600 ${styles}`}
          required={required}
        />
      )}
    </div>
  );
};

export default Input;
