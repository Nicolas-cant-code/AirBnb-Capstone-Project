import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

const SearchResult = ({
  img,
  title,
  tags,
  rating,
  description,
  price,
  favourite,
  reviewCount,
}) => {
  return (
    <div className="py-4 border-t-2 border-gray-300/40 flex relative">
      <div className="pr-5">
        <img
          src={`/assets/Airbnbs/${img}`}
          alt={title}
          className="w-full h-auto rounded-xl"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="fs-6 text-light-grey">Entire home in Cape Town</h4>
        <h3 className="fs-4 pb-3">{title}</h3>
        <div className="flex flex-col py-3 border-b-2 border-t-2 border-gray-300/40">
          <span className="text-light-grey">{description}</span>
          <span className="text-light-grey">{tags}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span className="font-semibold">
            {rating} ({reviewCount})
          </span>
          <span>R{price} /night</span>
        </div>
        {favourite ? (
          <FavoriteTwoToneIcon className="text-red-500 absolute top-8 right-0" />
        ) : (
          <FavoriteBorderOutlinedIcon className="text-gray-600" />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
