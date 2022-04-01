import "./Trip.css";
import Flight from "./../Flight/Flight";
import Hotel from "./../Hotel/Hotel";
import Activity from "./../Activity/Activity";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

const Trip = ({ urlBase, currentTripId }) => {
  console.log(currentTripId);

  const [show, setShow] = useState(false);
  const [tripUpdate, setTripUpdate] = useState({
    name: "",
    budget: Number,
    start_date: Date,
    end_date: Date,
  });
  const [currentTrip, setCurrentTrip] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [flightSum, setFlightSum] = useState(0);
  const [hotelSum, setHotelSum] = useState(0);
  const [activitySum, setActivitySum] = useState(0);

  const showCurrentTrip = () => {
    fetch(`${urlBase}/trip/${currentTripId}`)
      .then((response) => response.json())
      .then((data) => setCurrentTrip(data.trip));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    ][d.getMonth()];
    let newDate = month + " " + d.getDate() + ", " + d.getFullYear();
    return newDate;
  };

  const handleTripUpdateChange = (event) => {
    event.persist();
    setTripUpdate((prevTripUpdate) => {
      const editedTripUpdate = {
        ...prevTripUpdate,
        [event.target.name]: event.target.value,
      };
      return editedTripUpdate;
    });
  };

  const updateTrip = (event) => {
    event.preventDefault();
    fetch(`${urlBase}/trip/${currentTrip._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tripUpdate),
    })
      .then((response) => response.json())
      .then((data) => setCurrentTrip(data.trip))
      .then(() =>
        setTripUpdate({
          name: "",
          budget: Number,
          start_date: Date,
          end_date: Date,
        })
      )
      .then(() => handleClose());
  };

  useEffect(() => {
    if (currentTripId !== "") {
      showCurrentTrip();
      console.log("fetch");
    }
  }, [currentTripId, show, refresh]);

  let tripSum = flightSum + hotelSum + activitySum;

  console.log(flightSum);
  console.log(tripSum);

  return (
    <div className="trip">
      {currentTrip.name === undefined ? (
        <div></div>
      ) : (
        <div>
          <h1 className="trip-name">{currentTrip.name}</h1>
          <Button onClick={handleShow}>Update Trip</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Your Trip!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={updateTrip}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={currentTrip.name}
                    name="name"
                    onChange={handleTripUpdateChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Budget</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder={currentTrip.budget}
                      name="budget"
                      onChange={handleTripUpdateChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={cleanDate(currentTrip.start_date)}
                    name="start_date"
                    onChange={handleTripUpdateChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={cleanDate(currentTrip.end_date)}
                    name="end_date"
                    onChange={handleTripUpdateChange}
                    required
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Body>
          </Modal>
          <h3>Budget: ${currentTrip.budget}</h3>
          <h3>Current Trip Total: ${tripSum}</h3>
          <h4>{currentTrip.budget>tripSum ? ("You're under budget! Add some more activities!") : ("You're over budget... time to rethink some plans.")}</h4>
          <h3>
            From {cleanDate(currentTrip.start_date)} to{" "}
            {cleanDate(currentTrip.end_date)}
          </h3>
          <h3>Flights</h3>
          <Flight
            flights={currentTrip.flights}
            urlBase={urlBase}
            tripId={currentTrip._id}
            cleanDate={cleanDate}
            setRefresh={setRefresh}
            setFlightSum={setFlightSum}
            flightSum={flightSum}
          />
          <h3>Hotels</h3>
          <Hotel
            hotels={currentTrip.hotels}
            urlBase={urlBase}
            tripId={currentTrip._id}
            cleanDate={cleanDate}
            setRefresh={setRefresh}
            setHotelSum={setHotelSum}
            hotelSum={hotelSum}
          />
          <h3>Activities</h3>
          <Activity
            activities={currentTrip.activities}
            urlBase={urlBase}
            tripId={currentTrip._id}
            cleanDate={cleanDate}
            setRefresh={setRefresh}
            setActivitySum={setActivitySum}
            activitySum={activitySum}
          />
        </div>
      )}
    </div>
  );
};

export default Trip;
