import React from "react";
import Nav from "../../Layout/Nav";
import NavTags from "../../Layout/NavTags";
import SearchResult from "../../Layout/SearchResult";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = location.state?.listings || null;

  if (!searchParams) {
    alert("No search results found. Please try again.");
    navigate("/");
    return;
  }

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
        {searchParams.map((element) => (
          <SearchResult
            key={element._id}
            title={element.listing_name}
            images={element.images}
            type={element.type}
            location={element.location}
            tags={element.amenities || ""}
            description={element.description}
            service={element.service}
            cleaning={element.cleaning}
            price={element.price}
            id={element._id}
            bathrooms={element.bathrooms}
            bedrooms={element.bedrooms}
            user={user}
            hostId={element.host_id}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
