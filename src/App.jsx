import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/Pages/Home/HomePage";
import SearchPage from "./Components/Pages/Search/SearchPage";
import ListingPage from "./Components/Pages/Listing/ListingPage";
import LoginPage from "./Components/Pages/Login/LoginPage";
import CreateListing from "./Components/Pages/Listing/CreateListing";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Routes>
          <Route path="/listing/:id" element={<ListingPage />} />
        </Routes>
        <Routes>
          <Route path="/create/listing" element={<CreateListing />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
