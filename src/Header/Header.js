import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Header.css";

const Header = ({ currentTraveller }) => {
  return (
    <div className="header">
      <Navbar collapseOnSelect bg="white" expand="md" fixed="top">
        <Container>
          <Navbar.Brand className="brand" style={{color: '#F9B9AD'}}>Travel Time</Navbar.Brand>
          <Navbar.Text style={{color: '#6956a1'}}>{currentTraveller.name ? ("Hey there, "+currentTraveller.name)+"!" : ("Let's go!")}</Navbar.Text>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className="navbar-links" to="/">
                Home
              </Link>
              <Link className="navbar-links" to="/all-trips">
                Trips
              </Link>
              <Link className="navbar-links" to="/about">
                About
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
