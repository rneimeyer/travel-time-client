import "./App.css";
import apiUrl from "./apiUrl"
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import AllTrips from "./AllTrips/AllTrips";
import About from "./About/About";
import Trip from "./Trip/Trip";

function App() {
  const urlBase = apiUrl;

  const [traveller, setTraveller] = useState({name: "", email: ""});
  const [travellers, setTravellers] = useState([]);
  const [currentTraveller, setCurrentTraveller] = useState("");
  const [travellerId, setTravellerId] = useState("");
  const [currentTripId, setCurrentTripId] = useState("");

  useEffect(() => {
    fetch(`${urlBase}/traveller/`)
    .then((response)=>response.json())
    .then((data) => setTravellers(data.traveller));
  }, []);

  const cleanDate = (date) => {
    const d = new Date(date);
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][d.getUTCMonth()];
    let newDate = month + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
    return newDate;
  };

  return (
    <div className="App">
      <Header currentTraveller={currentTraveller} />
      <main>
        <Routes>
          <Route path="/" element={<Home urlBase={urlBase} traveller={traveller} setTraveller={setTraveller} travellers={travellers} setTravellers={setTravellers} currentTraveller={currentTraveller} setCurrentTraveller={setCurrentTraveller} travellerId={travellerId} setTravellerId={setTravellerId}/>} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/all-trips" element={<AllTrips urlBase={urlBase} currentTraveller={currentTraveller} travellerId={travellerId} setCurrentTripId={setCurrentTripId} cleanDate={cleanDate} />} />
          <Route path="/about" element={<About />} />
          <Route path="/all-trips/:trip" element={<Trip urlBase={urlBase} currentTripId={currentTripId} setCurrentTripId={setCurrentTripId} cleanDate={cleanDate} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
