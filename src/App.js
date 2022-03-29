import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import AllTrips from "./AllTrips/AllTrips";
import About from "./About/About";

function App() {
  const [user, setUser] = useState("");
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
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
