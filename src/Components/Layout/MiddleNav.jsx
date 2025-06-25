import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const MiddleNav = ({ type }) => {
  const navigate = useNavigate();

  const handleSearchAll = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/listing/search/listings/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to fetch listings");
      return;
    }

    if (!data) {
      alert("No listings found");
      return;
    }

    navigate("/search", { state: { listings: data } });
  };
  return (
    <div>
      {type === "home" ? (
        <div
          className="flex space-x-2 lg:space-x-8"
          style={{ marginBottom: "-0.5rem" }}
        >
          <div className="flex-column align-items-center flex">
            <span style={{ marginBottom: "-1rem" }}>Places to stay</span>
            <span className="d-block">__</span>
          </div>
          <div className="hidden lg:block">
            <span style={{ marginBottom: "-1rem" }}>Experiences</span>
            <span className="d-none">__</span>
          </div>
          <div className="hidden xl:block">
            <span style={{ marginBottom: "-1rem" }}>Online Experiences</span>
            <span className="d-none">__</span>
          </div>
        </div>
      ) : type === "search" ? (
        <div className="d-flex flex-coloumn align-items-center justify-content-center space-x-2 md:space-x-5 bg-white text-dark py-1 px-2 sm:px-3 border shadow-sm rounded-50 scale-75 sm:scale-90 md:scale-100">
          <div className="pl-0 md:pl-2 cursor-pointer text-light-grey">
            Location: All
          </div>
          <div className="fw-light text-light-grey cursor-default">|</div>
          <div className="text-light-grey cursor-pointer">Hotel type: All</div>
          <div className="fw-light text-light-grey cursor-default">|</div>
          <div className="text-light-grey cursor-pointer">Guests: All</div>
          <div style={{ marginRight: "-0.5rem" }}>
            <SearchIcon
              style={{ boxSizing: "content-box" }}
              className="bg-danger rounded-circle p-2 text-gray-50 cursor-pointer hover:text-gray-300"
              onClick={(e) => handleSearchAll(e)}
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
              onClick={(e) => {
                handleSearchAll(e);
              }}
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
