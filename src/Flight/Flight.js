import "./Flight.css";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import { useState } from "react";

const Flight = ({ urlBase, flights, tripId }) => {
console.log(flights)

const [show, setShow] = useState(false);
const [newFlight, setNewFlight] = useState({flight_type: "", airline: "", flight_number: "", date: Date, starting_airport: "", ending_airport: "", departure_time: "", arrival_time: "", price: Number})

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
    .then(response => response.json())
    .then((data) => flights(data))
}

    const yourFlights = flights.map((flight) => {
        return (
            <div key={flight._id} className="box">
                <div>{flight.name}</div>
                <a href={flight.link} target="_blank">Link to flight</a>
                <p>Price: ${flight.price}</p>
            </div>
        )
    })

    const handleFlightChange = (event) => {
        event.persist();
        setNewFlight((prevNewFlight) => {
            const editedNewFlight = {
                ...prevNewFlight,
                [event.target.name]: event.target.value,
            }
            return editedNewFlight
        })
    }

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
        .then(()=>setNewFlight({flight_type: "", airline: "", flight_number: "", date: Date, starting_airport: "", ending_airport: "", departure_time: "", arrival_time: "", price: Number}))
        .then(()=>handleClose())
    }

  return (
    <div className="flight">
        <Button onClick={handleShow}>Add a Flight</Button>
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
            <div>Add a flight!</div>
        ) : (
            <div>{yourFlights}</div>  
        )}
    </div>
  );
};

export default Flight;