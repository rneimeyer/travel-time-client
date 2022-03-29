import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import AllTrips from "./AllTrips/AllTrips";
import About from "./About/About";

function App() {
  const urlBase = "http://localhost:4000";

  const [traveller, setTraveller] = useState({name: "", email: ""});
  const [travellers, setTravellers] = useState([]);
  const [currentTraveller, setCurrentTraveller] = useState("");

  useEffect(() => {
    fetch(`${urlBase}/traveller/`)
    .then((response)=>response.json())
    .then((data) => setTravellers(data.traveller));
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home urlBase={urlBase} traveller={traveller} setTraveller={setTraveller} travellers={travellers} setTravellers={setTravellers} currentTraveller={currentTraveller} setCurrentTraveller={setCurrentTraveller} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/all-trips" element={<AllTrips />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
