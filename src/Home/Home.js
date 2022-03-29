import "./Home.css";
import { Form, Button } from "react-bootstrap";

const Home = ({ user, setUser }) => {
  return (
    <div className="home">
     <h1>Welcome to Travel Time</h1>
     <h3>We're here to help you plan your next vacation</h3>
     <h3>Please sign up or log in below to get started!</h3>
     <div className="form-container">
         <div>
     <h2>Sign Up</h2>
     <Form>
     <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your name" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Button type="submit">Submit</Button>
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
    </div>
  );
};

export default Home;