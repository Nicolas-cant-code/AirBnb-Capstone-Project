import React from "react";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";

const PaymentCard = ({ price, user, bedrooms, cleaning, service, host }) => {
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
            <span className="border-r-2 border-gray-600/30 p-2 cursor-pointer hover:text-red-500">
              CHECK-IN <br className="text-gray-500" />
              <span className="text-gray-400 fs-6 fw-semibold">Add Date</span>
            </span>
            <span className="p-2 cursor-pointer hover:text-red-500">
              CHECK-OUT <br className="text-gray-500" />
              <span className="text-gray-400 fs-6 fw-semibold">Add Date</span>
            </span>
          </div>
          <div className="flex border-t-2 hover:text-red-500 border-gray-600/30 p-2 align-items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span>GUESTS</span>
              <span className="text-gray-400 fs-6 fw-semibold">Add guests</span>
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
            disabled={user.type === "host" ? false : true}
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
          <div className="flex justify-between">
            <span>
              {price} x {7} nights
            </span>
            <span>R{price * 7}</span>
          </div>
          <div className="flex justify-between">
            <span>Weekly discount</span>
            <span className="text-green-500">-R{Math.ceil(price * 0.05)}</span>
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
            <span>R{Math.ceil(price * 0.055)}</span>
          </div>
        </div>
        <div className="flex justify-between fs-5 fw-semibold">
          <span>Total</span>
          <span>
            R
            {Math.ceil(
              price * 7 -
                price * 0.05 +
                (cleaning ? price * 0.08 : 0) +
                (service ? price * 0.1 : 0) +
                price * 0.055
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
