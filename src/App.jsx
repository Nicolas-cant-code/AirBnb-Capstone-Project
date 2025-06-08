import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/Pages/Home/HomePage";
import SearchPage from "./Components/Pages/Search/SearchPage";
import ListingPage from "./Components/Pages/Listing/ListingPage";

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
      </Router>
    </div>
  );
}

export default App;
