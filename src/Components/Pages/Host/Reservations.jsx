import React, { useEffect, useState } from "react";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import TableField from "../../Layout/TableField";
import BlueButton from "../../Layout/BlueButton";
import Footer from "../../Layout/Footer";

const Reservations = () => {
  const host = JSON.parse(localStorage.getItem("user"));
  const hostId = host ? host._id : null;

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!hostId) {
      alert("Host ID not found. Please relog in as a host.");
      return;
    }

    const getReservation = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservation/get/reservations/?host_id=${hostId}`
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch reservations");
        }

        setReservations(data);
      } catch (error) {
        alert("Error fetching reservations:", error);
      }
    };

    getReservation();
  }, [hostId]);

  const deleteReservation = async (e, id) => {
    e.preventDefault();

    if (!id) {
      alert("Reservation ID not found.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/reservation/delete?reservation_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete reservation");
      } else {
        alert("Reservation deleted successfully.");
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== id)
        );
      }
    } catch (error) {
      alert("Error deleting reservation:", error);
    }
  };

  // Makes the dates look nice
  function formatDate(dateString) {
    return new Date(dateString).toISOString().split("T")[0];
  }

  return (
    <div>
      <div className="px-3 sm:px-4">
        <Nav type={"create"} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 px-5 align-items-center border-b-2 border-gray-700/25 pb-4 mb-5">
        {/* <Button slot={"View Reservations"} href={"/view/reservations"} /> */}
        <Button slot={"View listings"} href={"/view/listings"} />
        <Button slot={"Create listing"} href={"/create/listing"} />
      </div>
      <div className="px-3 sm:px-4 mt-5 text-sm md:text-xl fw-semibold">
        <p className="mb-2">My Reservations</p>
        <div className="mb-5">
          <table className="w-full text-left border-collapse border-3 border-gray-300">
            <thead>
              <tr>
                <TableField slot={"Booked by"} />
                <TableField slot={"Property"} />
                <TableField slot={"Check-in Date"} />
                <TableField slot={"Check-out Date"} />
                <TableField slot={"Actions"} />
              </tr>
            </thead>
            <tbody>
              {reservations.map((element) => (
                <tr key={element._id}>
                  <TableField slot={element.username} />
                  <TableField slot={element.listing_name} />
                  <TableField slot={formatDate(element.check_in)} />
                  <TableField slot={formatDate(element.check_out)} />
                  <td className="px-2 py-1 border-2 border-gray-300">
                    <BlueButton
                      slot={"Delete"}
                      table
                      styles={"bg-red-600 hover:bg-red-700 w-100"}
                      onClick={(e) => deleteReservation(e, element._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Footer padding={"px-5"} />
      </div>
    </div>
  );
};

export default Reservations;
