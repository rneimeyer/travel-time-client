import "./Activity.css";
import { Button, Form, Modal, InputGroup, Card } from "react-bootstrap";
import { useState } from "react";

const Activity = ({ urlBase, activities, tripId, cleanDate, setRefresh }) => {

    console.log(activities)

  const [show, setShow] = useState(false);
  const [newActivity, setNewActivity] = useState({
    activity: "",
    date: Date,
    time: "",
    price: Number,
    notes: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const putNewActivity = (activity) => {
    const newActivityCopy = [...activities];
    newActivityCopy.push(activity);
    let data = {
      activities: newActivityCopy,
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
    fetch(`${urlBase}/activity/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setRefresh(true))
      .then(() => setRefresh(false));
  };

  const yourActivities = activities.map((activity) => {
    return (
      <div key={activity._id} className="box">
        <Card>
          <Card.Body>
            <Card.Title className="activity-name">
              {activity.activity}
            </Card.Title>
            <Card.Text>Date: {cleanDate(activity.date)}</Card.Text>
            <Card.Text>Time: {activity.time}</Card.Text>
            <Card.Text>Price: ${activity.price}</Card.Text>
            <Card.Text>Notes: {activity.notes}</Card.Text>
            <Button onClick={handleDelete} id={activity._id}>
              Delete Activity
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });

  const handleActivityChange = (event) => {
    event.persist();
    setNewActivity((prevNewActivity) => {
      const editedNewActivity = {
        ...prevNewActivity,
        [event.target.name]: event.target.value,
      };
      return editedNewActivity;
    });
  };

  const addActivity = (event) => {
    event.preventDefault();
    fetch(`${urlBase}/activity/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newActivity),
    })
      .then((response) => response.json())
      .then((data) => putNewActivity(data.activity))
      .then(() =>
        setNewActivity({
          activity: "",
          date: Date,
          time: "",
          price: Number,
          notes: "",
        })
      )
      .then(() => handleClose())
      .then(() => setRefresh(true))
      .then(() => setRefresh(false));
  };

  return (
    <div>
      <Button onClick={handleShow}>Add an Activity</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Activity!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addActivity}>
            <Form.Group>
              <Form.Label>Activity</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Dinner at Sugar Fish, Bike ride along the beach, Sunset Cruise, etc."
                name="activity"
                onChange={handleActivityChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                name="date"
                onChange={handleActivityChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: 6:00 PM"
                name="time"
                onChange={handleActivityChange}
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
                  onChange={handleActivityChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Any activity notes"
                name="notes"
                onChange={handleActivityChange}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
      {activities[0] === undefined ? (
        <div>Add an activity!</div>
      ) : (
        <div className="activity">{yourActivities}</div>
      )}
    </div>
  );
};

export default Activity;