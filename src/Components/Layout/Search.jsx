import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 lg:w-75 d-flex justify-self-center pb-5">
      <div className="d-flex flex-coloumn align-items-center justify-content-between bg-white text-dark py-1 px-3 rounded-50 w-100">
        <div className="border-right ps-1 sm:ps-3 d-flex align-items-center gap-1 md:gap-4 cursor-pointer">
          <div className="d-flex flex-column">
            <span className="fw-semibold fs-7">Hotels</span>
            <p className="text-light-grey mb-0">Select Hotel</p>
          </div>
          <div className="md:block hidden">
            <KeyboardArrowDownIcon
              className="text-light-grey p-2 rounded-xs hover:bg-gray-200 rounded icon-hover"
              style={{
                boxSizing: "content-box",
              }}
            />
          </div>
        </div>
        <div className="border-l-2 border-gray-300/40 pl-4 lg:pl-8 cursor-pointer">
          <span className="fw-semibold fs-7">Check in</span>
          <p className="text-light-grey mb-0">Add date</p>
        </div>
        <div className="border-l-2 border-gray-300/40 pl-8 cursor-pointer">
          <span className="fw-semibold fs-7">Check out</span>
          <p className="text-light-grey mb-0">Add date</p>
        </div>
        <div className="border-l-2 border-gray-300/40 pl-8 cursor-pointer">
          <span className="fw-semibold fs-7">Guests</span>
          <p className="text-light-grey mb-0">Add guests</p>
        </div>
        <div style={{ marginRight: "-0.5rem" }}>
          <SearchIcon
            style={{ boxSizing: "content-box" }}
            className="cursor-pointer bg-danger rounded-circle p-3 text-white"
            onClick={() => navigate("/search")}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
