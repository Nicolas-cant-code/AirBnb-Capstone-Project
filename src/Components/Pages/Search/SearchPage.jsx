import React from "react";
import Nav from "../../Layout/Nav";
import NavTags from "../../Layout/NavTags";
import SearchResult from "../../Layout/SearchResult";

const SearchPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const type = user ? user.type : null;
  return (
    <div className="px-4">
      <div className="bg-white">
        <Nav type={"search"} />
        <NavTags />
      </div>
      <div className="pt-5 pb-4">
        <h4 className="fs-4 text-light-grey">200+ stays in Cape Town</h4>
      </div>
      <div className="pb-3">
        <SearchResult
          favourite
          title={"Cape Town Getaway"}
          img={"Bnb1.png"}
          tags={"Beach · Sunset · Wifi · Kitchen"}
          rating={"4.5"}
          description={"3-6 guests · 3 bed · 2 bath"}
          price={"3,500"}
          reviewCount={120}
          type={type}
          user={user}
          id={1}
        />
        <SearchResult
          favourite={null}
          title={"Cape Town Getaway"}
          img={"Bnb1.png"}
          tags={"Beach · Sunset · Wifi · Kitchen"}
          rating={"4.5"}
          description={"3-6 guests · 3 bed · 2 bath"}
          price={"4,500"}
          type={type}
          reviewCount={120}
          user={user}
          id={2}
        />
        <SearchResult
          favourite={null}
          title={"Cape Town Getaway"}
          img={"Bnb1.png"}
          tags={"Beach · Sunset · Wifi · Kitchen"}
          rating={"4.5"}
          description={"3-6 guests · 3 bed · 2 bath"}
          price={"7,200"}
          reviewCount={120}
          type={type}
          user={user}
          id={3}
        />
      </div>
    </div>
  );
};

export default SearchPage;
