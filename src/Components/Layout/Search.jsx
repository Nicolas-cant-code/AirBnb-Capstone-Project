import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className="w-50 d-flex justify-self-center pb-5">
      <div className="d-flex flex-coloumn align-items-center justify-content-center gap-5 bg-white text-dark py-1 px-3 rounded-50">
        <div className="border-right ps-3">
          <span className="fw-semibold fs-7">Hotels</span>
          <p className="text-light-grey mb-0">Select Hotel</p>
        </div>
        <div className="border-right">
          <span className="fw-semibold fs-7">Check in</span>
          <p className="text-light-grey mb-0">Add date</p>
        </div>
        <div className="border-right">
          <span className="fw-semibold fs-7">Check out</span>
          <p className="text-light-grey mb-0">Add date</p>
        </div>
        <div className="pe-2">
          <span className="fw-semibold fs-7">Guests</span>
          <p className="text-light-grey mb-0">Add guests</p>
        </div>
        <div style={{ marginRight: "-0.5rem" }}>
          <SearchIcon
            style={{ boxSizing: "content-box" }}
            className="bg-danger rounded-circle p-3 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
