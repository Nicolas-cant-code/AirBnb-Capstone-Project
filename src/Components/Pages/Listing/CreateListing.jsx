import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";

Dropzone.autoDiscover = false;

const CreateListing = () => {
  // get user from localStorage and Id from MongoDB
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const navigate = useNavigate();
  const [form, setForm] = useState({
    listing_name: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    type: "",
    price: "",
    amenities: "",
    images: [],
    service: false,
    cleaning: false,
    host_id: user._id || "",
  });

  const dropzoneRef = useRef(null);
  const dropzoneInstanceRef = useRef(null);

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

    dropzoneInstanceRef.current = dz;
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "service" || e.target.name === "cleaning") {
      // Toggle boolean values for service and cleaning
      setForm({ ...form, [e.target.name]: e.target.checked });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.bedrooms < 1 || form.bathrooms < 1) {
      alert("Bedrooms and Bathrooms must be at least 1");
      return;
    }

    if (form.price < 1) {
      alert("Price must be at least 1 currencty unit");
      return;
    }

    const formData = new FormData();

    // Add form fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Add images from Dropzone
    const dzFiles = dropzoneInstanceRef.current?.files || [];

    if (dzFiles.length === 0) {
      alert("At least 1 image is required");
      return;
    }

    dzFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        // If validation errors were returned
        if (data.errors) {
          const messages = data.errors.map((err) => err.msg).join("\n");
          alert("Failed to create Listing:\n" + messages);
        } else {
          alert(
            "Failed to create Listing: " + (data.message || res.statusText)
          );
        }
        return;
      }

      alert("Successfully created a listing!");
      navigate("/view/listings");
    } catch (err) {
      console.error("Network or server error:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleAddAmenity = () => {
    const newAmenity = document.getElementById("amenities").value.trim();
    let amenityExists = false;

    form.amenities.split(",").map(() => {
      if (form.amenities && form.amenities.includes(newAmenity)) {
        amenityExists = true;
        return;
      }
    });

    if (amenityExists) {
      alert("Amenity already exists");
      return;
    }

    if (newAmenity && amenityExists === false) {
      setForm((prevForm) => ({
        ...prevForm,
        amenities: prevForm.amenities
          ? `${prevForm.amenities}, ${newAmenity}`
          : newAmenity,
      }));
    }
  };

  const removeAmenity = (e) => {
    const amenityToRemove = e.target.textContent.trim().slice(0, -1); // Remove the trailing 'x'

    setForm((prevForm) => ({
      ...prevForm,
      amenities: prevForm.amenities
        .split(",")
        .filter((amenity) => amenity.trim() !== amenityToRemove)
        .join(", "),
    }));
    e.stopPropagation();
  };

  return (
    <div className="px-4">
      <Nav type={"create"} />
      <Button slot={"View my listings"} href={"/view/listings"} />
      <div className="flex flex-col items-center justify-center mt-4">
        <h2>Create Listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              slot={"Listing Name"}
              styles={"w-100"}
              id={"listing_name"}
              onChange={(e) => handleChange(e)}
              required
            />
            <Input
              slot={"Location"}
              styles={"w-100"}
              required
              id={"location"}
              onChange={(e) => handleChange(e)}
              type={"selectLocation"}
            />
            <Input
              slot={"Description"}
              type={"textarea"}
              styles={"fs-7 h-30 w-100"}
              id={"description"}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <Input
                slot={"Rooms"}
                type={"number"}
                styles={"max-w-[80px]"}
                placeholder={" "}
                id={"bedrooms"}
                onChange={(e) => handleChange(e)}
                required
              />
              <Input
                slot={"Baths"}
                type={"number"}
                styles={"max-w-[80px]"}
                placeholder={" "}
                id={"bathrooms"}
                onChange={(e) => handleChange(e)}
                required
              />
              <Input
                slot={"Type"}
                type={"select"}
                id={"type"}
                onChange={(e) => handleChange(e)}
                styles={"max-w-[22vw] lg:max-w-[25vw]"}
                required
              />
            </div>
            <Input
              slot={"Price"}
              styles={"w-100"}
              type={"number"}
              id={"price"}
              onChange={(e) => handleChange(e)}
              placeholder={"Price per night"}
            />
            <div className="flex flex-col md:flex-row gap-3 relative items-center">
              <Input
                slot={"Amenities"}
                id={"amenities"}
                styles={"max-w-full lg:max-w-[12vw] md:max-w-[10vw]"}
                required
              />
              <BlueButton
                slot={"Add"}
                styles={"w-[135px]"}
                onClick={() => handleAddAmenity()}
              />
              <div className="border-1 border-gray-300 rounded-2 p-2 bg-gray-200 w-full max-w-full md:max-w-[13.5vw] h-[60px] overflow-x-hidden overflow-y-auto items-center">
                {form.amenities && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.amenities.split(",").map((amenity, index) => (
                      <span
                        key={index}
                        className="items-center flex bg-gray-700 text-white text-indigo-800 px-2 py-1 rounded-2 gap-2 text-sm hover:bg-gray-500 duration-200 cursor-pointer"
                        onClick={(e) => removeAmenity(e)}
                      >
                        {amenity.trim()}
                        <span className="pb-1">x</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="w-50 flex items-center gap-3">
                <label className="text-indigo-500 fs-5 md:fs-4 fw-semibold mb-1">
                  Service:
                </label>
                <input
                  type="checkbox"
                  name="service"
                  className="scale-200"
                  onChange={(e) => handleChange(e)}
                  style={{ accentColor: "rgb(255, 63,71)" }}
                />
              </div>
              <div className="w-50 flex items-center gap-3">
                <label className="text-indigo-500 fs-5 md:fs-4 fw-semibold mb-1">
                  Cleaning:
                </label>
                <input
                  type="checkbox"
                  name="cleaning"
                  className="scale-200"
                  onChange={(e) => handleChange(e)}
                  style={{ accentColor: "rgb(255, 63,71)" }}
                />
              </div>
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
          <p className="fw-semibold mt-2">
            Note the first image will be the cover image
          </p>
          <span className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BlueButton
              slot={"Create"}
              styles={"w-[25vw] max-w-[400px] min-w-[200px] mt-5"}
              onClick={(e) => handleSubmit(e)}
            />
            <BlueButton
              slot={"Cancel"}
              styles={
                "w-[25vw] max-w-[400px] min-w-[200px] mt-5 bg-red-600 hover:bg-red-700"
              }
              onClick={() => {
                alert("Listing creation cancelled.");
                navigate("/view/listings");
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
