import React from "react";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const DetailsCard = ({ Home, CheckIn, Cancel, Clean }) => {
  return (
    <div className="py-2">
      {Home ? (
        <div className="flex gap-4 align-items-center">
          <HomeFilledIcon className="text-red-500 fs-2" />
          <span>
            <h3 className="fs-5 mb-0">Entire Home</h3>
            <p className="text-gray-500">
              You'll have the entire home to yourself
            </p>
          </span>
        </div>
      ) : Clean ? (
        <div className="flex gap-4 align-items-center">
          <AutoAwesomeIcon className="text-red-500 fs-2" />
          <span>
            <h3 className="fs-5 mb-0">Enhanced</h3>
            <p className="text-gray-500">
              We prioritize cleanliness and hygiene
            </p>
          </span>
        </div>
      ) : CheckIn ? (
        <div className="flex gap-4 align-items-center">
          <span>
            <DoorFrontIcon className="text-red-500 fs-2" />
          </span>
          <span>
            <h3 className="fs-5 mb-0">Self Check-In</h3>
            <p className="text-gray-500">Check yourself in with a keypad</p>
          </span>
        </div>
      ) : Cancel ? (
        <div className="flex gap-4 align-items-center">
          <span>
            <CalendarMonthIcon className="text-red-500 fs-2" />
          </span>
          <span>
            <h3 className="fs-5 mb-0">Flexible Cancellation</h3>
            <p className="text-gray-500">
              You can cancel your reservation for free within 48 hours
            </p>
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default DetailsCard;
