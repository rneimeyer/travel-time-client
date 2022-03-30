import "./AllTrips.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const AllTrips = ({ urlBase, currentTraveller, travellerId }) => {
console.log(currentTraveller)
    const [trips, setTrips] = useState([])

    const showTrips = () => {
        fetch(`${urlBase}/traveller/${travellerId}`)
            .then((response) => response.json())
            .then((data) => setTrips(data.traveller.trips))
    }

    const yourTrips = trips.map((trip) => {
        return (
            <div key={trip._id}>
                <Card>
                    <Card.Body>
                        <Card.Title>{trip.name}</Card.Title>
                        <Card.Text>Budget: {trip.budget}</Card.Text>
                        <Card.Text>Start Date: {trip.start_date}</Card.Text>
                        <Card.Text>End Date: {trip.end_date}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    })

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
          {yourTrips}
        </div>
      )}
    </div>
  );
};

export default AllTrips;
