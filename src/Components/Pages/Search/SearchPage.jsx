import React from "react";
import Nav from "../../Layout/Nav";
import NavTags from "../../Layout/NavTags";
import SearchResult from "../../Layout/SearchResult";

const SearchPage = () => {
  return (
    <div className="px-4">
      <div className="bg-white">
        <Nav type={"search"} />
        <NavTags />
      </div>
      <div className="pt-5 pb-4">
        <h4 className="fs-4 text-light-grey">200+ stays in Cape Town</h4>
      </div>
      <div>
        <SearchResult
          favourite
          title={"Cape Town Getaway"}
          img={"Bnb1.png"}
          tags={"Beach · Sunset · Wifi · Kitchen"}
          rating={"4.5"}
          description={"3-6 guests · 3 bedrooms · 2 bath"}
          price={"3,500"}
          reviewCount={120}
        />
      </div>
    </div>
  );
};

export default SearchPage;
