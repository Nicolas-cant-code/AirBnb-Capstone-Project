import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";

const Button = ({ slot, type, style, href }) => {
  const navigate = useNavigate();
  const [openPrice, setOpenPrice] = useState(false);
  const [openType, setOpenType] = useState(false);

  const handlePriceDropdown = () => {
    setOpenPrice(!openPrice);
  };

  const handleTypeDropdown = () => {
    setOpenType(!openType);
  };

  document.addEventListener("click", (e) => {
    const target = e.target;
    const dropdown = document.getElementById("Type of place");

    const priceDropdown = document.getElementById("Price");
    if (dropdown && !dropdown.contains(target)) {
      setOpenType(false);
    }
    if (priceDropdown && !priceDropdown.contains(target)) {
      setOpenPrice(false);
    }
  });
  return (
    <div
      onClick={
        href
          ? () => navigate(href)
          : type === "dropdown"
          ? () => {
              if (slot == "Price") {
                handlePriceDropdown();
              } else {
                handleTypeDropdown();
              }
            }
          : null
      }
      className="relative"
    >
      <div
        className={`flex w-fit relative align-items-center rounded-50 px-3 py-2 cursor-pointer bg-gray-0 hover:scale-103 hover:text-red-600 fw-semibold text-gray-950 border-2 border-gray-400/5 transition-all duration-200 shadow-md hover:shadow-lg ${style}`}
        id={slot}
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
      {type === "dropdown" && slot !== "Price" && openType ? (
        <div className="absolute top-100 bg-gray-100 p-1 rounded-xl w-full left-0 text-center cursor-pointer fw-semibold z-10">
          <option
            value="Home"
            className="hover:bg-gray-200 hover:text-red-600 rounded-t-xl"
          >
            Home
          </option>
          <option
            value="Apartment"
            className="hover:bg-gray-200 hover:text-red-600"
          >
            Apartment
          </option>
          <option
            value="Condo"
            className="hover:bg-gray-200 hover:text-red-600"
          >
            Condo
          </option>
          <option
            value="Villa"
            className="hover:bg-gray-200 hover:text-red-600"
          >
            Villa
          </option>
          <option
            value="Cottage"
            className="hover:bg-gray-200 hover:text-red-600 rounded-b-xl"
          >
            Cottage
          </option>
        </div>
      ) : type === "dropdown" && slot === "Price" && openPrice ? (
        <div className="absolute top-100 bg-gray-100 p-1 rounded-xl w-fit left-0 text-center cursor-pointer fw-semibold z-10">
          <option
            value="0"
            className="hover:bg-gray-200 hover:text-red-600 rounded-t-xl"
          >
            R0 - R999
          </option>
          <option value="1000" className="hover:bg-gray-200 hover:text-red-600">
            R1000 - R1999
          </option>
          <option value="2000" className="hover:bg-gray-200 hover:text-red-600">
            R2000 - R2999
          </option>
          <option value="3000" className="hover:bg-gray-200 hover:text-red-600">
            R3000 - R3999
          </option>
          <option value="4000" className="hover:bg-gray-200 hover:text-red-600">
            R4000 - R4999
          </option>
          <option
            value="5000"
            className="hover:bg-gray-200 hover:text-red-600 rounded-b-xl"
          >
            R5000 +
          </option>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Button;
