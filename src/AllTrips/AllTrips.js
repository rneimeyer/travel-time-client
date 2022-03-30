import "./AllTrips.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import plane_wing from "./../assets/plane_wing.png"

const AllTrips = ({ urlBase, currentTraveller, travellerId, currentTrip, setCurrentTrip }) => {
console.log(currentTraveller)
    const [trips, setTrips] = useState([])

    const showTrips = () => {
        fetch(`${urlBase}/traveller/${travellerId}`)
            .then((response) => response.json())
            .then((data) => setTrips(data.traveller.trips))
    }

    const cleanDate = (date) => {
        const d = new Date(date);
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];
        let newDate = month + " " + d.getDate() + ", " + d.getFullYear();
        return newDate;
    }

    const getTrip = (event) => {
        let id=event.target.id
        fetch(`${urlBase}/trip/${id}`)
        .then((response) => response.json())
        .then((data) => setCurrentTrip(data.trip))
    }

    const yourTrips = trips.map((trip) => {
        let startDate = cleanDate(trip.start_date)
        let endDate = cleanDate(trip.end_date)
        return (
            <div key={trip._id}>
                <Card style={{width: "15rem"}} className="mx-auto card">
                    <Card.Body>
                        <Card.Title>{trip.name}</Card.Title>
                        <Card.Text>Budget: {trip.budget}</Card.Text>
                        <Card.Text>Start Date: {startDate}</Card.Text>
                        <Card.Text>End Date: {endDate}</Card.Text>
                        <Button onClick={getTrip} id={trip._id}><Link to={"/all-trips/" + trip.name}>View Trip</Link></Button>
                        <Button>Delete Trip</Button>
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
            Please <Link className="home-link" to="/">sign in</Link> to view and update your trips!
          </h3>
          <img className="plane-wing" src={plane_wing} alt="plane wing over city" />
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
