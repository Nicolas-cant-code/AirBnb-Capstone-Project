import React from "react";
import HeadingTag from "./HeadingTag";
import ListingItem from "./ListingItem";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = ({ padding }) => {
  return (
    <div className={padding + " bg-light pb-4"}>
      <div className="flex justify-content-between pb-5 pt-6 border-bottom gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <HeadingTag title={"Support"} />
          <ul className="d-flex flex-column gap-3 ps-0 pt-2">
            <ListingItem item={"Help Center"} />
            <ListingItem item={"Safety information"} />
            <ListingItem item={"Cancellation options"} />
            <ListingItem item={"Our COVID-19 Response"} />
            <ListingItem item={"Supporting people with disabilities"} />
            <ListingItem item={"Report a neighborhoood concern"} />
          </ul>
        </section>
        <section>
          <HeadingTag title={"Community"} />
          <ul className="d-flex flex-column gap-3 ps-0 pt-2">
            <ListingItem item={"Airbnb.org: disaster relief housing"} />
            <ListingItem item={"Support: Afghan refugees"} />
            <ListingItem item={"Celebrating diversity & belonging"} />
            <ListingItem item={"Combating discriminatino"} />
          </ul>
        </section>
        <section>
          <HeadingTag title={"Hosting"} />
          <ul className="d-flex flex-column gap-3 ps-0 pt-2">
            <ListingItem item={"Try hosting"} />
            <ListingItem item={"AirCover: protection for Hosts"} />
            <ListingItem item={"Explore hosting resources"} />
            <ListingItem item={"Visit our community forum"} />
            <ListingItem item={"How to host responsibly"} />
          </ul>
        </section>
        <section>
          <HeadingTag title={"About"} />
          <ul className="d-flex flex-column gap-3 ps-0 pt-2">
            <ListingItem item={"Newsroom"} />
            <ListingItem item={"Learn about new features"} />
            <ListingItem item={"Letter from our founders"} />
            <ListingItem item={"Careers"} />
            <ListingItem item={"Investors"} />
            <ListingItem item={"Airbnb Luxe"} />
          </ul>
        </section>
      </div>
      <div className="flex flex-col lg:flex-row justify-content-between pt-4">
        <div>
          <span>© 2025 Airbnb, Inc. • Privacy • Terms • Sitemap</span>
        </div>
        <div className="d-flex gap-5">
          <div className="d-flex gap-1 align-items-center">
            <LanguageIcon />
            <div className="dropdown btn p-0">
              <select
                className="dropdown-toggle mb-0"
                id="dropdownMenuButton"
                dataToggle="dropdown"
                ariaHaspopup="true"
                ariaExpanded="false"
              >
                <div ariaLabelledby="dropdownMenuButton">
                  <option className="dropdown-item">English</option>
                  <option className="dropdown-item">Russian</option>
                  <option className="dropdown-item">Afrikaans</option>
                </div>
              </select>
            </div>
          </div>
          <div>
            <div className="dropdown btn p-0">
              <select
                className="dropdown-toggle mb-0"
                id="dropdownMenuButton"
                dataToggle="dropdown"
                ariaHaspopup="true"
                ariaExpanded="false"
              >
                <div ariaLabelledby="dropdownMenuButton">
                  <option className="dropdown-item">R RND</option>
                  <option className="dropdown-item">$ USD</option>
                  <option className="dropdown-item">€ EUR</option>
                </div>
              </select>
            </div>
          </div>
          <div className="d-flex gap-1">
            <FacebookRoundedIcon />
            <XIcon />
            <InstagramIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
