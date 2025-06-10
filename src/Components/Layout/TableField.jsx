import React from "react";

const TableField = ({ slot }) => {
  return (
    <td className="break-words border-2 border-gray-300 px-3 py-2 max-w-[75px]">
      {slot}
    </td>
  );
};

export default TableField;
