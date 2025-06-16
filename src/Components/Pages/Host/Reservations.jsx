import React from "react";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import TableField from "../../Layout/TableField";
import BlueButton from "../../Layout/BlueButton";
import Footer from "../../Layout/Footer";

const Reservations = () => {
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
            <tr>
              <TableField slot={"Booked by"} />
              <TableField slot={"Property"} />
              <TableField slot={"Check-in Date"} />
              <TableField slot={"Check-out Date"} />
              <TableField slot={"Actions"} />
            </tr>
            <tr>
              <TableField slot={"John Doe"} />
              <TableField slot={"Property 1"} />
              <TableField slot={"19/06/2025"} />
              <TableField slot={"24/06/2025"} />
              <td className="px-2 py-1 border-2 border-gray-300">
                <BlueButton
                  slot={"Delete"}
                  table
                  styles={"bg-red-600 hover:bg-red-700 w-100"}
                />
              </td>
            </tr>
            <tr>
              <TableField slot={"Jane Smith"} />
              <TableField slot={"Property 2"} />
              <TableField slot={"20/06/2025"} />
              <TableField slot={"25/06/2025"} />
              <td className="px-2 py-1 border-2 border-gray-300">
                <BlueButton
                  slot={"Delete"}
                  table
                  styles={"bg-red-600 hover:bg-red-700 w-100"}
                />
              </td>
            </tr>
            <tr>
              <TableField slot={"Jake Cole"} />
              <TableField slot={"Property 1"} />
              <TableField slot={"28/06/2025"} />
              <TableField slot={"02/07/2025"} />
              <td className="px-2 py-1 border-2 border-gray-300">
                <BlueButton
                  slot={"Delete"}
                  table
                  styles={"bg-red-600 hover:bg-red-700 w-100"}
                />
              </td>
            </tr>
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
