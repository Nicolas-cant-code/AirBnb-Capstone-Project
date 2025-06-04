import React from "react";
import Nav from "../../Layout/Nav";
import Footer from "../../Layout/Footer";
import Search from "../../Layout/Search";

const HomePage = () => {
  return (
    <div>
      <div className="px-7 bg-black">
        <Nav type={"home"} />
        <Search />
      </div>
      <div className="px-7"></div>
      <Footer padding={"px-7"} />
    </div>
  );
};

export default HomePage;
