import React from "react";
import Nav from "../../Layout/Nav";
import Footer from "../../Layout/Footer";
import PaymentCard from "../../Layout/PaymentCard";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DetailsCard from "../../Layout/DetailsCard";
import TagOffers from "../../Layout/TagOffers";
import Button from "../../Layout/Button";
import Calendar from "../../Layout/Calendar";
import Comment from "../../Layout/Comment";
import Progressbar from "../../Layout/Progressbar";
import Explore from "../../Layout/Explore";
import { useLocation } from "react-router-dom";

const ListingPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const listing = location.state?.listing || null;
  return (
    <div>
      <div className="px-6">
        <Nav type={"listing"} />
        <div className="mb-10">
          <h1 className="mb-3">{listing.title}</h1>
          <div className="flex justify-between items-center">
            <div className="flex align-items-center gap-2 fw-semibold text-gray-400">
              <StarTwoToneIcon className="text-red-500 pr-1" />
              <p className="text-gray-950">{5.0}</p>
              <p>•</p>
              <p className="underline text-gray-950">{123} reviews</p>
              <p className="hidden md:block">•</p>
              <p className="hidden md:block">
                <WorkspacePremiumTwoToneIcon className="text-red-500" />
              </p>
              <p className="hidden md:block">Superhost</p>
              <p className="hidden md:block">•</p>
              <p className="hidden md:block">{listing.location}</p>
            </div>
            <div className="flex align-items-center gap-4 fw-semibold text-gray-950">
              <p className="flex items-center gap-1">
                <IosShareIcon className="fs-5" />
                Share
              </p>
              <p className="flex items-center gap-1">
                <FavoriteBorderIcon className="fs-5" />
                Save
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4">
          <div className="max-h-[600px] overflow-hidden rounded-4 hover:scale-102 duration-300 ">
            <img
              src={`http://localhost:3000/${listing.images[0]}`}
              alt="Airbnb picture"
              className="cursor-pointer w-full"
            />
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-2 max-h-[600px] overflow-hidden rounded-4">
            <img
              src={`http://localhost:3000/${listing.images[0]}`}
              alt="Airbnb picture"
              className="hover:scale-102 duration-300 cursor-pointer w-full overflow-hidden h-100"
            />
            <img
              src={`http://localhost:3000/${listing.images[0]}`}
              alt="Airbnb picture"
              className="hover:scale-102 duration-300 cursor-pointer  overflow-hidden h-100 w-full hidden md:block w-100"
            />
            <img
              src={`http://localhost:3000/${listing.images[0]}`}
              alt="Airbnb picture"
              className="hover:scale-102 duration-300 cursor-pointer  overflow-hidden h-100  w-full hidden md:block"
            />
            <img
              src={`http://localhost:3000/${listing.images[0]}`}
              alt="Airbnb picture"
              className="hover:scale-102 duration-300 cursor-pointer  overflow-hidden h-100  w-full hidden md:block"
            />
          </div>
        </div>

        <div className="flex w-full justify-between flex-col-reverse lg:flex-row">
          <div className="w-3/3 lg:w-3/5">
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300/40">
              <span>
                <h2>
                  Entire {listing.type} unit hosted by {user.username}
                </h2>
                <p className="text-gray-400">
                  {listing.bedrooms} - {listing.bedrooms * 2} guests •{" "}
                  {listing.bedrooms} bedroom • {listing.bathrooms} baths
                </p>
              </span>
              <span className="relative">
                <WorkspacePremiumTwoToneIcon className="text-red-500 fs-3 absolute bottom-0 right-0" />
                <img
                  src="/assets/Hosts/Sarah.png"
                  alt="Person icon"
                  className="w-[56px] h-[56px] rounded-circle"
                />
              </span>
            </div>
            <div className="py-4 border-b-2 border-gray-300/40">
              <DetailsCard Home />
              <DetailsCard Clean />
              <DetailsCard CheckIn />
              <DetailsCard Cancel />
            </div>
            <div className="py-4 border-b-2 border-gray-300/40">
              <p className="py-1 fw-semibold">
                {/* Come and stay in this superb duplex T2, in the heart of the
                historic center of Cape Town. Spacious and bright, in a real
                Cape Town building in exposed stone, you will enjoy all the
                charms of the city thanks to its ideal location. Close to many
                shops, bars and restaurants, you can access the apartment by
                tram A and C and bus routes 34 and 56. */}
                {listing.description}
              </p>
            </div>
            <div className="py-4 border-b-2 border-gray-300/40 fw-semibold">
              <h3>Where you'll sleep</h3>
              <img
                src="/assets/Bedrooms/Bedroom1.png"
                alt="Bedroom Pic"
                className="h-[250px] rounded-4 mt-4 mb-3 cursor-pointer hover:scale-102 duration-300"
              />
              <span className="fs-5">Bedroom</span>
              <p>1 queen bed</p>
            </div>
            <div className="py-4 border-b-2 border-gray-300/40">
              <h3>What this place offers</h3>
              <div className="grid grid-cols-2 gap-2 fw-semibold">
                {listing.tags.map((tag, index) => (
                  <TagOffers key={index} slot={tag} />
                ))}
                <span className="mt-4 border-2 border-gray-400 w-fit rounded-50 shadow-md/25 hover:scale-102 duration-300">
                  <Button slot={"Show all amenities"} />
                </span>
              </div>
            </div>
            <div className="py-4">
              <h3 className="mb-0 pt-2">{7} Nights in Cape Town</h3>
              <p className="text-gray-400">
                {new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  Date.now() + 14 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
              <div className="pt-5 pb-4">
                <Calendar />
              </div>
            </div>
            <div className="py-4 border-y-2 border-gray-300/40 w-3/3 lg:w-5/3">
              <h3 className="flex">
                <StarTwoToneIcon className="text-red-500 fs-2 mr-2" /> {"5.0"} •{" "}
                {123} reviews
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-15 gap-y-4 mt-5 fw-semibold">
                <div className="flex justify-between mb-2">
                  <span>Cleanliness</span>
                  <span className="flex items-center gap-2">
                    <Progressbar progress={5} />
                    <span>5.0</span>
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Accuracy</span>
                  <span className="flex items-center gap-2">
                    <Progressbar progress={4.5} />
                    <span>4.5</span>
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Communication</span>
                  <span className="flex items-center gap-2">
                    <Progressbar progress={4.7} />
                    <span>4.7</span>
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Check-in</span>
                  <span className="flex items-center gap-2">
                    <Progressbar progress={3.2} />
                    <span>3.2</span>
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Value</span>
                  <span className="flex items-center gap-2">
                    <Progressbar progress={5} />
                    <span>5.0</span>
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Location</span>
                  <span className="flex items-center gap-2">
                    <Progressbar progress={4.9} />
                    <span>4.9</span>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 mb-5">
                <Comment number={1} />
                <Comment number={2} />
                <Comment number={2} />
                <Comment number={1} />
                <Comment number={1} />
                <Comment number={2} />
              </div>
              <Button
                slot={"Show all reviews"}
                className="w-fit border-2 border-gray-400 rounded-50 shadow-md/25 hover:scale-102 duration-300"
              />
            </div>
            <div className="py-4 border-y-2 border-gray-300/40 w-3/3 lg:w-5/3 mt-5">
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <WorkspacePremiumTwoToneIcon className="text-red-500 fs-3 absolute bottom-0 right-0" />
                  <img
                    src={`/assets/Hosts/Sarah.png`}
                    alt="Profile Pic"
                    className="h-[56px] w-[56px] rounded-circle"
                  />
                </div>
                <div>
                  <h3 className="mb-0">Hosted by {user.username}</h3>
                  <p className="text-gray-500">Joined September 2023</p>
                </div>
              </div>
              <div className="flex gap-3 mt-3 fw-bold text-red-500 p-3 pb-2 bg-gray-100 shadow-md/30 w-fit rounded-xl hover:scale-103 duration-500 cursor-pointer">
                <span className="flex align-center">
                  <h4 className="fs-5 mr-2 fw-bold">
                    {Math.ceil(Math.random() * 100)}
                  </h4>{" "}
                  reviews
                </span>
                <span>|</span>
                <span>Identity verified</span>
                <span>|</span>
                <span>Superhost</span>
              </div>
              <div className="flex flex-col gap-4 fw-semibold text-gray-400 mt-4">
                <h4 className="fs-5 text-black">
                  {user.username} is a Superhost
                </h4>
                <p className="max-w-[45vw]">
                  Superhosts are experienced, highly rated hosts who are
                  commited to providing neat stays for guests.
                </p>
                <p>Response rate: 100%</p>
                <p className="mb-2">Response time: within an hour</p>
                <Button
                  slot={"Contact Host"}
                  style={"py-3 rounded-3 border-2 border-gray-700/60"}
                />
              </div>
              <p className="mt-2 flex text-gray-500 fw-bold">
                Note: DO NOT transfer money outside of the platform.
              </p>
            </div>
            <div className="pt-4 pb-5 w-3/3 lg:w-5/3 mt-2">
              <h3>Things to know</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
                <div className="flex flex-col gap-1">
                  <h4 className="fs-5 mb-2">House rules</h4>
                  <ul className="list-disc text-gray-500">
                    <li>Check-in: After 3 PM</li>
                    <li>Check-out: Before 11 AM</li>
                    <li>No smoking</li>
                    <li>No parties</li>
                    <li>No children</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="fs-5 mb-2">Health and safety</h4>
                  <ul className="list-disc text-gray-500">
                    <li>Commited to Airbnb's enhanced cleaning process</li>
                    <li>Smoke alarm</li>
                    <li>Carbon monoxide detector</li>
                    <li>Fire extinguisher</li>
                    <li>First aid kit</li>
                  </ul>
                  <span className="fw-semibold underline mt-1 cursor-pointer">
                    Show more
                  </span>
                </div>
                <div className="flex flex-col gap-1 pl-3">
                  <h4 className="fs-5 mb-2">Cancellation policy</h4>
                  <p className="text-gray-500">
                    Free cancellation for 48 hours
                  </p>
                  <span className="fw-semibold underline mt-2 cursor-pointer">
                    Show more
                  </span>
                </div>
              </div>
            </div>
          </div>
          <PaymentCard
            user={user}
            price={listing.price}
            bedrooms={listing.bedrooms}
            cleaning={listing.cleaning}
            service={listing.service}
            host={listing.hostId}
            listing_id={listing.id}
          />
        </div>
      </div>
      <Explore padding={"px-6"} />
      <Footer padding={"px-6"} />
    </div>
  );
};

export default ListingPage;
