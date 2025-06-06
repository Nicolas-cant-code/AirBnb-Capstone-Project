import React from "react";
import Button from "./Button";

const NavTags = () => {
  return (
    <div className="flex align-items-center pb-4 border-b-2 border-gray-300/40">
      <div className="flex space-x-2 lg:space-x-3 pr-4 lg:pr-8 border-r-2 border-gray-300/40  lg:w-1/3 xl:w-fit">
        <Button slot={"Price"} type={"dropdown"} />
        <Button slot={"Type of place"} type={"dropdown"} />
      </div>
      <div className="pl-4 lg:pl-8 flex space-x-2 lg:space-x-3 justify-between xl:justify-content-start">
        <span className="space-x-2 lg:space-x-3 justify-content-center xl:w-fit hidden md:flex mr-3 lg:mr-45">
          <Button slot={"Wifi"} />
          <Button slot={"Iron"} />
          <Button slot={"Dryer"} />
          <Button slot={"Washer"} />
        </span>
        <span className="space-x-2 lg:space-x-3 hidden xl:flex">
          <Button slot={"Kitchen"} />
          <Button slot={"Free parking"} />
          <Button slot={"Free cancellation"} />
        </span>
        <Button slot={"Filter"} type={"filter"} />
      </div>
    </div>
  );
};

export default NavTags;
