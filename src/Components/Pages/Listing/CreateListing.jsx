import React from "react";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import Input from "../../Layout/Input";

const CreateListing = () => {
  return (
    <div className="px-4">
      <Nav type={"create"} />
      <Button slot={"View my listings"} />
      <div className="flex flex-col items-center justify-center mt-5">
        <h2>Create Listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input slot={"Listing Name"} />
            <Input slot={"Location"} />
            <Input
              slot={"Description"}
              type={"textarea"}
              styles={"fs-7 h-30"}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <Input
                slot={"Rooms"}
                type={"number"}
                styles={"max-w-[110px]"}
                placeholder={" "}
              />
              <Input
                slot={"Baths"}
                type={"number"}
                styles={"max-w-[110px]"}
                placeholder={" "}
              />
              <Input slot={"Type"} type={"select"} styles={"max-w-[260px]"} />
            </div>
            <Input slot={"Location"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
