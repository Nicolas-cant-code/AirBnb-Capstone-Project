import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Nav from "../../Layout/Nav";
import Button from "../../Layout/Button";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";

Dropzone.autoDiscover = false;

const EditListing = () => {
  // get user from localStorage and Id from MongoDB
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const locationId = useLocation();
  const listing = locationId.state?.listing || null;

  if (listing == null) {
    alert("Listing ID not found!");
    navigate("/view/listings");
  }

  const navigate = useNavigate();
  const [form, setForm] = useState({
    listing_name: listing.listing_name || "",
    location: listing.location || "",
    description: listing.description || "",
    bedrooms: listing.bedrooms || "",
    bathrooms: listing.bathrooms || "",
    type: listing.type || "",
    price: listing.price || "",
    amenities: listing.amenities || "",
    host_id: user._id || "",
    service: listing.service || false,
    cleaning: listing.cleaning || false,
  });

  const [images, setImages] = useState(listing.images || []);

  const dropzoneRef = useRef(null);
  const dropzoneInstanceRef = useRef(null);

  let count = 0;

  useEffect(() => {
    count++;
    if (dropzoneRef.current && !dropzoneInstanceRef.current) {
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
    }

    if (images.length >= count) {
      if (listing.images && listing.images.length > 0) {
        listing.images.forEach((img, idx) => {
          const mockFile = {
            name: `Image ${idx + 1}`,
            accepted: true,
            kind: "existing",
            dataURL: `${img}`,
            thumbnailWidth: 150,
            thumbnailHeight: 150,
            clickable: dropzoneRef.current,
            paramName: "file",
            addRemoveLinks: true,
          };
          console.log("Adding existing image:", mockFile);
          console.log("Adding existing image:", mockFile.dataURL);
          // Emit Dropzone events to add the file and show the thumbnail
          dropzoneInstanceRef.current.emit("addedfile", mockFile);
          dropzoneInstanceRef.current.emit(
            "thumbnail",
            mockFile,
            mockFile.dataURL,
            mockFile.name
          );
          dropzoneInstanceRef.current.emit("complete", mockFile);

          // Optionally, mark as already uploaded
          mockFile.status = Dropzone.SUCCESS;
        });
      }

      dropzoneInstanceRef.current.on("addedfile", (file) => {
        // Only add real files (not mock files) to state
        if (file.kind !== "existing") {
          setImages((prev) => [...prev, file]);
        }
      });
      dropzoneInstanceRef.current.on("removedfile", (file) => {
        setImages((prev) =>
          prev.filter((img) =>
            // Remove by name for mock files, by reference for real files
            file.kind === "existing" ? img !== file.dataURL : img !== file
          )
        );
      });
    }
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

    if (form.bedrooms < 1 || form.bathrooms < 1 || form.price < 1) {
      alert("Please ensure Bedrooms, Bathrooms, and Price are at least 1");
      return;
    }

    const formData = {
      ...form,
      amenities:
        typeof form.amenities === "string"
          ? form.amenities.split(",").map((s) => s.trim())
          : form.amenities,
      images: [],
    };

    try {
      // Separate existing image URLs and new image files
      const existingImageURLs = images.filter((img) => typeof img === "string");
      const newFiles = images.filter((img) => typeof img !== "string");

      // Upload new files to Cloudinary
      const uploadPromises = newFiles.map(async (file) => {
        const imgForm = new FormData();
        imgForm.append("image", file);

        const res = await fetch("/api/listing/upload", {
          method: "POST",
          body: imgForm,
        });

        const data = await res.json();
        return data.imageUrl;
      });

      const uploadedImageURLs = await Promise.all(uploadPromises);
      formData.images = [...existingImageURLs, ...uploadedImageURLs];
      formData._id = listing._id;

      const res = await fetch(`/api/listing/edit/listing/${listing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to update listing: " + (data.message || res.statusText));
        return;
      }

      alert("Successfully updated your listing!");
      navigate("/view/listings");
    } catch (err) {
      console.error("Update failed:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleAddAmenity = () => {
    const input = document.getElementById("amenities");
    const newAmenity = input.value.trim();
    input.value = "";
    if (!newAmenity) return;

    const current = form.amenities.split(",").map((a) => a.trim()) || [];
    if (current.includes(newAmenity)) return alert("Amenity already exists");
    setForm((prevForm) => ({
      ...prevForm,
      amenities: current.concat(newAmenity).join(", "),
    }));
  };

  const removeAmenity = (e) => {
    const amenityToRemove = e.target.textContent.trim().slice(0, -1);
    const updated = form.amenities
      .split(",")
      .filter((a) => a.trim() !== amenityToRemove)
      .join(", ");
    setForm((prevForm) => ({ ...prevForm, amenities: updated }));
    e.stopPropagation();
  };

  return (
    <div className="px-4">
      <Nav type={"create"} />
      <Button slot={"View my listings"} href={"/view/listings"} />
      <div className="flex flex-col items-center justify-center mt-4">
        <h2>Edit Listing: {listing.listing_name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              slot={"Listing Name"}
              styles={"w-100"}
              id={"listing_name"}
              onChange={(e) => handleChange(e)}
              required
              value={form.listing_name}
            />
            <Input
              slot={"Location"}
              styles={"w-100"}
              required
              id={"location"}
              onChange={(e) => handleChange(e)}
              type={"selectLocation"}
              value={form.location}
            />
            <Input
              slot={"Description"}
              type={"textarea"}
              styles={"fs-7 h-30 w-100"}
              id={"description"}
              onChange={(e) => handleChange(e)}
              value={form.description}
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
                value={form.bedrooms}
              />
              <Input
                slot={"Baths"}
                type={"number"}
                styles={"max-w-[80px]"}
                placeholder={" "}
                id={"bathrooms"}
                onChange={(e) => handleChange(e)}
                required
                value={form.bathrooms}
              />
              <Input
                slot={"Type"}
                type={"select"}
                id={"type"}
                onChange={(e) => handleChange(e)}
                styles={"max-w-[22vw] lg:max-w-[25vw]"}
                required
                value={form.type}
              />
            </div>
            <Input
              slot={"Price"}
              styles={"w-100"}
              type={"number"}
              id={"price"}
              onChange={(e) => handleChange(e)}
              placeholder={"Price per night"}
              required
              value={form.price}
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
                    {form.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="items-center flex bg-gray-700 text-white text-indigo-800 px-2 py-1 rounded-2 gap-2 text-sm hover:bg-gray-500 duration-200 cursor-pointer"
                        onClick={(e) => removeAmenity(e)}
                      >
                        {amenity}
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
                  name="cleaning"
                  type="checkbox"
                  className="scale-200"
                  onChange={(e) => handleChange(e)}
                  style={{ accentColor: "rgb(255, 63,71)" }}
                  onClick={() => {
                    form.service = !form.service;
                    setForm({ ...form });
                  }}
                  checked={form.service}
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
                  onClick={() => {
                    form.cleaning = !form.cleaning;
                    setForm({ ...form });
                  }}
                  checked={form.cleaning}
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
              slot={"Update"}
              styles={"w-[25vw] max-w-[400px] min-w-[200px] mt-5"}
              onClick={(e) => handleSubmit(e)}
            />
            <BlueButton
              slot={"Cancel"}
              styles={
                "w-[25vw] max-w-[400px] min-w-[200px] mt-5 bg-red-600 hover:bg-red-700"
              }
              onClick={() => {
                alert("Changes will not be saved");
                navigate("/view/listings");
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
