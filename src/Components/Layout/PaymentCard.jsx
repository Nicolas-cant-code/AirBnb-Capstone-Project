import React from "react";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";

const PaymentCard = ({
  img,
  price,
  title,
  table,
  rating,
  tags,
  reviewCount,
  description,
}) => {
  return (
    <div className="mb-4">
      <div className="p-4 shadow-xl/25 rounded-3 min-w-[370px]">
        <div className="flex justify-between mb-3">
          <span>
            <strong className="fs-5">R{3500}</strong> / night
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
          <button className="bg-red-500 text-white py-2 w-full rounded-3 hover:scale-103 duration-300 hover:bg-red-600">
            Reserve
          </button>
          <p className="mt-2 text-gray-400 text-center">
            You won't be charged yet
          </p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-gray-600/30 flex flex-col gap-2 fw-semibold">
          <div className="flex justify-between">
            <span>
              {3500} x {7} nights
            </span>
            <span>R{3500 * 7}</span>
          </div>
          <div className="flex justify-between">
            <span>Weekly discount</span>
            <span className="text-green-500">-R{Math.ceil(3500 * 0.05)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>R{Math.ceil(3500 * 0.08)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>R{Math.ceil(3500 * 0.1)}</span>
          </div>
          <div className="flex justify-between">
            <span>Occupancy taxes and fees</span>
            <span>R{Math.ceil(3500 * 0.055)}</span>
          </div>
        </div>
        <div className="flex justify-between fs-5 fw-semibold">
          <span>Total</span>
          <span>
            R
            {Math.ceil(
              3500 * 7 - 3500 * 0.05 + 3500 * 0.08 + 3500 * 0.1 + 3500 * 0.055
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
