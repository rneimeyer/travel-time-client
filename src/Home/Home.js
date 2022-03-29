import "./Home.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    let emails = travellers.map((traveller) => traveller.email);
    let check = emails.includes(traveller.email);
    if (check === true) {
      setVerfication(true);
      setCurrentTraveller(traveller);
      let person = travellers.filter((n) => n.email === traveller.email);
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
        .then(() => setTraveller({ name: "", email: "" }))
    }
  };

  const showMessage = () => {
      if (verification === false) {
          return <div>Thanks for joining Travel Time, {currentTraveller.name}!</div>
      } else {
          return <div>Welcome back, {currentTraveller.name}!</div>
      }
  }

  return (
    <div className="home">
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
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      {verification == undefined ? (
        <div></div>
      ) : (
        showMessage()
      )}
    </div>
  );
};

export default Home;
