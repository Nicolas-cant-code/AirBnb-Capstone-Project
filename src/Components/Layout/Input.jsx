import React, { useEffect, useState } from "react";

const Input = ({
  slot,
  styles,
  type,
  placeholder,
  id,
  required,
  onChange,
  value,
}) => {
  const [locationNames, setLocationNames] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch("/api/location/get/locations");
      const data = await response.json();
      setLocationNames(data);
    }
    fetchLocations();
  }, []);

  return (
    <div className="flex flex-col gap-2 mb-4 text-indigo-500">
      <label className="fs-7 md:fs-6 fw-semibold">{slot}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-2 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
          style={{ resize: "none" }}
          required={required}
          onChange={onChange}
          name={id || null}
          value={value}
        />
      ) : type === "file" ? (
        <input
          type={type || "file"}
          onChange={onChange}
          multiple={true}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}
          file:mr-4 file:py-2 file:px-4
         file:rounded-full file:border-0
         file:text-sm file:font-semibold
         file:bg-blue-50 file:text-blue-700
         hover:file:bg-blue-100"`}
          required={required}
          name={id || null}
          value={value}
        />
      ) : type === "select" ? (
        <select
          type={type || "text"}
          placeholder={placeholder || slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
          name={id || null}
          required={required}
          onChange={onChange}
          value={value}
        >
          <option value="" selected disabled></option>
          <option value="Home">Home</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Villa">Villa</option>
          <option value="Cottage">Cottage</option>
        </select>
      ) : type === "selectLocation" ? (
        <select
          type={type || "text"}
          placeholder={placeholder || slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] ${styles}`}
          name={id || null}
          required={required}
          onChange={onChange}
          value={value}
        >
          <option value="" selected disabled>
            Please Select
          </option>
          {locationNames.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type || "text"}
          onChange={onChange}
          placeholder={placeholder || slot || "Enter text here"}
          className={`text-black border-gray-700 border-2 p-3 rounded-2 w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] outline-red-600 ${styles}`}
          required={required}
          name={id || null}
          value={value}
          min={1}
          id={id || null}
        />
      )}
    </div>
  );
};

export default Input;
