import React from "react";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import SearchResult from "../../Layout/SearchResult";
import BlueButton from "../../Layout/BlueButton";

const ViewListings = () => {
  return (
    <div>
      <div className="px-4">
        <Nav type={"create"} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 px-5 align-items-center border-b-2 border-gray-700/25 pb-4 mb-5">
        <Button slot={"View Reservations"} />
        <Button slot={"View listings"} />
        <Button slot={"Create listing"} />
      </div>
      <div className="px-4">
        <h2 className="text-light-grey fs-4 pb-5">My Hotel List</h2>
        <div>
          <SearchResult
            favourite
            title={"Cape Town Getaway"}
            img={"Bnb1.png"}
            tags={"Beach · Sunset · Wifi · Kitchen"}
            rating={"4.5"}
            description={"3-6 guests · 3 bed · 2 bath"}
            price={"3,500"}
            reviewCount={120}
            id={1}
          />
          <div className="flex flex-col pb-4">
            <BlueButton slot={"Update"} styles={"w-[270px] sm:w-[300px]"} />
            <BlueButton
              slot={"Delete"}
              styles={"w-[270px] sm:w-[300px] bg-red-600 hover:bg-red-700 mt-3"}
            />
          </div>
        </div>
        <div>
          <SearchResult
            favourite
            title={"Cape Town Getaway"}
            img={"Bnb1.png"}
            tags={"Beach · Sunset · Wifi · Kitchen"}
            rating={"4.5"}
            description={"3-6 guests · 3 bed · 2 bath"}
            price={"3,500"}
            reviewCount={120}
            id={1}
          />
          <div className="flex flex-col pb-4">
            <BlueButton slot={"Update"} styles={"w-[270px] sm:w-[300px]"} />
            <BlueButton
              slot={"Delete"}
              styles={"w-[270px] sm:w-[300px] bg-red-600 hover:bg-red-700 mt-3"}
            />
          </div>
        </div>
        <div>
          <SearchResult
            favourite
            title={"Cape Town Getaway"}
            img={"Bnb1.png"}
            tags={"Beach · Sunset · Wifi · Kitchen"}
            rating={"4.5"}
            description={"3-6 guests · 3 bed · 2 bath"}
            price={"3,500"}
            reviewCount={120}
            id={1}
          />
          <div className="flex flex-col pb-4">
            <BlueButton slot={"Update"} styles={"w-[270px] sm:w-[300px]"} />
            <BlueButton
              slot={"Delete"}
              styles={"w-[270px] sm:w-[300px] bg-red-600 hover:bg-red-700 mt-3"}
            />
          </div>
        </div>
        <div>
          <SearchResult
            favourite
            title={"Cape Town Getaway"}
            img={"Bnb1.png"}
            tags={"Beach · Sunset · Wifi · Kitchen"}
            rating={"4.5"}
            description={"3-6 guests · 3 bed · 2 bath"}
            price={"3,500"}
            reviewCount={120}
            id={1}
          />
          <div className="flex flex-col pb-4">
            <BlueButton slot={"Update"} styles={"w-[270px] sm:w-[300px]"} />
            <BlueButton
              slot={"Delete"}
              styles={"w-[270px] sm:w-[300px] bg-red-600 hover:bg-red-700 mt-3"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewListings;
