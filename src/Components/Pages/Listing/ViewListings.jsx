import React, { useEffect, useState } from "react";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import SearchResult from "../../Layout/SearchResult";
import BlueButton from "../../Layout/BlueButton";
import { useNavigate } from "react-router-dom";

const ViewListings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const hostId = user ? user._id : null;
  const [listings, setListings] = useState([]);
  const naviagate = useNavigate();

  useEffect(() => {
    if (!hostId) {
      alert("Host ID not found. Please relog in as a host.");
      return;
    }

    const fetchListings = async () => {
      try {
        const response = await fetch(
          `/api/listing/get/listings/?host_id=${hostId}`
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch listings");
        }

        setListings(data);
      } catch (error) {
        alert("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [hostId]);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!id) {
      alert("Listing ID not found.");
      return;
    }

    try {
      const response = await fetch(`/api/listing/delete?listing_id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete listing");
      } else {
        alert("Listing deleted successfully.");
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== id)
        );
      }
    } catch (error) {
      alert("Error deleting listing:", error);
    }
  };

  const handleUpdate = (e, element) => {
    e.preventDefault();
    if (!element) {
      alert("Listing item not found.");
      return;
    }
    naviagate(`/edit/listing/${element._id}`, { state: { listing: element } });
  };

  return (
    <div>
      <div className="px-4">
        <Nav type={"create"} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 px-5 align-items-center border-b-2 border-gray-700/25 pb-4 mb-5">
        <Button slot={"View Reservations"} href={"/view/reservations"} />
        {/* <Button slot={"View listings"} /> */}
        <Button slot={"Create listing"} href={"/create/listing"} />
      </div>
      <div className="px-4">
        <h2 className="text-light-grey fs-4 pb-5">My Hotel List</h2>
        {listings.map((element) => (
          <div key={element._id}>
            <SearchResult
              title={element.listing_name}
              images={element.images}
              type={element.type}
              location={element.location}
              tags={element.amenities || ""}
              description={element.description}
              service={element.service}
              cleaning={element.cleaning}
              price={element.price}
              id={element._id}
              bathrooms={element.bathrooms}
              bedrooms={element.bedrooms}
              user={user}
              hostId={hostId}
            />
            <div className="flex flex-col pb-4">
              <BlueButton
                slot={"Update"}
                styles={"w-[270px] sm:w-[300px]"}
                id={`Update-${element._id}`}
                onClick={(e) => handleUpdate(e, element)}
              />
              <BlueButton
                slot={"Delete"}
                styles={
                  "w-[270px] sm:w-[300px] bg-red-600 hover:bg-red-700 mt-3"
                }
                id={`Delete-${element._id}`}
                onClick={(e) => handleDelete(e, element._id)}
              />
            </div>
          </div>
        ))}
      </div>
      {listings.length === 0 && (
        <p className="text-gray-500 fs-2 text-center">No listings available.</p>
      )}
    </div>
  );
};

export default ViewListings;
