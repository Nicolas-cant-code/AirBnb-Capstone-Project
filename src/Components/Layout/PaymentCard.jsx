import React, { useEffect, useState } from "react";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import { useNavigate } from "react-router-dom";

const PaymentCard = ({
  price,
  user,
  bedrooms,
  cleaning,
  service,
  host,
  listing_id,
}) => {
  const allowedGuests = bedrooms * 2; // Guest range is 1-2 per bedroom
  const [guests, setGuests] = useState(bedrooms);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [length, setLength] = useState(1);

  const navigate = useNavigate();

  const handleDatePicker = (type, event) => {
    const date = event.target.value;
    if (type === "checkin") {
      setCheckinDate(date);
    } else if (type === "checkout") {
      setCheckoutDate(date);
    }
  };

  useEffect(() => {
    if (checkinDate && checkoutDate) {
      const nights = Math.ceil(
        (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24)
      );
      setLength(isNaN(nights) || nights < 1 ? 1 : nights);
    }
  }, [checkinDate, checkoutDate]);

  const handleReserve = async (e) => {
    e.preventDefault();

    if (user.type === "host") {
      alert("You cannot reserve a bnb as a host");
      return;
    } else if (!user) {
      alert("Please log in to reserve a bnb.");
      navigate("/login");
      return;
    }

    if (!checkinDate || !checkoutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (!guests || guests < bedrooms || guests > allowedGuests) {
      alert(
        `Please enter a valid number of guests (between ${bedrooms} and ${allowedGuests}).`
      );
      return;
    }

    setLength(
      Math.ceil(
        (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24)
      )
    );
    const totalPrice = Math.ceil(
      price * length * guests -
        price * 0.05 * length * guests +
        (cleaning ? price * 0.08 : 0) +
        (service ? price * 0.1 : 0) +
        price * 0.055 * length
    );

    if (!length) {
      alert("Something went wrong with your dates, please try again.");
      return;
    }
    if (!totalPrice) {
      alert("Something went wrong with your total price, please try again.");
      return;
    }

    try {
      const res = await fetch(
        "https://nicolas-airbnb-capstone-project.onrender.com//api/reservation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            check_in: checkinDate,
            check_out: checkoutDate,
            total: totalPrice,
            username: user.username,
            user_id: user._id,
            host_id: host,
            listing_id: listing_id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // If validation errors were returned
        if (data.errors) {
          const messages = data.errors.map((err) => err.msg).join("\n");
          alert("Failed to create Reservation:\n" + messages);
        } else {
          alert(
            "Failed to create Reservation: " + (data.message || res.statusText)
          );
        }
        return;
      }

      alert("Successfully created your Reservation!");
      navigate("/");
    } catch (err) {
      console.error("Network or server error:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="mb-4">
      <div className="p-4 shadow-xl/25 rounded-3 min-w-[370px]">
        <div className="flex justify-between mb-3">
          <span>
            <strong className="fs-5">R{price}</strong> / night
          </span>
          <span className="flex">
            <StarTwoToneIcon
              className="text-red-500 pr-1"
              style={{ boxSizing: "content-box" }}
            />
            {5.0} •{" "}
            <span className="underline pl-1 cursor-pointer">{123} reviews</span>
          </span>
        </div>
        <div className="flex flex-col w-full border-2 border-gray-600/30 rounded-lg mb-3 fs-7 fw-bold">
          <div className="flex justify-between grid grid-cols-2">
            <div
              className="flex flex-col w-[100%] p-2 cursor-pointer hover:text-red-500"
              onChange={(event) => handleDatePicker("checkin", event)}
            >
              <span className="fw-bold">CHECK IN</span>
              <input
                className="text-gray-500 fw-semibold mb-0 outline-none cursor-pointer"
                style={{ width: "155px" }}
                placeholder="Add date"
                width={"100%"}
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div
              className="flex flex-col w-[100%] p-2 cursor-pointer hover:text-red-500"
              onChange={(event) => handleDatePicker("checkout", event)}
            >
              <span className="fw-bold">CHECK OUT</span>
              <input
                className="text-gray-500 fw-semibold mb-0 outline-none cursor-pointer"
                style={{ width: "155px" }}
                placeholder="Add date"
                width={"100%"}
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>
          <div className="flex border-t-2 hover:text-red-500 border-gray-600/30 p-2 align-items-center justify-between cursor-pointer">
            <div className="cursor-pointer flex flex-col w-[100%]">
              <span className="fw-bold">GUESTS</span>
              <input
                type="number"
                className="text-dark mb-0 outline-none"
                placeholder="Add guests"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
                min={bedrooms}
                max={allowedGuests}
              />
            </div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <div className="mb-3">
          <button
            className={`${
              user.type === "host"
                ? "bg-gray-500"
                : "bg-red-500 hover:bg-red-600 hover:scale-103"
            } text-white py-2 w-full rounded-3 duration-300`}
            disabled={user.type === "host" ? true : false}
            onClick={(e) => handleReserve(e)}
          >
            Reserve
          </button>
          {user.type === "host" && (
            <p className="mt-2 text-red-500 text-center fw-bold">
              You cannot reserve a bnb as a host
            </p>
          )}
          <p className="mt-2 text-gray-400 text-center">
            You won't be charged yet
          </p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-gray-600/30 flex flex-col gap-2 fw-semibold">
          <div className="flex justify-between items-center">
            <span>
              R{price} x {length} nights
              <br />x {guests} guest/s
            </span>
            <span>R{price * length * guests}</span>
          </div>
          <div className="flex justify-between">
            <span>Weekly discount</span>
            <span className="text-green-500">
              -R{Math.ceil(price * 0.05 * length * guests)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>R{cleaning ? Math.ceil(price * 0.08) : 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>R{service ? Math.ceil(price * 0.1) : 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Occupancy taxes and fees</span>
            <span>R{Math.ceil(price * 0.055 * length)}</span>
          </div>
        </div>
        <div className="flex justify-between fs-5 fw-semibold">
          <span>Total</span>
          <span>
            R
            {Math.ceil(
              price * length * guests -
                price * 0.05 * length * guests +
                (cleaning ? price * 0.08 : 0) +
                (service ? price * 0.1 : 0) +
                price * 0.055 * length
            )}
          </span>
        </div>
      </div>
      <div className="text-gray-500 mt-4 flex justify-center align-items-center cursor-pointer hover:underline">
        <OutlinedFlagTwoToneIcon className="fs-5 mt-1 mr-2" />
        <span>Report this listing</span>
      </div>
    </div>
  );
};

export default PaymentCard;
