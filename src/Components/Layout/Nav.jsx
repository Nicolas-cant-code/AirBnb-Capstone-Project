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
          className={`d-flex justify-content-between fw-semibold align-items-center py-4 ${
            type === "home"
              ? "text-light"
              : type === "search"
              ? "text-dark"
              : "text-dark"
          } h-100`}
        >
          <div className="logo">
            {type === "home" ? (
              <img
                src="https://logos.logofury.com/logo_src/989c9e706ee391765020e1095895bd47.png"
                alt="AirBnB Logo"
                className="img-fluid mh-100"
              />
            ) : (
              <img
                src="//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
                alt="AirBnB Logo"
                className="img-fluid mh-100"
              />
            )}
          </div>

          <MiddleNav type={type} />

          <div className="d-flex gap-4 align-items-center">
            <span>Become A Host</span>
            <LanguageIcon />
            <span
              className="d-flex gap-2 align-items-center py-2 px-3 bg-white border"
              style={{ borderRadius: "50px" }}
            >
              <MenuIcon color="action" />
              <AccountCircleIcon color="action" style={{ scale: "1.5" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
