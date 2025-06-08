import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const TagOffers = ({ slot }) => {
  return (
    <div className="flex gap-2 align-items-center">
      <TaskAltIcon className="text-green-500" />
      <span>{slot}</span>
    </div>
  );
};

export default TagOffers;
