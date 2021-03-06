import "./AllTrips.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import plane_wing from "./../assets/plane_wing.png";

const AllTrips = ({
  urlBase,
  cleanDate,
  currentTraveller,
  travellerId,
  setCurrentTripId,
}) => {
  const [trips, setTrips] = useState([]);
  const [show, setShow] = useState(false);
  const [newTrip, setNewTrip] = useState({
    name: "",
    budget: Number,
    start_date: Date,
    end_date: Date,
  });
  const [refresh, setRefresh] = useState(false);

  const showTrips = () => {
    fetch(`${urlBase}/traveller/${travellerId}`)
      .then((response) => response.json())
      .then((data) => setTrips(data.traveller.trips));
  };

  const putNewTrip = (trip) => {
    const newTripCopy = [...trips];
    newTripCopy.push(trip);
    let data = {
      trips: newTripCopy,
    };
    fetch(`${urlBase}/traveller/${travellerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => setRefresh(!refresh));
  };

  const getTrip = (event) => {
    let id = event.target.id;
    fetch(`${urlBase}/trip/${id}`)
      .then((response) => response.json())
      .then((data) => setCurrentTripId(data.trip._id));
  };

  const handleDelete = (event) => {
    let id = event.target.id;
    fetch(`${urlBase}/trip/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setRefresh(!refresh));
  };

  for (let i = 0; i < trips.length; i++) {
    trips.sort((a, b) => {
      if (a.start_date < b.start_date) {
        return -1;
      }
      if (a.start_date > b.start_date) {
        return 1;
      }
      return 0;
    });
  }

  const yourTrips = trips.map((trip) => {
    let startDate = cleanDate(trip.start_date);
    let endDate = cleanDate(trip.end_date);
    return (
      <div key={trip._id} className="individual-trip">
        <Card style={{ width: "15rem" }} className="mx-auto card">
          <Card.Body>
            <Card.Title>{trip.name}</Card.Title>
            <Card.Text>Budget: ${trip.budget}</Card.Text>
            <Card.Text>Start Date: {startDate}</Card.Text>
            <Card.Text>End Date: {endDate}</Card.Text>
            <Link to={"/all-trips/" + trip.name}>
              <Button onClick={getTrip} id={trip._id}>
                View Trip Details
              </Button>
            </Link>
            <Button onClick={handleDelete} id={trip._id}>
              Delete Trip
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentTraveller !== "") {
      showTrips();
    }
  }, [currentTraveller, refresh]);

  const handleTripChange = (event) => {
    event.persist();
    setNewTrip((prevNewTrip) => {
      const editedNewTrip = {
        ...prevNewTrip,
        [event.target.name]: event.target.value,
      };
      return editedNewTrip;
    });
  };

  const addTrip = (event) => {
    event.preventDefault();
    fetch(`${urlBase}/trip/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newTrip),
    })
      .then((response) => response.json())
      .then((data) => putNewTrip(data.trip))
      .then(() =>
        setNewTrip({
          name: "",
          budget: Number,
          start_date: Date,
          end_date: Date,
        })
      )
      .then(() => handleClose());
  };

  return (
    <div className="all-trips">
      {currentTraveller === "" ? (
        <div>
          <div className="no-traveller">
            <h1>Your Trips</h1>
            <h3>
              Please{" "}
              <Link className="home-link" to="/">
                sign in
              </Link>{" "}
              to view and update your trips!
            </h3>
          </div>
          <img
            className="plane-wing"
            src={plane_wing}
            alt="plane wing over city"
          />
        </div>
      ) : (
        <div>
          <h1 className="current-traveller">{currentTraveller.name}'s Trips</h1>
          <Button onClick={handleShow}>Add a Trip</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Your Next Trip!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={addTrip}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Trip name"
                    name="name"
                    onChange={handleTripChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Budget</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Enter budget"
                      name="budget"
                      onChange={handleTripChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="start_date"
                    onChange={handleTripChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    name="end_date"
                    onChange={handleTripChange}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Body>
          </Modal>
          <div className="trip-box">{yourTrips}</div>
        </div>
      )}
    </div>
  );
};

export default AllTrips;
