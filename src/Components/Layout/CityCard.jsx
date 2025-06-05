import React from "react";

const CityCard = ({ img, city, dist, colour }) => {
  return (
    <div
      className={`flex flex-col ${colour} h-87 rounded text-white cursor-pointer hover:scale-103 transition-transform duration-300`}
    >
      <div className="rounded">
        <img
          src={`/assets/city-images/${img}`}
          alt={`${city} Image`}
          className="h-[200px] w-full object-cover rounded-t"
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
