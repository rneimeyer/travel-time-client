import "./Hotel.css";
import { Button, Form, Modal, InputGroup, Card } from "react-bootstrap";
import { useState } from "react";

const Hotel = ({
  urlBase,
  hotels,
  tripId,
  cleanDate,
  refresh,
  setRefresh,
  setHotelSum,
}) => {
  const [show, setShow] = useState(false);
  const [newHotel, setNewHotel] = useState({
    hotel: "",
    room_type: "",
    check_in: Date,
    check_out: Date,
    price: Number,
    ammenities: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const putNewHotel = (hotel) => {
    const newHotelCopy = [...hotels];
    newHotelCopy.push(hotel);
    let data = {
      hotels: newHotelCopy,
    };
    fetch(`${urlBase}/trip/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => setRefresh(!refresh));
  };

  const handleDelete = (event) => {
    let id = event.target.id;
    fetch(`${urlBase}/hotel/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setRefresh(!refresh));
  };

  for (let i = 0; i < hotels.length; i++) {
    hotels.sort((a, b) => {
      if (a.check_in < b.check_in) {
        return -1;
      }
      if (a.check_in > b.check_in) {
        return 1;
      }
      return 0;
    });
  }

  let total = 0;

  const yourHotels = hotels.map((hotel) => {
    total += hotel.price;
    return (
      <div key={hotel._id} className="box">
        <Card>
          <Card.Body>
            <Card.Title className="hotel-flight-name">{hotel.hotel}</Card.Title>
            <Card.Text>Room Type: {hotel.room_type}</Card.Text>
            <Card.Text>Check In: {cleanDate(hotel.check_in)}</Card.Text>
            <Card.Text>Check Out: {cleanDate(hotel.check_out)}</Card.Text>
            <Card.Text>Ammenities: {hotel.ammenities}</Card.Text>
            <Card.Text>Price: ${hotel.price}</Card.Text>
            <Button onClick={handleDelete} id={hotel._id}>
              Delete Hotel
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });

  setHotelSum(total);

  const handleHotelChange = (event) => {
    event.persist();
    setNewHotel((prevNewHotel) => {
      const editedNewHotel = {
        ...prevNewHotel,
        [event.target.name]: event.target.value,
      };
      return editedNewHotel;
    });
  };

  const addHotel = (event) => {
    event.preventDefault();
    fetch(`${urlBase}/hotel/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newHotel),
    })
      .then((response) => response.json())
      .then((data) => putNewHotel(data.hotel))
      .then(() =>
        setNewHotel({
          hotel: "",
          room_type: "",
          check_in: Date,
          check_out: Date,
          price: Number,
          ammenities: "",
        })
      )
      .then(() => handleClose());
  };

  return (
    <div>
      <div className="section-title">
        <h3>Hotels</h3>
        <Button onClick={handleShow}>Add a Hotel</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Hotel!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addHotel}>
            <Form.Group>
              <Form.Label>Hotel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hotel Name"
                name="hotel"
                onChange={handleHotelChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: King, 2 Queens, etc."
                name="room_type"
                onChange={handleHotelChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Check In Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                name="check_in"
                onChange={handleHotelChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Check Out Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                name="check_out"
                onChange={handleHotelChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ammenities</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: pool, free parking, etc."
                name="ammenities"
                onChange={handleHotelChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleHotelChange}
                />
              </InputGroup>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
      {hotels[0] === undefined ? (
        <div>No hotels yet!</div>
      ) : (
        <div className="hotel">{yourHotels}</div>
      )}
    </div>
  );
};

export default Hotel;
