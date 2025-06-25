import React from "react";
import Nav from "../../Layout/Nav";
import Footer from "../../Layout/Footer";
import Search from "../../Layout/Search";
import ImageCard from "../../Layout/ImageCard";
import CityCard from "../../Layout/CityCard";
import GridField from "../../Layout/GridField";

const HomePage = () => {
  return (
    <div>
      <div className="px-7 bg-black">
        <Nav type={"home"} />
        <Search />
        <div className="pb-25">
          <ImageCard
            img={"Home_bg.jpg"}
            imgStyle={"min-h-[640px] rounded-xl px-3"}
            title={"Not sure where to go? Perfect."}
            buttonText={"I'm flexible"}
            titleStyle={"font-bold justify-self-center pt-120 pb-2"}
            buttonStyle={
              "rounded-50 text-fuchsia-600 flex justify-self-center bg-gray-100"
            }
          />
          <span className="px-25 py-3 bg-gray-400 text-center flex justify-self-center mt-9 cursor-pointer"></span>
        </div>
      </div>
      <div className="px-7">
        <h2 className="pt-15 pb-4">Inspiration for your next trip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <CityCard
            img={"City1.jpg"}
            city={"Joburg City Hotel"}
            dist={"376 km"}
            colour={"bg-red-600"}
          />
          <CityCard
            img={"City2.jpg"}
            city={"Cape Town Hotel"}
            dist={"24 km"}
            colour={"bg-pink-600"}
          />
          <CityCard
            img={"City3.jpg"}
            city={"Monkey Valley Hotel"}
            dist={"107 km"}
            colour={"bg-pink-700"}
          />
          <CityCard
            img={"City4.jpg"}
            city={"Durban Beach Hotel"}
            dist={"77 km"}
            colour={"bg-red-700"}
          />
        </div>

        <div>
          <h2 className="pt-15 pb-4">Discover AirBnb Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ImageCard
              img={"Online_bg.jpg"}
              imgStyle={"min-h-[500px] pl-12 pt-15 rounded"}
              title={"Things to do on your trip"}
              buttonText={"Experiences"}
              titleStyle={"font-bold pb-4 max-w-60 fs-1"}
              buttonStyle={"rounded flex px-4 bg-gray-100 text-black"}
            />
            <ImageCard
              img={"Trip_bg.jpg"}
              imgStyle={"min-h-[500px] pt-15 pl-12 rounded"}
              title={"Things to do from home"}
              buttonText={"Online Experiences"}
              titleStyle={"font-bold pb-4 max-w-60 fs-1"}
              buttonStyle={"rounded flex px-4 bg-gray-100 text-black"}
            />
          </div>

          <div className="pt-15 pb-5 flex align-items-center">
            <div className="w-3/1 md:w-2/3">
              <h2 className="pb-4 pt-2">Shop Airbnb gift cards</h2>
              <button className="rounded flex px-4 py-2 text-white bg-black hover:bg-gray-600 hover:scale-105 transition-transform duration-300">
                Learn more
              </button>
            </div>
            <div className="">
              <img
                src="/assets/bg-images/GiftCards_bg.jpg"
                alt="Gift Card Image"
                className="w-3/4 justify-self-end"
              />
            </div>
          </div>

          <div className="mt-5 pb-12">
            <ImageCard
              img={"Questions_bg.jpg"}
              imgStyle={"h-[640px] pl-15 rounded-xl"}
              title={"Questions about hosting?"}
              buttonText={"Ask a Superhost"}
              titleStyle={"font-bold pt-10 pb-40 max-w-60 fs-4 md:fs-2 lg:fs-1"}
              buttonStyle={"rounded text-black py-3 bg-gray-100"}
            />
          </div>

          <div className="mt-15">
            <h2>Inspiration for future getaways</h2>
            <div className="flex justify-between text-gray-400 borders cursor-pointer gap-3">
              <span className="text-black border-b-2 border-black hidden md:block">
                Destinations for outdoor adventure
              </span>
              <span className="lg:block hidden">Destinations for culture</span>
              <span className="border-b-2 md:border-none text-gray-950 md:text-gray-400">
                Mountain cabins
              </span>
              <span>Beach getaways</span>
              <span>Popular destinations</span>
              <span>Unique stays</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-40">
              <GridField name={"Pheonix"} area={"Arizona"} />
              <GridField name={"Hot Springs"} area={"Arizona"} />
              <GridField name={"Los Angeles"} area={"California"} />
              <GridField name={"San Diego"} area={"California"} />
              <GridField name={"Prague"} area={"Czech Republic"} />
              <GridField name={"Washington"} area={"United States"} />
              <GridField name={"London"} area={"United Kingdom"} />
              <GridField name={"Cape Town"} area={"South Africa"} />
              <GridField name={"Keswick"} area={"United Kingdom"} />
              <GridField name={"Johannesburg"} area={"South Africa"} />
              <GridField name={"Barcelona"} area={"Spain"} />
              <GridField name={"Show more"} area={"Show more"} />
            </div>
          </div>
        </div>
      </div>
      <Footer padding={"px-7"} />
    </div>
  );
};

export default HomePage;
