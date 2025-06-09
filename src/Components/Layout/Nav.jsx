import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import MiddleNav from "./MiddleNav";

const Nav = ({ type }) => {
  return (
    <div className="py-4">
      <div style={{ height: "48px" }}>
        <div
          className={`flex justify-content-between fw-semibold align-items-center py-4 ${
            type === "home"
              ? "text-light"
              : type === "search"
              ? "text-dark"
              : "text-dark"
          } h-100`}
        >
          <div className="logo cursor-pointer">
            {type === "home" ? (
              <img
                src="https://logos.logofury.com/logo_src/989c9e706ee391765020e1095895bd47.png"
                alt="AirBnB Logo"
                className="img-fluid rounded-0 mh-100 hidden md:block"
              />
            ) : (
              <img
                src="//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
                alt="AirBnB Logo"
                className="img-fluid rounded-0 mh-100 hidden md:block"
              />
            )}
          </div>

          <MiddleNav type={type} />

          <div className="d-flex gap-2 md:gap-4 align-items-center cursor-pointer">
            {type === "create" ? (
              <span className="mr-2">{"John Doe"}</span>
            ) : (
              <div className="flex  space-x-1 md:space-x-4">
                <span className="hover:text-red-600">Become A Host</span>
                <div className="hidden md:block">
                  <LanguageIcon className="hover:text-red-600" />
                </div>
              </div>
            )}
            <span
              className="d-flex gap-2 align-items-center py-2 px-3 bg-white border shadow-sm/15 hover:scale-105
              transition-all duration-200"
              style={{ borderRadius: "50px" }}
            >
              <MenuIcon className="text-gray-400 hover:text-red-600/80" />
              <AccountCircleIcon
                style={{ scale: "1.5" }}
                className="text-gray-500 hover:text-red-600/80"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
