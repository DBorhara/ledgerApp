import React from "react";
import { connect } from "react-redux";
import { logout } from "../store";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = ({ handleClick, isLoggedIn }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/home">Ledger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/ledger">Ledger</Nav.Link>
              <Nav.Link href="#" onClick={handleClick}>
                LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      )}
    </Container>
  </Navbar>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navigation);
