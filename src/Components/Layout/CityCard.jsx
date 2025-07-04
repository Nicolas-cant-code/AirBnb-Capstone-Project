import React from "react";

const CityCard = ({ img, city, dist, colour }) => {
  return (
    <div
      className={`flex flex-col ${colour} h-87 rounded-xl text-white cursor-pointer hover:scale-103 transition-transform duration-300`}
    >
      <div className="">
        <img
          src={`/assets/city-images/${img}`}
          alt={`${city} Image`}
          className="h-[200px] w-full object-cover"
          style={{
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        />
      </div>
      <div className="text-left p-2">
        <h2 className="fs-4">{city}</h2>
        <p className="fw-light">{dist} away</p>
      </div>
    </div>
  );
};

export default CityCard;
