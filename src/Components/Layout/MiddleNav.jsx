import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const MiddleNav = ({ type }) => {
  return (
    <div>
      {type === "home" ? (
        <div className="d-flex gap-4" style={{ marginBottom: "-0.5rem" }}>
          <div className="d-flex flex-column align-items-center">
            <span style={{ marginBottom: "-1rem" }}>Places to stay</span>
            <span className="d-block">__</span>
          </div>
          <div>
            <span style={{ marginBottom: "-1rem" }}>Experiences</span>
            <span className="d-none">__</span>
          </div>
          <div>
            <span style={{ marginBottom: "-1rem" }}>Online Experiences</span>
            <span className="d-none">__</span>
          </div>
        </div>
      ) : type === "search" ? (
        <div className="d-flex flex-coloumn align-items-center justify-content-center gap-3 bg-white text-dark py-1 px-3 border shadow-sm rounded-50">
          <div>Cape Town</div>
          <div className="fw-light text-light-grey">|</div>
          <div>Jun 24-29</div>
          <div className="fw-light text-light-grey">|</div>
          <div>2 guests</div>
          <div style={{ marginRight: "-0.5rem" }}>
            <SearchIcon
              style={{ boxSizing: "content-box" }}
              className="bg-danger rounded-circle p-2 text-white"
            />
          </div>
        </div>
      ) : type === "listing" ? (
        <div className="shadow-sm d-flex align-items-center justify-content-between bg-white text-dark py-1 px-1 border rounded-50">
          <div className="ps-3 pe-2">
            <input
              type="text"
              className="border-0 outline-none pe-5"
              placeholder="Start your search"
            />
          </div>
          <div>
            <SearchIcon
              style={{ boxSizing: "content-box" }}
              className="bg-danger rounded-circle p-2 text-white"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MiddleNav;
