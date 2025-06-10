import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [guests, setGuests] = useState(null);
  const [hotel, setHotel] = useState("");
  const navigate = useNavigate();

  const handleDatePicker = (type, event) => {
    const date = event.target.value;
    if (type === "checkin") {
      setCheckinDate(date);
    } else if (type === "checkout") {
      setCheckoutDate(date);
    }
  };

  const handleSearch = () => {
    if (!checkinDate || !checkoutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(checkoutDate) <= new Date(checkinDate)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    if (new Date(checkinDate) <= new Date()) {
      alert("Check-in date cannot be in the past or today.");
      return;
    }
    if (guests <= 0) {
      alert("Please enter a valid number of guests.");
      return;
    }
    if (!hotel) {
      alert("Please select a hotel type.");
      return;
    }

    navigate("/search", {
      state: {
        checkinDate,
        checkoutDate,
        guests,
        hotel,
      },
    });
  };

  return (
    <div className="w-100 lg:w-75 d-flex justify-self-center pb-5">
      <div className="d-flex flex-coloumn align-items-center justify-content-between bg-white text-dark py-1 px-3 rounded-50 w-100">
        <div className="border-right ps-1 sm:ps-3 d-flex align-items-center gap-1 md:gap-4 cursor-pointer">
          <div className="d-flex flex-column">
            <span className="fw-semibold fs-7">Hotels</span>
            <select
              id="select"
              className="text-light-grey mb-0"
              style={{ appearance: "none" }}
              onChange={(event) => setHotel(event.target.value)}
            >
              <option value="" selected disabled>
                Select Hotel
              </option>
              <option value="Motel">Motel</option>
              <option value="Home">Home</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
          <div className="md:block hidden">
            <KeyboardArrowDownIcon
              className="text-light-grey p-2 rounded-xs hover:bg-gray-200 rounded icon-hover"
              style={{
                boxSizing: "content-box",
              }}
              onClick={() => document.getElementById("select").focus()}
            />
          </div>
        </div>
        <div
          className="border-l-2 border-gray-300/40 pl-4 lg:pl-8 cursor-pointer flex flex-column"
          onChange={(event) => handleDatePicker("checkin", event)}
        >
          <span className="fw-semibold fs-7">Check in</span>
          <input
            className="text-light-grey mb-0"
            placeholder="Add date"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <div
          className="border-l-2 border-gray-300/40 pl-8 cursor-pointer flex flex-column"
          onChange={(event) => handleDatePicker("checkout", event)}
        >
          <span className="fw-semibold fs-7">Check out</span>
          <input
            className="text-light-grey mb-0"
            placeholder="Add date"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <div className="border-l-2 border-gray-300/40 pl-8 cursor-pointer flex flex-column">
          <span className="fw-semibold fs-7">Guests</span>
          <input
            type="number"
            className="text-dark mb-0 outline-none"
            placeholder="Add guests"
            onChange={(event) => setGuests(event.target.value)}
            min={1}
          />
        </div>
        <div style={{ marginRight: "-0.5rem" }}>
          <SearchIcon
            style={{ boxSizing: "content-box" }}
            className="cursor-pointer bg-danger rounded-circle p-3 text-white"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
