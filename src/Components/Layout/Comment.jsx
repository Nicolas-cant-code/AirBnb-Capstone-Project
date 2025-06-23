import React from "react";

const Comment = ({ number }) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <div>
          <img
            src={`/assets/Users/User${number}.png`}
            alt="Profile Pic"
            className="h-[56px] w-[56px] rounded-circle"
          />
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-gray-950 font-semibold">
            {number % 2 == 0 ? "Jose" : "Maria"}
          </p>
          <p className="text-gray-500">
            December {number % 2 == 0 ? "2022" : "2023"}
          </p>
        </div>
      </div>
      <span className="fw-semibold">
        {number == 1
          ? "Host was very attentive."
          : number == 2
          ? "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive."
          : number == 3
          ? "Great Place"
          : number == 4
          ? "It was Okay. Had a problem with the bathroom but other than that it was good."
          : number == 5
          ? "Best AirBnb I've ever used. 5/5"
          : "Meh, it was okay. The place was clean but the host was not very responsive."}
      </span>
    </div>
  );
};

export default Comment;
