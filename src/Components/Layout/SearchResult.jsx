import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";

const SearchResult = ({
  images,
  title,
  tags,
  location,
  bedrooms,
  bathrooms,
  type,
  price,
  favourite,
  user,
  hostId,
  id,
  service,
  cleaning,
  description,
}) => {
  const navigate = useNavigate();

  const handleListingClick = () => {
    navigate(`/listing/${id}`, {
      state: {
        listing: {
          images,
          title,
          tags,
          location,
          bedrooms,
          service,
          cleaning,
          bathrooms,
          type,
          price,
          id,
          hostId,
          description,
        },
      },
    });
  };

  return (
    <div
      className="py-4 border-t-3 border-gray-400/40 flex relative w-full hover:scale-102 xl:hover:scale-101 transition-all duration-300 cursor-pointer"
      onClick={() => handleListingClick()}
    >
      <div className="pr-5">
        <img
          src={`/${images[0]}`}
          alt={title}
          className="max-w-[270px] sm:max-w-[300px] max-h-[180px] sm:max-h-[200px] rounded-xl"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h4 className="fs-6 text-light-grey mb-1 hidden sm:block">
            {type} in {location}
          </h4>
          <div className="z-1 absolute sm:relative left-2 top-8 bg-white rounded-full hover:scale-110">
            {user.type === "host" ? (
              <></>
            ) : favourite ? (
              <FavoriteTwoToneIcon
                className="text-red-500 hover:bg-red-200 rounded-full p-1"
                style={{ boxSizing: "content-box" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                className="text-gray-600 hover:bg-gray-300 rounded-full p-1"
                style={{ boxSizing: "content-box" }}
              />
            )}
          </div>
        </div>
        <h3 className="fs-5 sm:fs-4 mb-0">{title}</h3>
        <div className="flex flex-col max-w-md md:max-w-[250px] lg:max-w-xl xl:max-w-3xl">
          <span className="text-light-grey pb-1 sm:pb-2">________</span>
          <span className="text-light-grey mb-2">
            {bedrooms} Bedrooms • {bathrooms} Bathrooms • {bedrooms} -{" "}
            {bedrooms * 2} Guests
          </span>
          <span className="text-light-grey hidden sm:block">
            {tags.map((tag) => `${tag}`).join(" • ")}
          </span>
          <span className="text-light-grey">________</span>
        </div>
        <div className="block sm:flex justify-between mt-0 sm:mt-[8px] w-full">
          <span className="font-semibold hidden sm:flex align-center mr-auto">
            {Math.ceil(Math.random() * 5)}{" "}
            <StarTwoToneIcon
              className="text-yellow-500 px-2"
              style={{ boxSizing: "content-box" }}
            />{" "}
            ({Math.ceil(Math.random() * 100)} reviews)
          </span>
          <span>
            <strong className="fs-6 sm:fs-5">R{price}</strong> /night
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
