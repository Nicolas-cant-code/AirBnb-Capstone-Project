import React from "react";
import Button from "./Button";

const NavTags = ({ setSearchParams }) => {
  return (
    <div className="flex align-items-center pb-4 border-b-2 border-gray-300/40">
      <div className="flex space-x-2 lg:space-x-3 pr-4 border-r-2 border-gray-300/40 w-3/4 lg:w-1/3 xl:w-2/7">
        <Button
          slot={"Price"}
          type={"dropdown"}
          id={"price"}
          setSearchParams={setSearchParams}
        />
        <Button
          slot={"Type of place"}
          type={"dropdown"}
          id={"type"}
          setSearchParams={setSearchParams}
        />
      </div>
      <div className="pl-4 flex space-x-2 lg:space-x-3 justify-between xl:justify-content-start w-1/4 sm:w-7/9 relative">
        <span className="space-x-2 lg:space-x-3 justify-content-center xl:w-fit hidden md:flex mr-3 lg:mr-5">
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
        <span>
          <Button slot={"Filter"} type={"filter"} />
        </span>
      </div>
    </div>
  );
};

export default NavTags;
