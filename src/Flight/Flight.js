import "./Flight.css";
import { Button, Form, Modal, InputGroup, Card } from "react-bootstrap";
import { useState } from "react";

const Flight = ({
  urlBase,
  flights,
  tripId,
  cleanDate,
  refresh,
  setRefresh,
  flightSum,
  setFlightSum,
}) => {
  console.log(flights);

  const [show, setShow] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flight_type: "",
    airline: "",
    flight_number: "",
    date: Date,
    starting_airport: "",
    ending_airport: "",
    departure_time: "",
    arrival_time: "",
    price: Number,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const putNewFlight = (flight) => {
    const newFlightCopy = [...flights];
    newFlightCopy.push(flight);
    let data = {
      flights: newFlightCopy,
    };
    fetch(`${urlBase}/trip/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleDelete = (event) => {
    let id = event.target.id;
    fetch(`${urlBase}/flight/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setRefresh(!refresh));
  };

  for (let i = 0; i < flights.length; i++) {
    flights.sort((a, b) => {
      console.log(a.date, b.date);
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      if (a.date === b.date) {
        if (a.departure_time < b.departure_time) {
          return -1;
        }
        if (a.departure_time > b.departure_time) {
          return 1;
        }
      }
      return 0;
    });
  }

  let total = 0;

  const yourFlights = flights.map((flight) => {
    total += flight.price;
    return (
      <div key={flight._id} className="box">
        <Card>
          <Card.Body>
            <Card.Title className="hotel-flight-name">
              {flight.airline}
            </Card.Title>
            <Card.Text style={{ background: "#f9b8ad8f" }}>
              {flight.flight_type}
            </Card.Text>
            <Card.Text>Flight Number: {flight.flight_number}</Card.Text>
            <Card.Text>{cleanDate(flight.date)}</Card.Text>
            <Card.Text>
              Departure:{" "}
              <span className="airport">{flight.starting_airport}</span>,{" "}
              {flight.departure_time}
            </Card.Text>
            <Card.Text>
              Arrival: <span className="airport">{flight.ending_airport}</span>,{" "}
              {flight.arrival_time}
            </Card.Text>
            <Card.Text>Price: ${flight.price}</Card.Text>
            <Button onClick={handleDelete} id={flight._id}>
              Delete Flight
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });

  setFlightSum(total);
  console.log(flightSum);

  const handleFlightChange = (event) => {
    event.persist();
    setNewFlight((prevNewFlight) => {
      const editedNewFlight = {
        ...prevNewFlight,
        [event.target.name]: event.target.value,
      };
      return editedNewFlight;
    });
  };

  const addFlight = (event) => {
    event.preventDefault();
    fetch(`${urlBase}/flight/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newFlight),
    })
      .then((response) => response.json())
      .then((data) => putNewFlight(data.flight))
      .then(() =>
        setNewFlight({
          flight_type: "",
          airline: "",
          flight_number: "",
          date: Date,
          starting_airport: "",
          ending_airport: "",
          departure_time: "",
          arrival_time: "",
          price: Number,
        })
      )
      .then(() => setRefresh(!refresh))
      .then(() => handleClose());
  };

  return (
    <div>
      <div className="section-title">
        <h3>Flights</h3>
        <Button onClick={handleShow}>Add a Flight</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Flight!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addFlight}>
            <Form.Group>
              <Form.Label>Flight Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Departing or Returning"
                name="flight_type"
                onChange={handleFlightChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Airline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Airline"
                name="airline"
                onChange={handleFlightChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Flight Number"
                name="flight_number"
                onChange={handleFlightChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                name="date"
                onChange={handleFlightChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departure</Form.Label>
              <InputGroup>
                <InputGroup.Text>Airport</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="ex: SFO"
                  name="starting_airport"
                  onChange={handleFlightChange}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Time</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="ex: 8:00 AM"
                  name="departure_time"
                  onChange={handleFlightChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Arrival</Form.Label>
              <InputGroup>
                <InputGroup.Text>Airport</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="ex: LAX"
                  name="ending_airport"
                  onChange={handleFlightChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <InputGroup.Text>Time</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="ex: 12:00 PM"
                  name="arrival_time"
                  onChange={handleFlightChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleFlightChange}
                />
              </InputGroup>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
      {flights[0] === undefined ? (
        <div>No flights yet!</div>
      ) : (
        <div className="flight">{yourFlights}</div>
      )}
    </div>
  );
};

export default Flight;
