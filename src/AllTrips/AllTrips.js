import "./AllTrips.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AllTrips = ({ urlBase, currentTraveller, travellerId }) => {
console.log(currentTraveller)
    const [trips, setTrips] = useState([])

    const showTrips = () => {
        fetch(`${urlBase}/traveller/${travellerId}`)
            .then((response) => response.json())
            .then((data) => setTrips(data.traveller.trips))
    }

    useEffect(() => {
        if(currentTraveller!=="") {
            showTrips();
            console.log("fetch")
        }
    }, [currentTraveller])

  return (
    <div className="all-trips">
      <h1>Your Trips</h1>
      {currentTraveller === "" ? (
        <div>
          <h3>
            Please <Link to="/">sign in</Link> to view and update your trips!
          </h3>
        </div>
      ) : (
        <div>
          <div className="current-traveller">
            Current Traveller: {currentTraveller.name}
          </div>
          <h1>{trips[0].name}</h1>
        </div>
      )}
    </div>
  );
};

export default AllTrips;
