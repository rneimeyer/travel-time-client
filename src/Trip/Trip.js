import "./Trip.css";
import { Link } from "react-router-dom";
import Flight from "./../Flight/Flight";
import Hotel from "./../Hotel/Hotel";
import Activity from "./../Activity/Activity";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

const Trip = ({ urlBase, cleanDate, currentTripId }) => {
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
      .then(() => setRefresh(!refresh))
      .then(() => handleClose());
  };

  useEffect(() => {
    if (currentTripId !== "") {
      showCurrentTrip();
    }
  }, [currentTripId, refresh]);

  let tripSum = flightSum + hotelSum + activitySum;

  return (
    <div className="trip">
      {currentTrip.name === undefined ? (
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
        </div>
      ) : (
        <div>
          <h6 className="return">
            <Link to="/all-trips">??? All Trips</Link>
          </h6>
          <div className="trip-summary">
            <h1 className="trip-name">{currentTrip.name}</h1>
            <h3>
              From {cleanDate(currentTrip.start_date)} to{" "}
              {cleanDate(currentTrip.end_date)}
            </h3>
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
            <h4 className="budget-status">
              {currentTrip.budget > tripSum ? (
                "You're under budget! Plan some more activities!"
              ) : (
                <div>
                  {currentTrip.budget < tripSum
                    ? "You're over budget... time to rethink some plans."
                    : "You're right at budget target! Good job!"}
                </div>
              )}
            </h4>
          </div>
          <div className="trip-details">
            <Flight
              flights={currentTrip.flights}
              urlBase={urlBase}
              tripId={currentTrip._id}
              cleanDate={cleanDate}
              refresh={refresh}
              setRefresh={setRefresh}
              setFlightSum={setFlightSum}
            />
            <Hotel
              hotels={currentTrip.hotels}
              urlBase={urlBase}
              tripId={currentTrip._id}
              cleanDate={cleanDate}
              refresh={refresh}
              setRefresh={setRefresh}
              setHotelSum={setHotelSum}
            />
            <Activity
              activities={currentTrip.activities}
              urlBase={urlBase}
              tripId={currentTrip._id}
              cleanDate={cleanDate}
              refresh={refresh}
              setRefresh={setRefresh}
              setActivitySum={setActivitySum}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Trip;
