import React, { useEffect, useRef } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";

Dropzone.autoDiscover = false;

const CreateListing = () => {
  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (Dropzone.instances.length > 0) {
      Dropzone.instances.forEach((dz) => dz.destroy());
    }

    const dz = new Dropzone(dropzoneRef.current, {
      url: "/upload",
      autoProcessQueue: false,
      paramName: "file",
      maxFilesize: 2, // MB
      acceptedFiles: "image/*",
      maxFiles: 8,
      addRemoveLinks: true,
      thumbnailWidth: 150,
      thumbnailHeight: 150,
      clickable: dropzoneRef.current,
    });
  }, []);

  return (
    <div className="px-4">
      <Nav type={"create"} />
      <Button slot={"View my listings"} />
      <div className="flex flex-col items-center justify-center mt-4">
        <h2>Create Listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input slot={"Listing Name"} styles={"w-100"} required />
            <Input slot={"Location"} styles={"w-100"} required />
            <Input
              slot={"Description"}
              type={"textarea"}
              styles={"fs-7 h-30 w-100"}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <Input
                slot={"Rooms"}
                type={"number"}
                styles={"max-w-[80px]"}
                placeholder={" "}
                required
              />
              <Input
                slot={"Baths"}
                type={"number"}
                styles={"max-w-[80px]"}
                placeholder={" "}
                required
              />
              <Input
                slot={"Type"}
                type={"select"}
                styles={"max-w-[22vw] lg:max-w-[25vw]"}
                required
              />
            </div>
            <Input slot={"Location"} styles={"w-100"} />
            <div className="flex gap-2 relative">
              <Input
                slot={"Amenities"}
                styles={"max-w-[26vw] lg:max-w-[28vw]"}
                required
              />
              <BlueButton
                slot={"Add"}
                styles={"w-[135px] absolute right-0 bottom-6"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col align-items-center mb-5 relative">
          <span
            onClick={() => {
              if (dropzoneRef.current) {
                dropzoneRef.current.click();
              }
            }}
          >
            <BlueButton
              slot={"Upload Image"}
              styles={"min-w-[200px] max-w-[400px] w-[25vw]"}
            />
          </span>
          <label className="fs-7 fw-bold text-indigo-500 absolute left-0 top-15">
            Images
          </label>
          <form
            className="dropzone w-[60vw] md:w-[80vw] 2xl:w-[60vw] border-2 rounded-3 mt-4"
            ref={dropzoneRef}
          ></form>
          <span className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BlueButton
              slot={"Create"}
              styles={"w-[25vw] max-w-[400px] min-w-[200px] mt-5"}
            />
            <BlueButton
              slot={"Cancel"}
              styles={
                "w-[25vw] max-w-[400px] min-w-[200px] mt-5 bg-red-600 hover:bg-red-700"
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
