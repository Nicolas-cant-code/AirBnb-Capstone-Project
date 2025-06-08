import React from "react";

const ImageCard = ({
  img,
  imgStyle,
  title,
  titleStyle,
  buttonText,
  buttonStyle,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(/assets/bg-images/${img})` }}
      className={`bg-cover bg-center text-white ${imgStyle}`}
    >
      <h2 className={`${titleStyle}`}>{title}</h2>
      <button
        className={`px-3 py-2 hover:bg-gray-300 hover:scale-105 transition-transform duration-300 ${buttonStyle}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ImageCard;
