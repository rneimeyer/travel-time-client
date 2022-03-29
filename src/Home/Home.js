import "./Home.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Home = ({ urlBase, traveller, setTraveller, travellers, setTravellers, currentTraveller, setCurrentTraveller }) => {
  const [verification, setVerfication] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

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
    let emails = travellers.map((traveller) => traveller.email);
    let check = emails.includes(traveller.email);
    if (check === true) {
      setVerfication(true);
    } else {
      setVerfication(false);
      fetch(`${urlBase}/traveller/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(traveller),
      })
        .then(() => fetch(`${urlBase}/traveller/`))
        .then((response) => response.json())
        .then((data) => setTravellers(data.traveller))
        .then(() =>
          setTraveller({name: "", email: ""})
        )
        .then(() => setSignedUp(true));
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Travel Time</h1>
      <h3>We're here to help you plan your next vacation</h3>
      <h3>Please sign up or log in below to get started!</h3>
      <div className="form-container">
        <div>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" onSubmit={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
        <div>
          <h2>Log In</h2>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
      {verification === false ? (
          <div></div>
      ) : (
          <div>That email is already in use. Please sign in!</div>
      )}
      {signedUp === false ? (
          <div></div>
      ) : (
        <div>Now please log in!</div>
      )}
    </div>
  );
};

export default Home;
