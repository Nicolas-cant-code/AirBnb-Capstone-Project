import React from "react";

const ListingItem = ({ item }) => {
  return (
    <li className="fs-5 text-muted text-start list-unstyled hover-link">
      {item}
    </li>
  );
};

export default ListingItem;
