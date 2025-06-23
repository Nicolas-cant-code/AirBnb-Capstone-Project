import React from "react";
import ListingItem from "./ListingItem";
import HeadingTag from "./HeadingTag";

const Explore = ({ padding }) => {
  return (
    <div className={padding + " bg-light pb-5 border-b-3 border-gray-400/20"}>
      <h1 className="fs-2 pt-5">Explore other options in South Africa</h1>
      <section>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 ps-0 pt-4">
          <ListingItem item={"Cape Town"} />
          <ListingItem item={"Johannesburg"} />
          <ListingItem item={"Durban"} />
          <ListingItem item={"Pretoria"} />
          <ListingItem item={"Cape Town"} />
        </ul>
      </section>
      <section className="pt-4">
        <HeadingTag title={"Unique stays on Airbnb"} />
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 ps-0 pt-2 mb-5">
          <ListingItem item={"Home"} />
          <ListingItem item={"Condo"} />
          <ListingItem item={"Villa"} />
          <ListingItem item={"Apartment"} />
          <ListingItem item={"Cottage"} />
          <ListingItem item={"Cabin"} />
        </ul>
      </section>
      <div>
        <span className="fw-bold" style={{ wordSpacing: "0.5rem" }}>
          Airbnb {">"} Africa {">"} South Africa {">"} Cape Town
        </span>
      </div>
    </div>
  );
};

export default Explore;
