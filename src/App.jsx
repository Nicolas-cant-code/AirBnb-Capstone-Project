import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import HomePage from "./Components/Pages/Home/HomePage";
import SearchPage from "./Components/Pages/Search/SearchPage";
import ListingPage from "./Components/Pages/Listing/ListingPage";
import LoginPage from "./Components/Pages/Login/LoginPage";
import CreateListing from "./Components/Pages/Listing/CreateListing";
import ViewListings from "./Components/Pages/Listing/ViewListings";
import Reservations from "./Components/Pages/Host/Reservations";
import SignUp from "./Components/Pages/Login/SignUp";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [type, setType] = useState(null);

  // On mount, check if user token/info exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setType(JSON.parse(storedUser).type);
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          {type === "host" && (
            <>
              <Route path="/create/listing" element={<CreateListing />} />
              <Route path="/view/listings" element={<ViewListings />} />
              <Route path="/view/reservations" element={<Reservations />} />
            </>
          )}
          {!user && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
