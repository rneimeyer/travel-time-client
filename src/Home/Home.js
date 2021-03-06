import "./Home.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = ({
  urlBase,
  traveller,
  setTraveller,
  travellers,
  setTravellers,
  currentTraveller,
  setCurrentTraveller,
  travellerId,
  setTravellerId,
}) => {
  const [verification, setVerfication] = useState();

  const handleChange = (event) => {
    event.persist();
    setTraveller((prevTraveller) => {
      const editedTraveller = {
        ...prevTraveller,
        [event.target.name]: event.target.value,
      };
      return editedTraveller;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let emails = travellers.map((traveller) => traveller.email.toLowerCase());
    let check = emails.includes(traveller.email.toLowerCase());
    if (check === true) {
      setVerfication(true);
      setCurrentTraveller(traveller);
      let person = travellers.filter((n) => n.email.toLowerCase() === traveller.email.toLowerCase());
      setTravellerId(person[0]._id);
      setTraveller({ name: "", email: "" });
    } else {
      setVerfication(false);
      setCurrentTraveller(traveller);
      fetch(`${urlBase}/traveller/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(traveller),
      })
        .then((response) => response.json())
        .then((data) => setTravellerId(data.traveller._id))
        .then(() => fetch(`${urlBase}/traveller/`))
        .then((response) => response.json())
        .then((data) => setTravellers(data.traveller))
        .then(() => setTraveller({ name: "", email: "" }));
    }
  };

  const showMessage = () => {
    if (verification === false) {
      return (
        <div>
          <p className="welcome-message">
            Thanks for joining Travel Time, {currentTraveller.name}!
          </p>
          <Button>
            <Link className="button-link" to="/all-trips">
              Add Your First Trip!
            </Link>
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <p className="welcome-message">
            Welcome back, {currentTraveller.name}!
          </p>
          <Link className="button-link" to="/all-trips">
            <Button>Go to Your Trips!</Button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="home">
      <div className="home-text">
        <h1>Welcome to Travel Time</h1>
        <h3>We're here to help you plan your next vacation</h3>
        <h3>Please sign up or log in below to get started!</h3>
        <div className="form-container">
          <h2>Sign Up/Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                name="name"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
        {verification === undefined ? <div></div> : showMessage()}
      </div>
    </div>
  );
};

export default Home;
